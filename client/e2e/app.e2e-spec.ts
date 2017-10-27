import { InsurancePensionHackathonPage } from './app.po';

describe('insurance-pension-hackathon App', function() {
  let page: InsurancePensionHackathonPage;

  beforeEach(() => {
    page = new InsurancePensionHackathonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
