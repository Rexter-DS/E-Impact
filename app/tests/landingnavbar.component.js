import { Selector } from 'testcafe';

class LandingNavBar {

  /** Click on and go to sign in page */
  async gotoSigninPage(testController) {
    await testController.click('.fake-menu-item');
  }

}

export const landingNavBar = new LandingNavBar();