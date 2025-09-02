import { Locator, Page, expect } from "@playwright/test";

export class AllProductsPage {
    page: Page
    burgerMenu: Locator
    addToCartButtons: Locator
    cartItemsBadge: Locator
    burgerMenuAllItems: Locator
    burgerMenuCloseButton: Locator

    constructor(page: Page) {
        this.page = page 
        this.burgerMenu = this.page.getByText('Open Menu')
        this.burgerMenuAllItems = this.page.getByText('All Items')
        this.addToCartButtons = page.locator("//button[contains(@data-test,'add-to-cart')]")
        this.cartItemsBadge = page.locator("//span[@data-test='shopping-cart-badge']") 
        this.burgerMenuCloseButton = page.locator('#react-burger-cross-btn')
    }

    async gotoAllProductsPage() {                
        if(this.page.url() !== 'https://www.saucedemo.com/inventory.html') {     
            await this.burgerMenu.click()
            await this.burgerMenuAllItems.click()
            await this.burgerMenuCloseButton.click()            
        }
    }    

    async addAllProductsToCart() {
        let totalNumberOfAddToCartButtons = await this.addToCartButtons.count()
        let firstAddToCartButtonCurrently = await this.addToCartButtons.first()
    
        for(let i = 0; i < totalNumberOfAddToCartButtons; i++) {
            await firstAddToCartButtonCurrently.click()
        }        
    
        expect(await this.getNumberOfItemsAddedToCartFromCartBadge()).toBe(totalNumberOfAddToCartButtons)        
    }

    async getNumberOfItemsAddedToCartFromCartBadge() {
        let numberOfCartItems = parseInt(await this.cartItemsBadge.innerText(), 10) // can also use Number(cartItemsText)
        return numberOfCartItems
    }
}