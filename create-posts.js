require('dotenv').config();
const { Builder, By, Key, until } = require('selenium-webdriver');

if (!process.argv[2]) {

    console.log("\nPlease provide the browser you would like to test after providing the name of the javascript file \n");
    console.log("Supported browsers include: \n chrome \n firefox");
}
else {
    (async function createPosts() {



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

            if (process.argv[2].toLowerCase() === 'chrome') {
                for (let i = 1; i <= numberOfPosts; i++) {
                    await driver.findElement(By.name("Name")).clear();
                    await driver.findElement(By.name("Categories__c")).clear();
                    await driver.findElement(By.name("Content__c")).clear();
                    await driver.findElement(By.name("Name")).sendKeys(`test ${i}`);
                    await driver.findElement(By.name("Content__c")).submit();
                    await driver.findElement(By.name("Categories__c")).sendKeys(`test ${i}`);
                    await driver.findElement(By.name("Content__c")).submit();
                    await driver.findElement(By.name("Content__c")).sendKeys(`test ${i}`);
                    await driver.findElement(By.name("Content__c")).submit();
                    if(i < numberOfPosts) {
                        await driver.wait(until.elementLocated(By.linkText('New Post')), 10000).click();
                    }
                }
            }
            else {
                for (let i = 1; i <= numberOfPosts; i++) {
                    await driver.findElement(By.name("Name")).clear();
                    await driver.findElement(By.name("Categories__c")).clear();
                    await driver.findElement(By.name("Content__c")).clear();
                    await driver.findElement(By.name("Name")).sendKeys(`test ${i}`);
                    await driver.findElement(By.xpath("//*[text() = 'Submit']")).click();

                    await driver.findElement(By.name("Categories__c")).sendKeys(`test ${i}`);
                    await driver.findElement(By.xpath("//*[text() = 'Submit']")).click();
                    await driver.findElement(By.name("Content__c")).sendKeys(`test ${i}`);
                    await driver.findElement(By.xpath("//*[text() = 'Submit']")).click();
                    if(i < numberOfPosts) {
                        await driver.wait(until.elementLocated(By.linkText('New Post')), 10000).click();
                    }
                }
            }
            await driver.wait(until.elementLocated(By.linkText("New Post")), 5000);
            let eh = await driver.findElements(By.className(`list-group-item-heading`));
            let postText = [];
            await eh.map(async (e) => {
                let huh = await e.getText();
                    await postText.push(parseInt(huh.charAt(huh.length - 1)));
                    await console.log(`Post order: ${postText}`);
            });
        }

        finally {
            await driver.quit();
        }

    })();
}