import { customSplit, customTrim } from "./helpers.js";

let result = [];
let maxDepth;
let attributFlag = false;
let atr = "";

function getTagName(text) {
  return text.substring(0, text.indexOf("["));
}

function getPosition(text) {
  return parseInt(text.substring(text.indexOf("[") + 1, text.indexOf("]"))) - 1;
}

function attributes(text) {
  let attribut = "";
  for (let i = text.indexOf("[") + 2; i < text.length; i++) {
    if (text[i] === "]") break;
    attribut += text[i];
  }

  return attribut;
}

function dfs(node, tagName, atr, depth) {
//   console.log(node);
  if (tagName === "any") {
    result.push(node.children);
  } else {
    if (node.tagName === tagName) {
      if (attributFlag) {
        if (atr === node.attributes) {
          result.push(node);
        }
      } else {
        result.push(node);
      }
    }
  }
  if (node.type != "text") {
    for (const child of node.children) {
      if (depth <= maxDepth) dfs(child, tagName, atr);
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
      tagAndPos[0] = getTagName(path[0]);
      if (path[0][path[0].indexOf("[") + 1] === "@") {
        atr = attributes(path[0]);

        attributFlag = true;
      } else {
        tagAndPos[1] = getPosition(path[0]);
        attributFlag = false;
      }
    }
    // console.log(nodes);

    for (const node of nodes) {
      dfs(node, tagAndPos[0], atr, depth);
    }

    if (path[0].includes("[") && !path[0].includes("@")) {
      return result[tagAndPos[1]];
    } else return result;
  }

  tagAndPos[0] = path.shift();

  depth += 1;

  if (tagAndPos[0].includes("[")) {
    // console.log(tagAndPos[0])

    if (tagAndPos[0][tagAndPos[0].indexOf("[") + 1] === "@") {
      atr = attributes(tagAndPos[0]);
      attributFlag = true;
    } else {

      tagAndPos[1] = getPosition(tagAndPos[0] );
    // console.log(tagAndPos[1])

      attributFlag = false;
    }
    tagAndPos[0] = getTagName(tagAndPos[0]);
  }

  let nextNodes = [];
  let nodesToSend = [];

  for (const node of nodes) {
    for (const child of node.children) {
      if (child.tagName === tagAndPos[0]) {
        if (attributFlag) {
          if (atr === child.attributes) {
            nextNodes.push(child);
          }
        } else {
          nextNodes.push(child);
        }
      }
    }
  }
  

  if (tagAndPos[1] != -1) {
    // console.log(tagAndPos[1]);
    nodesToSend.push(nextNodes[tagAndPos[1]]);
  } else {
    nodesToSend = nextNodes;
  }

    // console.log(nodesToSend);

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
