require('dotenv').config();
const { Builder, By, Key, until } = require('selenium-webdriver');

    (async function cancelNewPost() {

        let driver = await new Builder().forBrowser(`chrome`).build();

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
            await driver.findElement(By.name("Name")).sendKeys(`testing`);
            await driver.findElement(By.name("Categories__c")).sendKeys(`testing`);
            await driver.findElement(By.name("Content__c")).sendKeys(`testing`);

            await driver.findElement(By.linkText("Cancel")).click();

            await driver.wait(until.elementLocated(By.linkText("New Post")), 5000).then(async () => {
                console.log("\nNew post creation has been cancelled successfully!");
                await driver.findElement(By.linkText("test 1")).click();
                await driver.wait(until.elementLocated(By.xpath(`//*[text() = "test 1"]`)));
                console.log("\nPost information is viewable!");
            }
            );

   

        }
        finally {
            await driver.quit();
        }
    
})();
