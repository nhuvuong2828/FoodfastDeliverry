// foodfast-frontend/tests/search.spec.js
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';
import { expect } from 'chai';

describe('Module: Product Search', function () {
    this.timeout(30000);
    let driver;

    before(async function () {
        let options = new Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--window-size=1920,1080');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    it('TC03: Tìm kiếm món ăn "Pizza"', async function () {
        await driver.get('http://localhost:3000/');

        // Tìm thanh search (Bạn cần thêm id="search-input" vào code React)
        const searchBox = await driver.findElement(By.id('search-input'));

        // Nhập từ khóa và nhấn Enter
        await searchBox.sendKeys('Pizza', Key.RETURN);

        // Chờ kết quả hiện ra (Giả sử mỗi món ăn có class="product-card")
        await driver.wait(until.elementLocated(By.className('product-card')), 5000);

        // Lấy danh sách kết quả
        const products = await driver.findElements(By.className('product-card'));

        console.log(`Tìm thấy ${products.length} sản phẩm`);
        expect(products.length).to.be.greaterThan(0); // Phải tìm thấy ít nhất 1 cái
    });

    after(async function () {
        if (driver) await driver.quit();
    });
});