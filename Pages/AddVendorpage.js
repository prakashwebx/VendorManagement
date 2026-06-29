import { expect } from '@playwright/test';

class AddVendor {
  constructor(page) {
    this.page = page;

    this.vendorBtn = page.getByRole('button', { name: 'Vendors' });
    this.addVendorBtn = page.getByText('Add Vendor').first();

    this.vendorTaxIDInput = page.locator("//input[@id='vendorTaxId']");
    this.vendorNameInput = page.locator("//input[@id='name']");
    this.vendorAddressInput = page.locator("//input[@id='address']");
    this.vendorCityInput = page.locator("//input[@id='city']");
    this.vendorCountryInput = page.locator("//input[@id='country']");

    this.saveVendorBtn = page.locator('#addVendor');


     }




  async NavigateToVendorPage() {
    await this.vendorBtn.click();
    await expect(this.addVendorBtn).toBeVisible({ timeout: 10000 });
    await this.addVendorBtn.click();
  }

  async AddVendor(VendorTaxId, Name, Address, City, Country) {
    await this.vendorTaxIDInput.fill(VendorTaxId);
    await this.vendorNameInput.fill(Name);
    await this.vendorAddressInput.fill(Address);
    await this.vendorCityInput.fill(City);
    await this.vendorCountryInput.fill(Country);
    await this.page.once("dialog", dialog=>{
      dialog.accept();
    })
    await this.saveVendorBtn.click();
    

  }



}

export default AddVendor;
    