import { customSplit, customTrim } from "./helpers.js";

let result = [];
let maxDepth;

function getTagNameAndPosition(text) {
  let nextNodeTag = text;
  let position = -1;
  position =
    parseInt(
      nextNodeTag.substring(
        nextNodeTag.indexOf("[") + 1,
        nextNodeTag.indexOf("]")
      )
    ) - 1;
  nextNodeTag = nextNodeTag.substring(0, nextNodeTag.indexOf("["));
  return [nextNodeTag, position];
}

function dfs(node, tagName, depth) {
  if (tagName === "any") {
    result.push(node.children);
  } else {
    if (node.tagName === tagName) {
      result.push(node);
    }
  }
  if (node.type != "text") {
    for (const child of node.children) {
      if (depth <= maxDepth) dfs(child, tagName);
    }
  }

  return result;
}

function findNodeByPath(nodes, path, depth = 0) {
  let position = -1;
  let tagAndPos = [path[0], position];

  if (path.length === 1) {
    if (tagAndPos[0] === "*") {
      tagAndPos[0] = "any";
    }

    if (path[0].includes("[")) {
      tagAndPos = getTagNameAndPosition(path[0]);
    }

    for (const node of nodes) {
      dfs(node, tagAndPos[0], depth);
    }

    if (path[0].includes("[")) {
      return result[tagAndPos[1]];
    } else return result;
  }
  tagAndPos[0] = path.shift();
  depth += 1;

  if (tagAndPos[0].includes("["))
    tagAndPos = getTagNameAndPosition(tagAndPos[0]);

  let nextNodes = [];
  let nodesToSend = [];
  for (const node of nodes) {
    for (const child of node.children) {
      if (child.tagName === tagAndPos[0]) {
        nextNodes.push(child);
      }
    }
  }

  if (tagAndPos[1] != -1) {
    nodesToSend.push(nextNodes[tagAndPos[1]]);
  } else {
    nodesToSend = nextNodes;
  }
  return findNodeByPath(nodesToSend, path, depth);
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
