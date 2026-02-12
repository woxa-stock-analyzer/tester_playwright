import test from "@playwright/test";
import { MarketPage } from "../../pages/marketPage";


let market: MarketPage;

test.beforeEach(async ({page}) => {
    market = new MarketPage(page);
})