import { Selector } from 'testcafe';

class SideBar {

    /** Go to */
    async dashBoardIsDisplayed(testController) {
        this.pageId = '#overall-container';
        this.pageSelector = Selector(this.pageId);
        await testController.expect(this.pageSelector.exists).ok();
    }
    
    /** Check that the specified user is currently logged in. */
    async isLoggedIn(testController, username) {
        const loggedInUser = Selector('#sidebar-current-user').innerText;
        await testController.expect(loggedInUser).eql(username);
    }
}

export const sideBar = new SideBar();
