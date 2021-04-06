import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { landingNavBar } from './landingnavbar.component';
import { sideBar } from './sidebar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('E-Impact localhost test with default db')
    .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
    await landingPage.isDisplayed(testController);
});

test('Test signin', async (testController) => {
    await landingNavBar.gotoSigninPage(testController);
    await signinPage.isDisplayed(testController);
    await signinPage.signin(testController, credentials.username, credentials.password);
    await sideBar.isLoggedIn(testController, credentials.username);
});
