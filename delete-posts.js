require('dotenv').config();
const { Builder, By, Key, until } = require('selenium-webdriver');
let browser = process.argv[2].toLowerCase();

if (!browser) {

    console.log("\nPlease provide the browser you would like to test after providing the name of the javascript file \n");
    console.log("Supported browsers include: \n chrome \n firefox");
}
else {
    (async function deletePosts() {



        let driver = await new Builder().forBrowser(`${process.argv[2].toLowerCase()}`).build();
        let numOfPostsToDelete = 3;

        try {
            await driver.get('https://login.salesforce.com');
            await driver.wait(until.titleIs('Login | Salesforce'));
            await driver.findElement(By.id('username')).sendKeys(`${process.env.CAKE_UN}`);
            await driver.findElement(By.id('password')).sendKeys(`${process.env.CAKE_PW}`, Key.RETURN);
            await driver.wait(until.titleIs('Home | Salesforce'));
            await driver.get('https://na85.lightning.force.com/lightning/n/Blog');
            await driver.wait(until.titleIs("React Redux Blog | Salesforce"));
            await driver.switchTo().frame(driver.findElement(By.xpath("//iframe[contains(@name, 'vfFrameId')]")));

            if (browser === 'chrome')
            for (let i = 1; i <= numOfPostsToDelete; i++) {
                await driver.wait(until.elementLocated(By.linkText(`test ${i}`))).click();
                await driver.wait(until.elementLocated(By.xpath("//*[text() = 'Delete Post']"))).click();
            }
            else {
                await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
                for (let i = 1; i <= numOfPostsToDelete; i++) {
    
                        await driver.wait(until.elementLocated(By.xpath(`//*[text() = 'test ${i}']`))).click();
                        await driver.wait(until.elementLocated(By.xpath("//*[text() = 'Delete Post']"))).click();

                }
            }
            let posts = await driver.findElements(By.className(`list-group-item`));
            console.log(posts);
            if(!posts[0]) {
                console.log("\nAll posts have been deleted successfully!");
            }
        }
        finally {
            // await driver.quit();
        }
    
})();

}