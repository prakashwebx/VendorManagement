import { expect } from "@playwright/test";

class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async login(username, password) {
    await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }


  async expectLoginSuccess(){
    
    await expect(this.page).toHaveURL("https://acme-test.uipath.com/home");
 }
}





export default LoginPage;


