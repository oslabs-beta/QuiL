// Change this to TS lateer

function Graph () {
    this.nodes = new Map<{tableName: string, primaryKey: string, fKeys: [], attributeNames: [] }, []>()
    // this.nodes = new Map<type, >()
}

Graph.prototype.addNode = function (node) {
    this.nodes[node] = []
}


const node1 = {
    tableName: 'planets',
    primaryKey: '_id',
    fKeys: [],
    attributeNames: ['rotation_period', 'orbital_period'],
}

const graph = new Graph()

graph.addNode(node1)