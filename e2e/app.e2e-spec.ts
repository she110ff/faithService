import { Faithservice2017Page } from './app.po';

describe('faithservice2017 App', () => {
  let page: Faithservice2017Page;

  beforeEach(() => {
    page = new Faithservice2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
