// foodfast-frontend/tests/smoke.spec.js

// Dùng 'import' thay vì 'require'
import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';
import { expect } from 'chai';

describe('Smoke Test - FoodFast Frontend', function () {
    this.timeout(30000);
    let driver;

    before(async function () {
        let options = new Options();
        // Cấu hình chạy trên CI (Headless)
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--window-size=1920,1080');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    it('Should load the homepage successfully', async function () {
        // Truy cập vào server Vite đang chạy
        await driver.get('http://localhost:3000');

        // Chờ body xuất hiện để chắc chắn trang đã load
        await driver.wait(until.elementLocated(By.css('body')), 10000);

        const title = await driver.getTitle();
        console.log("Page Title:", title);

        // Kiểm tra tiêu đề (Vite mặc định thường là "Vite + React")
        // Bạn có thể sửa lại cho khớp với title app của bạn
        expect(title).to.exist;
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});