import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';
import { expect } from 'chai';

describe('Module: Authentication (Login/Register)', function () {
    this.timeout(30000);
    let driver;

    before(async function () {
        let options = new Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--window-size=1920,1080');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    it('TC01: Debug Register Page HTML', async function () {
        // 1. Vào trang đăng ký
        await driver.get('http://localhost:5173/register');

        // 2. Chờ 3 giây để trang load
        await new Promise(r => setTimeout(r, 3000));

        // 3. In ra URL hiện tại (Xem có bị redirect về Home không?)
        const currentUrl = await driver.getCurrentUrl();
        console.log("👉 Current URL:", currentUrl);

        // 4. In ra HTML của trang (Để kiểm tra xem có ô input không)
        const bodyText = await driver.findElement(By.tagName('body')).getAttribute('innerHTML');
        console.log("=================== HTML REGISTER PAGE ===================");
        console.log(bodyText); // Tìm từ khóa "reg-email" trong log này
        console.log("==========================================================");

        // 5. Thử tìm phần tử
        const emailInput = await driver.findElement(By.id('reg-email'));
        expect(emailInput).to.exist;
    });

    after(async function () {
        if (driver) await driver.quit();
    });
});