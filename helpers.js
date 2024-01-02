import { selfClosingTags } from "./tagLists/selfClosingTags.js";
import { validTagNames } from "./tagLists/validTagNAmes.js";
import { readFileSync } from "fs";

function readHTMLFile(filePath) {
  try {
    return readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    process.exit(1);
  }
}

function printNode(node, indent = 0) {
  const indentation = " ".repeat(indent);
  if (node.type === "text") {
    console.log(
      `${indentation}Node: ${node.type}, Content: "${node.children}"`
    );
  } else {
    console.log(`${indentation}Node: ${node.type}, Tag: ${node.tagName}`);
    node.children.forEach((child) => {
      printNode(child, indent + 2);
    });
  }
}

function isWhitespace(char) {
  return char === " " || char === "\t" || char === "\n" || char === "\r";
}

function customTrim(str, symbol) {
  let start = 0;
  let end = str.length - 1;

  if (symbol === undefined) {
    // Trim leading whitespace
    while (start <= end && isWhitespace(str[start])) {
      start++;
    }

    // Trim trailing whitespace
    while (end >= start && isWhitespace(str[end])) {
      end--;
    }
  } else {
    while (start < end && str[start] === symbol) {
      start++;
    }

    while (end > start && str[end] === symbol) {
      end--;
    }
  }

  // Extract the trimmed substring
  const trimmed = str.substring(start, end + 1);
  return trimmed;
}

function customSplit(str, separator) {
  const result = [];
  let startIndex = 0;

  for (let i = 0; i < str.length; i++) {
    if (str.substring(i, i + separator.length) === separator) {
      result.push(str.substring(startIndex, i));
      startIndex = i + separator.length;
      i = startIndex - 1;
    }
  }

  result.push(str.substring(startIndex)); // Add the remaining part after the last separator

  return result;
}

function isValidTagName(tagName) {
  return validTagNames.includes(tagName);
}

function isTagSelfClosed(tagName) {
  return selfClosingTags.includes(tagName);
}

export {
  customTrim,
  customSplit,
  isValidTagName,
  isTagSelfClosed,
  printNode,
  readHTMLFile,
};
