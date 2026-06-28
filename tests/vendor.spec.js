import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import LoginPage from '../Pages/loginPage.js';
import AddVendor from '../Pages/AddVendorpage.js';
import vendorTestData from '../test-data/vendorTestData.json'

const loginData = JSON.parse(
  readFileSync(path.resolve(process.cwd(), 'test-data/loginData.json'), 'utf8')
);


test('Login Page', async ({ page }) => {
  const objLoginPage = new LoginPage(page);

  await objLoginPage.goto(loginData.baseURL);
  await objLoginPage.login(loginData.ValidUser.username, loginData.ValidUser.password);
  await expect(page).toHaveURL(/login|home/i);
});

test.describe('Vendor tests', () => {
  test.beforeEach(async ({ page }) => {
    const objLoginPage = new LoginPage(page);
    await objLoginPage.goto(loginData.baseURL);
    await objLoginPage.login(loginData.ValidUser.username, loginData.ValidUser.password);
    await expect(page).toHaveURL(/login|home/i);
  });

  for (const data of vendorTestData) {
    test(`Add Vendor ${data.Id}`, async ({ page }) => {
      const objAddVendor = new AddVendor(page);

      await objAddVendor.NavigateToVendorPage();
      await objAddVendor.AddVendor(
        data.vendorTaxId,
        data.name,
        data.address,
        data.city,
        data.country
     
      );

    });
  }

});


