import { CsTeamTvPage } from './app.po';

describe('cs-team-tv App', () => {
  let page: CsTeamTvPage;

  beforeEach(() => {
    page = new CsTeamTvPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
