import { Page } from "@playwright/test"
import { LoginPage } from "../pages/loginpage"
import { AllProductsPage } from "../pages/AllProductsPage"
import { CartPage } from "../pages/cartpage"
import { CheckoutPage } from "../pages/CheckoutPage"


export class PageManager {
    page: Page
    loginPage: LoginPage
    allProductsPage: AllProductsPage
    cartPage: CartPage
    checkoutPage: CheckoutPage

    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.allProductsPage = new AllProductsPage(page)
        this.cartPage = new CartPage(page)
        this.checkoutPage = new CheckoutPage(page)
    }
}