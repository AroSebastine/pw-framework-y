import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginpage'
import { CartPage } from '../pages/cartpage'
import { AllProductsPage } from '../pages/AllProductsPage'

let loginPage: LoginPage
let cartPage: CartPage
let allProductsPage: AllProductsPage


test.beforeEach(async({ page }) => {    
    loginPage = new LoginPage(page)
    allProductsPage = new AllProductsPage(page)
    cartPage = new CartPage(page)
    await loginPage.loginToTheApplication('standard_user', 'secret_sauce')    
})

test('Ensure there are 6 products in total and add all of them to the cart @regression', async() => {
    await allProductsPage.gotoAllProductsPage()
    await allProductsPage.addAllProductsToCart()
})