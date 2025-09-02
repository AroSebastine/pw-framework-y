import test, { Page } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { AllProductsPage } from "../pages/AllProductsPage";
import { CartPage } from "../pages/cartpage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PageManager } from "../utils/PageManager";
import { faker } from '@faker-js/faker'
import * as allure from 'allure-js-commons'

let pageManager: PageManager
// let page: Page

test.beforeEach(async ({ page }) => {
    // this.page = page
    pageManager = new PageManager(page)
    await pageManager.loginPage.loginToTheApplication('standard_user', 'secret_sauce') 
})

test('Checkout all items', async({ page }) => {

    await allure.severity('critical')
    await allure.suite('checout suite')
    await allure.tags('@smoke') 
    await allure.tags('@regression')

    await test.step('Adding all the products to the cart', async() => {
        await pageManager.allProductsPage.addAllProductsToCart()
    })
    
    await pageManager.cartPage.gotoCartPage()
    await pageManager.cartPage.checkoutCart()
    let firstName = faker.person.firstName()
    let lastName = faker.person.lastName()
    let postcode = faker.location.zipCode()
    await allure.step('Entering checkout details: name and postcode', async() => {
        await pageManager.checkoutPage.enterCheckoutDetails(firstName, lastName, postcode)
        await allure.attachment('Checkout details are entered as captured', await page.screenshot({fullPage: true}), 'impage/png')
    })

    await allure.step('FInalising the checout', async() => {
        await pageManager.checkoutPage.finishCheckout() 
    })
    

})