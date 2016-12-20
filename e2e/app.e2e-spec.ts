import { Ng2travelPage } from './app.po';

describe('ng2travel App', function() {
  let page: Ng2travelPage;

  beforeEach(() => {
    page = new Ng2travelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
