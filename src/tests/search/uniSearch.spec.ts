import { test, expect } from '@playwright/test';
import NavbarSection from '../../pages/navbarSection';
import uniSearchData from '../../data/uniSearch.json';

test.describe('User search with valid value', () => {
    test('User search found company name only', async ({ page }) => {
        const navbarSection = new NavbarSection(page);
        const company_name = uniSearchData.valid_company_name.company_name;

        await test.step('Open markets page', async () => {
        await page.goto('https://stockanalyzer.adenxus.com/markets');
        });

        await test.step('Click Search bar', async () => {
        await navbarSection.clickSearchBar();
        });

        await test.step('Fill symbol', async () => {
        await navbarSection.searchbar.fill(company_name);
        });

        await test.step('Verify search results are displayed', async () => {
        await expect(navbarSection.displaysearchDropdown()).toBeVisible();
        await expect(navbarSection.displaySymbol()).toContainText('NVDA');
        await expect(navbarSection.displayCompanyName()).toContainText('NVIDIA Corp');
    });

    })

    test('User search found symbol only', async ({ page }) => {
        const navbarSection = new NavbarSection(page);
        const symbol = uniSearchData.valid_symbol.full_symbol;

        await test.step('Open markets page', async () => {
        await page.goto('https://stockanalyzer.adenxus.com/markets');
        });

        await test.step('Click Search bar', async () => {
        await navbarSection.clickSearchBar();
        });

        await test.step('Fill symbol', async () => {
        await navbarSection.searchbar.fill(symbol);
        });

        await test.step('Verify search results are displayed', async () => {
        await expect(navbarSection.displaysearchDropdown()).toBeVisible();
        await expect(navbarSection.displaySymbol()).toContainText('NVDA');
        await expect(navbarSection.displayCompanyName()).toContainText('NVIDIA Corp');
    });

    })

    
    test('User search found company name and symbol', async ({ page }) => {
        const navbarSection = new NavbarSection(page);
        const symbol = uniSearchData.valid_symbol.some_symbol;

        await test.step('Open markets page', async () => {
        await page.goto('https://stockanalyzer.adenxus.com/markets');
        });

        await test.step('Click Search bar', async () => {
        await navbarSection.clickSearchBar();
        });

        await test.step('Fill symbol', async () => {
        await navbarSection.searchbar.fill(symbol);
        });

        await test.step('Verify search results have A letter', async () => {
        await expect(navbarSection.displaysearchDropdown()).toBeVisible();
        await page.waitForTimeout(1000);
        await expect(navbarSection.displaysearchDropdown()).toContainText(/z/i);
        });

    })
});


    test.describe('Search Logic', () => {
        test('User search with valid data  the result sort', async ({ page }) => {

        const navbarSection = new NavbarSection(page);  
        const symbol = uniSearchData.valid_symbol.some_symbol;

        await test.step('Open markets page', async () => {
        await page.goto('https://stockanalyzer.adenxus.com/markets');
        });

        await test.step('Click Search bar', async () => {
        await navbarSection.clickSearchBar();
        });

        await test.step('Fill symbol', async () => {
        await navbarSection.searchbar.fill(symbol);
        });

await test.step('Verify symbols sorted A-Z', async () => {
  await expect(navbarSection.searchDropdown).toBeVisible();

  // รอให้ result โผล่
  await expect(navbarSection.symbol.first()).toBeVisible();

  const symbols = await navbarSection.symbol.allTextContents();

  const sorted = [...symbols].sort((a, b) =>
    a.localeCompare(b, 'en', { sensitivity: 'base' })
  );

  expect(symbols).toEqual(sorted);
});


        })
    });













