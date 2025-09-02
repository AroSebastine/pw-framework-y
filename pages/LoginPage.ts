import { expect, Locator, Page } from "@playwright/test"
import { loadTestData } from '../utils/TestDataLoader'

export class LoginPage {

    userNameTextBox: Locator
    passwordTextBox: Locator
    loginButton: Locator
    baseUrl: string
    page: Page

    constructor(page: Page){
        this.page = page
        this.userNameTextBox = page.getByRole('textbox', {name: 'username'})
        this.passwordTextBox = page.getByRole('textbox', {name: 'password'})
        this.loginButton = page.getByRole('button', {name: 'login'})  
        this.baseUrl = loadTestData('login').baseUrl
    }

    async gotoLoginPage() {
        await this.page.goto(this.baseUrl)
    }

    async enterUserName(username: string) {
        await this.userNameTextBox.fill(username)
    }

    async enterPassword(password: string) {
        await this.passwordTextBox.fill(password)
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async loginToTheApplication(username, password) {
        // this.baseUrl = baseUrl
        await this.gotoLoginPage()
        await this.enterUserName(username)
        await this.enterPassword(password)
        await this.clickLoginButton()
        await this.page.waitForURL(/inventory.html/)
        expect(this.page.url()).toContain('inventory.html')
    }
}