import { test, expect, Page } from '@playwright/test'
import { CartPage } from '../pages/cartpage'
import { LoginPage } from '../pages/loginpage'
import { AllProductsPage } from '../pages/AllProductsPage'


let loginPage: LoginPage
let allProductsPage: AllProductsPage
let cartPage: CartPage

test.beforeEach(async({ page }) => {    
    loginPage = new LoginPage(page)
    allProductsPage = new AllProductsPage(page)
    cartPage = new CartPage(page)
    await loginPage.loginToTheApplication('standard_user', 'secret_sauce')    
})

test('Add all the products to the cart and ensure they are added successfully', async() => {
    await allProductsPage.gotoAllProductsPage()
    await allProductsPage.addAllProductsToCart()
    await cartPage.gotoCartPage()
    await cartPage.verifyTotalNumberOfProductsInTheCart(await allProductsPage.getNumberOfItemsAddedToCartFromCartBadge()) 
    await cartPage.checkoutCart()
    

})