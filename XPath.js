import { customSplit, customTrim } from "./helpers.js";
// 'PRINT "//html/body/table/tr/td"';

var result = [];

function dfs(node, tagName) {
  if (node.tagName === tagName) {
    result.push(node);
  }
  if (node.type != "text") {
    for (const child of node.children) {
      dfs(child, tagName);
    }
  }
  return result;
}

function findNodeByPath(nodes, path) {
  if (path.length === 1) {
    for (const node of nodes) {
      dfs(node, path[0]);
    }
    return result;
  }
  const nextNodeTag = path.shift();

  var nextNodes = [];
  for (const node of nodes) {
    for (const child of node.children) {
      if (child.tagName === nextNodeTag) {
        nextNodes.push(child);
      }
    }
  }

  return findNodeByPath(nextNodes, path);
}

function relativePath(node, path) {
  path = customTrim(path, '"');
  if (path === "//") {
    return node;
  } else {
    var parts = customSplit(path, "/");
    parts.shift();
    parts.shift();
  }
  var nodes = [node];
  return findNodeByPath(nodes, parts);
}

export { relativePath };
