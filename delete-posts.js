require('dotenv').config();
const { Builder, By, Key, until } = require('selenium-webdriver');

    (async function deletePosts() {



        let driver = await new Builder().forBrowser(`chrome`).build();
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

            for (let i = 1; i <= numOfPostsToDelete; i++) {
                await driver.wait(until.elementLocated(By.linkText(`test ${i}`))).click();
                await driver.wait(until.elementLocated(By.xpath("//*[text() = 'Delete Post']"))).click();
            }

            let posts = await driver.findElements(By.className(`list-group-item`));
            console.log(posts);
            if(!posts[0]) {
                console.log("\nAll posts have been deleted successfully!");
            }
        }
        finally {
            await driver.quit();
        }
    
})();

