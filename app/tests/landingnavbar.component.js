import { Selector } from 'testcafe';

class LandingNavBar {

  /** Click on and go to sign in page */
  async gotoSigninPage(testController) {
    await testController.click('#sign-in-button');
  }

}

export const landingNavBar = new LandingNavBar();
