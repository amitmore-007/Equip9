class ExpenseTracker {
    constructor(size) {
        this.n = size;
        this.tree = new Array(size + 1).fill(0);
    }

    addExpense(dayIndex, amount) {
        while (dayIndex <= this.n) {
            this.tree[dayIndex] += amount;
            dayIndex += dayIndex & -dayIndex;
        }
    }

    getTotalUntil(dayIndex) {
        let total = 0;
        while (dayIndex > 0) {
            total += this.tree[dayIndex];
            dayIndex -= dayIndex & -dayIndex;
        }
        return total;
    }

    getExpenseInRange(startDay, endDay) {
        return this.getTotalUntil(endDay) - this.getTotalUntil(startDay - 1);
    }
}

function calculateExpenses(logs, dateRanges) {
    let uniqueDays = [...new Set(logs.map(entry => entry[1]))].sort();
    let dayToIndexMap = new Map();
    uniqueDays.forEach((day, idx) => dayToIndexMap.set(day, idx + 1));

    let tracker = new ExpenseTracker(uniqueDays.length);

    // Record expenses in the tracker
    for (let [_, date, cost] of logs) {
        tracker.addExpense(dayToIndexMap.get(date), cost);
    }


    let results = [];
    for (let [fromDate, toDate] of dateRanges) {
        if (!dayToIndexMap.has(fromDate) || !dayToIndexMap.has(toDate)) {
            results.push(0);
        } else {
            let startIdx = dayToIndexMap.get(fromDate);
            let endIdx = dayToIndexMap.get(toDate);
            results.push(tracker.getExpenseInRange(startIdx, endIdx));
        }
    }

    return results;
}

// Example usage
let expenseLogs = [
    ["101", "2024-01-01", 500],
    ["102", "2024-01-10", 300],
    ["101", "2024-01-15", 700]
];

let queries = [
    ["2024-01-01", "2024-01-10"],
    ["2024-01-01", "2024-01-15"]
];

console.log(calculateExpenses(expenseLogs, queries)); 
