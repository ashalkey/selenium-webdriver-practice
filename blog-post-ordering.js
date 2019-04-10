require('dotenv').config();
const { Builder, By, Key, until } = require('selenium-webdriver');

if (!process.argv[2]) {

    console.log("\nPlease provide the browser you would like to test after providing the name of the javascript file \n");
    console.log("Supported browsers include: \n chrome \n firefox");
}
else {
    (async function checkPostOrder() {



        let driver = await new Builder().forBrowser(`${process.argv[2].toLowerCase()}`).build();
        let numberOfPosts = 3;

        try {
            await driver.get('https://login.salesforce.com');
            await driver.wait(until.titleIs('Login | Salesforce'));
            await driver.findElement(By.id('username')).sendKeys(`${process.env.CAKE_UN}`);
            await driver.findElement(By.id('password')).sendKeys(`${process.env.CAKE_PW}`, Key.RETURN);
            await driver.wait(until.titleIs('Home | Salesforce'));
            await driver.get('https://na85.lightning.force.com/lightning/n/Blog');
            await driver.wait(until.titleIs("React Redux Blog | Salesforce"));
            await driver.switchTo().frame(driver.findElement(By.xpath("//iframe[contains(@name, 'vfFrameId')]")));

            await driver.findElement(By.linkText('New Post')).click();

            for (let i = 1; i <= numberOfPosts; i++) {
                await driver.findElement(By.name("Name")).clear();
                await driver.findElement(By.name("Categories__c")).clear();
                await driver.findElement(By.name("Content__c")).clear();
                await driver.findElement(By.name("Name")).sendKeys(`test ${i}`);
                await driver.findElement(By.name("Categories__c")).sendKeys(`test ${i}`);
                await driver.findElement(By.name("Content__c")).sendKeys(`test ${i}`);
                await driver.findElement(By.className("btn btn-primary")).click();
                if(i < numberOfPosts) {
                    await driver.wait(until.elementLocated(By.linkText('New Post')), 10000).click();
                }
            }
            await driver.findElements(By.className('list-group-item-heading'))
            // await driver.wait(until.elementLocated(By.linkText("test 1"))).click();

        }

        finally {
            // await driver.quit();
        }

    })();
}