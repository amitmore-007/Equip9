function getOptimalEquipmentRoute(totalProviders, connections, stockAvailability, sourceProvider, neededEquipment) {
    const network = {};
    
    for (let i = 1; i <= totalProviders; i++) {
        network[i] = [];
    }

    for (const [pointA, pointB] of connections) {
        network[pointA].push(pointB);
        network[pointB].push(pointA);
    }

    const searchQueue = [[sourceProvider, [sourceProvider]]];
    const visitedNodes = new Set();
    visitedNodes.add(sourceProvider);
    const feasiblePaths = [];

    while (searchQueue.length > 0) {
        const [currentLocation, travelPath] = searchQueue.shift();

        if (stockAvailability[currentLocation] && stockAvailability[currentLocation].includes(neededEquipment)) {
            feasiblePaths.push(travelPath);
        }

        for (const nextStop of network[currentLocation]) {
            if (!visitedNodes.has(nextStop)) {
                visitedNodes.add(nextStop);
                searchQueue.push([nextStop, [...travelPath, nextStop]]);
            }
        }
    }

    if (feasiblePaths.length === 0) return -1;

    feasiblePaths.sort((routeA, routeB) => {
        const lastPointA = routeA[routeA.length - 1];
        const lastPointB = routeB[routeB.length - 1];
        return lastPointB - lastPointA;
    });

    return feasiblePaths[0];
}

// Example Execution
const totalProviders = 5;
const connections = [[1, 2], [2, 3], [3, 4], [4, 5]];
const stockAvailability = {
    1: ["excavator"],
    2: [],
    3: ["bulldozer"],
    4: ["excavator"],
    5: ["crane"]
};
const sourceProvider = 2;
const neededEquipment = "excavator";

const optimalRoute = getOptimalEquipmentRoute(totalProviders, connections, stockAvailability, sourceProvider, neededEquipment);
console.log(optimalRoute);
