import { FantastickerPage } from './app.po';

describe('fantasticker App', () => {
  let page: FantastickerPage;

  beforeEach(() => {
    page = new FantastickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
