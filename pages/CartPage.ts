import { expect, Locator, Page } from "@playwright/test"

export class CartPage {

    page: Page
    cartItemsBadge: Locator
    itemsInTheCart: Locator
    checkoutButton: Locator    

    constructor(page: Page) {
        this.page = page
        this.cartItemsBadge = page.locator("//span[@data-test='shopping-cart-badge']")
        this.itemsInTheCart = page.locator('.item_pricebar')
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
    }

    async gotoCartPage() {
        await this.cartItemsBadge.click()
    }

    async verifyTotalNumberOfProductsInTheCart(expectedCartItemsCount) {
        expect(await this.itemsInTheCart.count()).toBe(expectedCartItemsCount) 
        // await this.page.pause()       
    }

    async checkoutCart() {
        await this.checkoutButton.click()        
    }
}