import { Selector } from 'testcafe';

class SideBar {

    /** Go to */
    async dashBoardIsDisplayed(testController) {
        this.pageId = '#overall-container';
        this.pageSelector = Selector(this.pageId);
        await testController.expect(this.pageSelector.exists).ok();
    }
}

export const sideBar = new SideBar();
