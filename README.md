# CS Team TV Dashboard

## Description

Simple site to display CircleCI build statuses, custom tenant statuses, Cloud Jira issues and open GitHub PRs.

## How to run

Make sure to create an `env.list` based on `env.list.tpl`.

### In a container

1. `./build.sh && ./run.sh`
1. Go to `http://localhost:9050`

### Serve web from API

1. `./build.sh`
1. `cd ./api`
1. `npm start`
1. Go to `http://localhost:9050`

### Serve Web and API separately

1. `cd ./web`
1. `ng serve`
1. `cd ../api`
1. `npm start`
1. Go to `http://localhost:4200`

## Ideas list

* Show what is broken on tenant
* Number of issues in sprint ToDo/InProgress/Done
* Number of bugs (Probably a line chart over time)
* Number of the week
* Shared Environment (clusters) status
* Team Members Statuses (In Office / Out / Vacation / OOF / WFH)
* Tenant Error Rate, RPS, 99p request duration
* FireMeter
* Next Meeting Reminder
* Topic/Quote/Meme of the day (e.g. from Slack)
* Add symbol to issues with flags
* Pending comments
* Pending questions in Slack
