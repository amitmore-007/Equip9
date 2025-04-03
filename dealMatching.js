class PriceManager {
    constructor() {
        this.listings = [];
    }

    insert(price) {
        this.listings.push(price);
        this.listings.sort((a, b) => a - b);
    }

    getCheapest() {
        return this.listings.length ? this.listings[0] : null;
    }

    removeCheapest() {
        return this.listings.shift();
    }

    hasEntries() {
        return this.listings.length > 0;
    }
}

function matchBuyersToSellers(purchaseRequests, vendorOffers) {
    let marketplace = new Map();

    for (const [equipment, price] of vendorOffers) {
        if (!marketplace.has(equipment)) {
            marketplace.set(equipment, new PriceManager());
        }
        marketplace.get(equipment).insert(price);
    }

    let finalDeals = [];

    for (const [desiredItem, maxSpend] of purchaseRequests) {
        if (!marketplace.has(desiredItem)) {
            finalDeals.push(null);
            continue;
        }

        let priceList = marketplace.get(desiredItem);

        while (priceList.hasEntries() && priceList.getCheapest() > maxSpend) {
            priceList.removeCheapest();
        }

        finalDeals.push(priceList.hasEntries() ? priceList.removeCheapest() : null);
    }

    return finalDeals;
}

// Example Execution
let buyerRequests = [["excavator", 50000], ["bulldozer", 70000]];
let sellerListings = [["excavator", 45000], ["bulldozer", 68000], ["excavator", 48000]];

console.log(matchBuyersToSellers(buyerRequests, sellerListings));
