import { test, expect, Page } from '@playwright/test'
import { LoginPage } from '../pages/loginpage'
// import loginCredentials from '../test-data/login.json'
import { loadTestData } from '../utils/TestDataLoader'

let loginPage: LoginPage

test.beforeEach(async({ page }) => {  
    loginPage = new LoginPage(page)   
})

test.describe('Login', async () => {
    let testData = loadTestData('login')    

    for (let login of testData.loginCredentials) {
        test(`Check if login is successful for: ${login.username}`, async () => {            
            await loginPage.loginToTheApplication(login.username, login.password)
        })
    }
})