import { expect, Locator, Page } from "@playwright/test"
import { CartPage } from "./cartpage"
import { AllProductsPage } from './AllProductsPage'

export class CheckoutPage {
    page: Page
    cartPage: CartPage
    allProductsPage: AllProductsPage
    firstNameTextbox: Locator
    lastNameTextbox: Locator
    postalCodeTextbox: Locator
    continueButton: Locator
    priceBars: Locator
    

    constructor(page) {
        this.page = page
        this.cartPage = new CartPage(page)
        this.allProductsPage = new AllProductsPage(page)
        this.firstNameTextbox = this.page.getByRole('textbox', {name: 'First Name'})
        this.lastNameTextbox = this.page.getByRole('textbox', {name: 'Last Name'})
        this.postalCodeTextbox = this.page.getByPlaceholder('Zip/Postal Code')
        this.continueButton = this.page.getByRole('button', { name: 'Continue' })
        this.priceBars = this.page.locator('.cart_item')

    }

    async gotoCheckoutPage() {
        await this.cartPage.checkoutCart()
    }

    async enterCheckoutDetails(firstName, lastName, postalCode) {
        await this.firstNameTextbox.fill(firstName)
        await this.lastNameTextbox.fill(lastName)
        await this.postalCodeTextbox.fill(postalCode)
    }

    async finishCheckout() {
        await this.continueButton.click()
        let numberOfItemsToCheckout = await this.priceBars.count()
        // console.log({numberOfItemsToCheckout});
        let cartBadgeNumber = await this.allProductsPage.getNumberOfItemsAddedToCartFromCartBadge()
        // console.log({cartBadgeNumber});
        expect(numberOfItemsToCheckout).toBe(await this.allProductsPage.getNumberOfItemsAddedToCartFromCartBadge())
        await this.page.pause()
    }


}