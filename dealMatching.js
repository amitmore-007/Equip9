class SellerPrices {
    constructor() {
        this.prices = [];
    }

    addPrice(price) {
        this.prices.push(price);
        this.prices.sort((a, b) => a - b);
    }

    getLowest() {
        return this.prices.length > 0 ? this.prices[0] : null;
    }

    removeLowest() {
        return this.prices.shift(); 
    }

    hasPrices() {
        return this.prices.length > 0;
    }
}

function findBestDeals(buyers, sellers) {
    let sellerData = new Map();

   
    for (let [item, price] of sellers) {
        if (!sellerData.has(item)) {
            sellerData.set(item, new SellerPrices());
        }
        sellerData.get(item).addPrice(price);
    }

    let matchedDeals = [];

    for (let [item, maxBudget] of buyers) {
        if (!sellerData.has(item)) {
            matchedDeals.push(null);
            continue;
        }

        let availablePrices = sellerData.get(item);

        
        while (availablePrices.hasPrices() && availablePrices.getLowest() > maxBudget) {
            availablePrices.removeLowest();
        }

        matchedDeals.push(availablePrices.hasPrices() ? availablePrices.removeLowest() : null);
    }

    return matchedDeals;
}


let buyersList = [["excavator", 50000], ["bulldozer", 70000]];
let sellersList = [["excavator", 45000], ["bulldozer", 68000], ["excavator", 48000]];

console.log(findBestDeals(buyersList, sellersList));
