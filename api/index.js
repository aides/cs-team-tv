const express = require('express');
const path = require('path');
const request = require('request-promise-native');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.sendFile('./public/index.html');
});

const config = {
  circleCIToken: process.env.CIRCLECI_TOKEN,
  gitHubToken: process.env.GITHUB_TOKEN,
  gitHubOrg: process.env.GITHUB_ORG,
  gitHubRepos: process.env.GITHUB_REPOS ? String(process.env.GITHUB_REPOS).split(',') : [],
  opsUrl: process.env.OPS_URL,
  opsToken: process.env.OPS_TOKEN,
  jiraUrl: process.env.JIRA_URL,
  jiraToken: process.env.JIRA_TOKEN,
  jiraProject: process.env.JIRA_PROJECT,
};

app.get('/config', (req, res) => {
  res.json(config);
})

app.get('/tenants', (req, res) => {
  const url = `${config.opsUrl}/rest/v1/ops/public/tenants/`;

  return request.get(url, {
    headers: { 'Authorization': `Basic ${config.opsToken}` },
    json: true,
  }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

app.get('/tenants/:id/status', (req, res) => {
  const url = `${config.opsUrl}/rest/v1/ops/public/tenants/${req.params.id}/status`;

  return request.get(url, {
    headers: { 'Authorization': `Basic ${config.opsToken}` },
    json: true,
  }).then((data) => {
    if (data.status != 'OK') {
      console.log(data);
    }

    res.json(data);
  }).catch((err) => {
    res.json({
      status: 'UNKNOWN'
    });
  });
});

app.get('/issues', (req, res) => {
  const url = `${config.jiraUrl}/rest/api/2/search`;

  const body = {
    jql: `project=${config.jiraProject} order by updated DESC`,
    startAt: 0,
    maxResults: 10,
    fields: [
      'key',
      'summary',
      'status',
    ]
  };

  return request.post(url, {
    headers: { 'Authorization': `Basic ${config.jiraToken}` },
    body: body,
    json: true,
  }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((err, req, res) => {
  console.error(err.message);
});

app.listen(9050, () => {
  console.log('Started server...')
});
