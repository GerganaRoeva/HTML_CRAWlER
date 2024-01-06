import {
  customSplit,
  customSubstring,
  customIncludes,
  customIndexOf,
} from "./helpers.js";

let result = [];
let maxDepth;
let attributFlag = false;
let atr = "";

function getTagName(text) {
  return customSubstring(text, 0, customIndexOf(text, "["));
}

function getPosition(text) {
  return (
    parseInt(
      customSubstring(
        text,
        customIndexOf(text, "[") + 1,
        customIndexOf(text, "]")
      )
    ) - 1
  );
}

function attributes(text) {
  let attribut = "";
  for (let i = customIndexOf(text, "[") + 2; i < text.length; i++) {
    if (text[i] === "]") break;
    attribut += text[i];
  }

  return attribut;
}

function dfs(node, tagName, atr, depth) {
  if (tagName === "any") {
    for (const child of node.children) {
      if (child.type === "text") {
        result.push(child.children);
      } else result.push(child);
    }
  } else {
    // console.log(node)
    for (const child of node.children) {
      // console.log(node.children())
      if (child.tagName === tagName) {
        if (attributFlag) {
      // console.log(atr)
      // console.log(child.attributes)


          if (atr === child.attributes) {
            result.push(child);
          }
        } else {
          result.push(child);
        }
      }
    }
  }
  depth += depth;
  if (node.type != "text") {
    for (const child of node.children) {
      if (depth <= maxDepth) {
        dfs(child, tagName, atr, depth);
      }
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
      if (path[0][customIndexOf(path[0], "[") + 1] === "@") {
        atr = attributes(path[0]);
        attributFlag = true;
      } else {
        tagAndPos[1] = getPosition(path[0]);
        attributFlag = false;
      }
    }

    for (const node of nodes) {
      dfs(node, tagAndPos[0], atr, depth);
    }

    if (customIncludes(path[0], "[") && !customIncludes(path[0], "@")) {
      let list = [];
      list.push(result[tagAndPos[1]]);
      return list;
    } else return result;
  }

  tagAndPos[0] = path.shift();

  depth += 1;

  if (customIncludes(tagAndPos[0], "[")) {
    if (tagAndPos[0][customIndexOf(tagAndPos[0], "[") + 1] === "@") {
      atr = attributes(tagAndPos[0]);
      attributFlag = true;
    } else {
      tagAndPos[1] = getPosition(tagAndPos[0]);

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
    nodesToSend.push(nextNodes[tagAndPos[1]]);
  } else {
    nodesToSend = nextNodes;
  }
  return findNodeByPath(nodesToSend, path, depth);
}

function relativePath(node, path) {
  let parts = customSplit(path, "/");

  parts.shift();
  parts.shift();

  if (parts.length < 1) {
    return console.log("Incorrect path format");
  }

  let nodes = [node];
  maxDepth = parts.length;
  nodes = findNodeByPath(nodes, parts);
  result = [];
  return nodes;
}

export { relativePath };
