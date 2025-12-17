// foodfast-frontend/tests/cart.spec.js
import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';
import { expect } from 'chai';

describe('Module: Shopping Cart', function () {
    this.timeout(30000);
    let driver;

    before(async function () {
        let options = new Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--window-size=1920,1080');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    it('TC04: Thêm sản phẩm vào giỏ hàng', async function () {
        await driver.get('http://localhost:3000/');

        // 1. Tìm nút "Add to Cart" của sản phẩm đầu tiên
        // (Giả sử nút thêm có class là .btn-add-cart)
        // Cần đợi trang load xong sản phẩm
        await driver.wait(until.elementLocated(By.css('.btn-add-cart')), 10000);

        const addBtns = await driver.findElements(By.css('.btn-add-cart'));
        if (addBtns.length > 0) {
            // Click vào sản phẩm đầu tiên
            await addBtns[0].click();

            // 2. Kiểm tra icon giỏ hàng có hiện số 1 không
            // (Giả sử badge số lượng có class là .cart-badge)
            await driver.wait(until.elementLocated(By.css('.cart-badge')), 5000);
            const badge = await driver.findElement(By.css('.cart-badge'));
            const count = await badge.getText();

            console.log("Số lượng trong giỏ:", count);
            expect(count).to.equal('1');
        } else {
            console.log("Không tìm thấy sản phẩm nào để thêm vào giỏ");
        }
    });

    after(async function () {
        if (driver) await driver.quit();
    });
});