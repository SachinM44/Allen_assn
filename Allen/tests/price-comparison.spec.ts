import { test, expect, Page } from '@playwright/test';

interface ProductInfo {
  name: string;
  price: number;
  site: string;
}

async function searchFlipkart(page: Page, productName: string): Promise<ProductInfo> {
  await page.goto('https://www.flipkart.com', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveURL(/flipkart\.com/);

  const searchBox = page.locator('input[name="q"]');
  await searchBox.fill(productName);
  await searchBox.press('Enter');

  await page.waitForTimeout(3000);

  const productContainer = page.locator('div[data-id]').first();
  await expect(productContainer).toBeVisible({ timeout: 10000 });

  const productNameElement = productContainer.locator('a').first();
  const priceElement = productContainer.locator('div:has-text("₹")').first();

  const name = await productNameElement.textContent() || '';
  const priceText = await priceElement.textContent() || '';
  const price = parseFloat(priceText.replace(/[₹,]/g, ''));

  return { name, price, site: 'Flipkart' };
}

async function searchAmazon(page: Page, productName: string): Promise<ProductInfo> {
  await page.goto('https://www.amazon.in', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveURL(/amazon\.in/);

  const searchBox = page.locator('#twotabsearchtextbox');
  await searchBox.fill(productName);
  await searchBox.press('Enter');

  await page.waitForTimeout(3000);

  const firstProduct = page.locator('[data-component-type="s-search-result"]').first();
  await expect(firstProduct).toBeVisible({ timeout: 10000 });

  const productNameElement = firstProduct.locator('h2 a span').first();
  const priceElement = firstProduct.locator('.a-price-whole').first();

  const name = await productNameElement.textContent() || '';
  const priceText = await priceElement.textContent() || '';
  const price = parseFloat(priceText.replace(/[₹,]/g, ''));

  return { name, price, site: 'Amazon' };
}

test.describe('Product Price Comparison', () => {
  test('Compare iPhone 15 Plus prices on Flipkart and Amazon', async ({ browser }) => {
    const productToSearch = 'iphone 15 plus';
    
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const flipkartPage = await context1.newPage();
    const amazonPage = await context2.newPage();
    
    const [flipkartProduct, amazonProduct] = await Promise.all([
      searchFlipkart(flipkartPage, productToSearch),
      searchAmazon(amazonPage, productToSearch)
    ]);
    
    console.log('Flipkart Product:', flipkartProduct);
    console.log('Amazon Product:', amazonProduct);
    
    expect(flipkartProduct.name.toLowerCase()).toContain('iphone');
    expect(flipkartProduct.name.toLowerCase()).toContain('15');
    expect(flipkartProduct.name.toLowerCase()).toContain('plus');
    expect(flipkartProduct.price).toBeGreaterThan(0);
    
    expect(amazonProduct.name.toLowerCase()).toContain('iphone');
    expect(amazonProduct.name.toLowerCase()).toContain('15');
    expect(amazonProduct.name.toLowerCase()).toContain('plus');
    expect(amazonProduct.price).toBeGreaterThan(0);
    
    console.log(`Flipkart Price: ₹${flipkartProduct.price}`);
    console.log(`Amazon Price: ₹${amazonProduct.price}`);
    
    if (flipkartProduct.price < amazonProduct.price) {
      console.log('✅ Test PASSED: Flipkart has a lower price');
      expect(flipkartProduct.price).toBeLessThan(amazonProduct.price);
    } else {
      const message = `❌ Test FAILED: Flipkart price (₹${flipkartProduct.price}) is not less than Amazon price (₹${amazonProduct.price})`;
      console.log(message);
      throw new Error(message);
    }
    
    await context1.close();
    await context2.close();
  });
});
