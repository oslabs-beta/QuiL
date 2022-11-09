function Graph() {
  this.nodes = new Map();
  this.size = 0;
}

Graph.prototype.addNode = function (node) {
  this.nodes.set(node.name, node);
  ++this.size;
};

Graph.prototype.addConnection = function (
  startNode,
  fKeyName,
  destinationNode
) {
  if (!this.nodes.has(startNode.name) || !this.nodes.has(destinationNode.name))
    return;

  const newEdgesArray = [
    ...this.nodes.get(startNode.name).edges,
    { [fKeyName]: destinationNode.name },
  ];

  this.nodes.set(startNode.name, {
    ...this.nodes.get(startNode.name),
    edges: newEdgesArray,
  });
};

Graph.prototype.removeConnection = function () {};

Graph.prototype.removeNode = function () {};
module.exports = Graph;
