import { customSplit, customTrim, printNode } from "./helpers.js";
// PRINT "//html/body/table/tr/td

function findNodeByPath(node, path) {
  if (!node) {
    return null;
  }

  if (path.length === 0) {
    return node;
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
    const parts = customSplit(path, "/");
    parts.shift();
    parts.shift();

    return findNodeByPath(node, parts);
  }
}

export { relativePath };
