import { IcaroTimerPage } from './app.po';

describe('icaro-timer App', () => {
  let page: IcaroTimerPage;

  beforeEach(() => {
    page = new IcaroTimerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
