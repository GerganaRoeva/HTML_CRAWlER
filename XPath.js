import { customSplit, customTrim } from "./helpers.js";
// PRINT "//html/body/p"

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

function findNodeByPath(node, path) {
  if (!node) {
    return null;
  }

  if (path.length === 1) {
    dfs(node, path[0]);
  }

  const nextNodeTag = path.shift();

  var nextNode = null;
  for (const child of node.children) {
    if (child.tagName === nextNodeTag) {
      var nextNode = child;
      break;
    }
  }

  return findNodeByPath(nextNode, path);
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
  findNodeByPath(node, parts);

  //   console.log(result);

  return result;
}

export { relativePath };
