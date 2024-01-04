import { customSplit, customTrim } from "./helpers.js";
// 'PRINT "//html/body/table/tr/td"';

let result = [];
let maxDepth;

function dfs(node, tagName, depth) {
  if (node.tagName === tagName) {
    result.push(node);
  }
  if (node.type != "text") {
    for (const child of node.children) {
      if (depth <= maxDepth) dfs(child, tagName);
    }
  }
  return result;
}

function findNodeByPath(nodes, path, depth = 0) {
  if (path.length === 1) {
    for (const node of nodes) {
      dfs(node, path[0], depth);
    }
    return result;
  }
  const nextNodeTag = path.shift();
  depth += 1;

  let nextNodes = [];
  for (const node of nodes) {
    for (const child of node.children) {
      if (child.tagName === nextNodeTag) {
        nextNodes.push(child);
      }
    }
  }

  return findNodeByPath(nextNodes, path, depth);
}

function relativePath(node, path) {
  path = customTrim(path, '"');
  if (path === "//") {
    return node;
  } else {
    let parts = customSplit(path, "/");
    parts.shift();
    parts.shift();

    let nodes = [node];
    maxDepth = parts.length;
    return findNodeByPath(nodes, parts);
  }
}

export { relativePath };
