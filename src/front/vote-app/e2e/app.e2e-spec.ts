import { VoteAppPage } from './app.po';

describe('vote-app App', () => {
  let page: VoteAppPage;

  beforeEach(() => {
    page = new VoteAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
