import { test, expect } from '@playwright/test';
import {NavbarSection} from '../../pages/navbarSection';
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
        await expect(navbarSection.getSymbol('NVDA')).toHaveText('NVDA');
        await expect(navbarSection.getCompanyName('NVDA')).toHaveText('NVIDIA Corp');
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
        await expect(navbarSection.getSymbol('NVDA')).toHaveText('NVDA');
        await expect(navbarSection.getCompanyName('NVDA')).toHaveText('NVIDIA Corp');
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
        await expect(navbarSection.displaysearchDropdown()).toContainText(/a/i);
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
        await expect(navbarSection.displayListStockSortByA_Z(symbol)).toBeTruthy();
        });

    })

        test('User search by partial', async ({ page }) => {

        const navbarSection = new NavbarSection(page);  
        const symbol = uniSearchData.valid_symbol.patail_symbol;

        await test.step('Open markets page', async () => {
        await page.goto('https://stockanalyzer.adenxus.com/markets');
        });

        await test.step('Click Search bar', async () => {
        await navbarSection.clickSearchBar();
        });

        await test.step('Fill symbol', async () => {
        await navbarSection.searchbar.fill(symbol);
        });

        await test.step('System search includes both symbols and company names.', async () => {
        await expect(navbarSection.SystemSeachSymbolAndCompany_Name(symbol)).toBeTruthy();


        });
    })

        test('Users can search with case-insensitive keywords with nvda', async ({ page }) => {
        const navbarSection = new NavbarSection(page);
        const symbol = uniSearchData.valid_symbol.sensitive_case1;

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
        await expect(navbarSection.getSymbol('NVDA')).toHaveText('NVDA');
        await expect(navbarSection.getCompanyName('NVDA')).toHaveText('NVIDIA Corp');
    });

    })

        test('Users can search with case-insensitive keywords with NvDa', async ({ page }) => {
        const navbarSection = new NavbarSection(page);
        const symbol = uniSearchData.valid_symbol.sensitive_case2;

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
        await expect(navbarSection.getSymbol('NVDA')).toHaveText('NVDA');
        await expect(navbarSection.getCompanyName('NVDA')).toHaveText('NVIDIA Corp');
    });

    })
        test('Users can search with case-insensitive keywords with NVDA', async ({ page }) => {
        const navbarSection = new NavbarSection(page);
        const symbol = uniSearchData.valid_symbol.sensitive_case3;

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
        await expect(navbarSection.getSymbol('NVDA')).toHaveText('NVDA');
        await expect(navbarSection.getCompanyName('NVDA')).toHaveText('NVIDIA Corp');
    });

    })

        test('User search with invalid input whitespace', async ({ page }) => {
        const navbarSection = new NavbarSection(page);
        const whitespace = uniSearchData.invalid_input.whitespace;

        await test.step('Open markets page', async () => {
        await page.goto('https://stockanalyzer.adenxus.com/markets');
        });

        await test.step('Click Search bar', async () => {
        await navbarSection.clickSearchBar();
        });

        await test.step('Fill whitespace', async () => {
        await navbarSection.searchbar.fill(whitespace);
        });

        await test.step('Verify display default list', async () => {
        await expect(navbarSection.displaysearchDropdown()).toBeHidden();

    });

    })

        test('User search with invalid input symbol have whitespace', async ({ page }) => {
        const navbarSection = new NavbarSection(page);
        const symbol_with_whitespace = uniSearchData.invalid_input.symbolHaveWhitespace;

        await test.step('Open markets page', async () => {
        await page.goto('https://stockanalyzer.adenxus.com/markets');
        });

        await test.step('Click Search bar', async () => {
        await navbarSection.clickSearchBar();
        });

        await test.step('Fill symbol_with_whitespace', async () => {
        await navbarSection.searchbar.fill(symbol_with_whitespace);
        });

        await test.step('Verify search results are displayed', async () => {
        await expect(navbarSection.displaysearchDropdown()).toBeVisible();
        await expect(navbarSection.getSymbol('NVDA')).toHaveText('NVDA');
        await expect(navbarSection.getCompanyName('NVDA')).toHaveText('NVIDIA Corp');

    });

    })

        test('User search with invalid input emoji', async ({ page }) => {
        const navbarSection = new NavbarSection(page);
        const emoji = uniSearchData.invalid_input.Emoji;

        await test.step('Open markets page', async () => {
        await page.goto('https://stockanalyzer.adenxus.com/markets');
        });

        await test.step('Click Search bar', async () => {
        await navbarSection.clickSearchBar();
        });

        await test.step('Fill emoji', async () => {
        await navbarSection.searchbar.fill(emoji);
        });

        await test.step('Verify search field not accept emoji input', async () => {
        await expect(navbarSection.searchbar).toHaveValue('');

    });

    })

    
        test('User search with invalid input special character', async ({ page }) => {
        const navbarSection = new NavbarSection(page);
        const special_char = uniSearchData.invalid_input.special_character;

        await test.step('Open markets page', async () => {
        await page.goto('https://stockanalyzer.adenxus.com/markets');
        });

        await test.step('Click Search bar', async () => {
        await navbarSection.clickSearchBar();
        });

        await test.step('Fill special character', async () => {
        await navbarSection.searchbar.fill(special_char);
        });

        await test.step('Verify search field not accept some special character input', async () => {
        await expect(navbarSection.searchbar).toHaveValue('');

    });

    })


})

        test.describe('Verify clear search data', () => {

        test('User clear search field', async ({ page }) => {

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

        await test.step('Verify display search dropdown', async () => {
        await expect(navbarSection.displaysearchDropdown()).toBeVisible();
        });

        await test.step('Click clear button', async () => {
        await navbarSection.clickClearButton();
        });

        await test.step('Verify search field become empty', async () => {
        await expect(navbarSection.searchbar).toHaveValue('');
        });
    })


})


        test.describe('Verify system displays no results when search returns no data', () => {

        test('User search returned no data', async ({ page }) => {

        const navbarSection = new NavbarSection(page);  
        const symbol = uniSearchData.invalid_input.symbol_dont_exits;
        ;

        await test.step('Open markets page', async () => {
        await page.goto('https://stockanalyzer.adenxus.com/markets');
        });

        await test.step('Click Search bar', async () => {
        await navbarSection.clickSearchBar();
        });

        await test.step('Fill symbol', async () => {
        await navbarSection.searchbar.fill(symbol);
        });

        await test.step('Verify search dropdown display error message', async () => {
        await expect(navbarSection.displaysearchDropdown()).toContainText('Was not found for "XX123"');
        });

        
    })


})














