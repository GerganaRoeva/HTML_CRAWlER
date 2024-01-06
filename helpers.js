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
    while (start <= end && isWhitespace(str[start])) {
      start++;
    }

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

  const trimmed = customSubstring(str, start, end + 1);
  return trimmed;
}

function customSubstring(str, start, end) {
  if (end === undefined) {
    end = str.length;
  }

  if (start < 0) {
    start = Math.max(str.length + start, 0);
  }

  if (end < 0) {
    end = Math.max(str.length + end, 0);
  }

  start = Math.min(Math.max(start, 0), str.length);
  end = Math.min(Math.max(end, 0), str.length);

  const result = [];
  for (let i = start; i < end; i++) {
    result.push(str[i]);
  }

  return result.join("");
}

function customSplit(str, separator) {
  const result = [];
  let startIndex = 0;

  for (let i = 0; i < str.length; i++) {
    if (customSubstring(str, i, i + separator.length) === separator) {
      result.push(customSubstring(str, startIndex, i));
      startIndex = i + separator.length;
      i = startIndex - 1;
    }
  }

  result.push(customSubstring(str, startIndex)); // Add the remaining part after the last separator

  return result;
}

function customConcat(arr1, arr2) {
  const result = [];

  // Copy elements from the first array
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i]);
  }

  // Copy elements from the second array
  for (let i = 0; i < arr2.length; i++) {
    result.push(arr2[i]);
  }

  return result;
}

function customReplace(str, search, replacement) {
  const parts = customSplit(str, search);
  const result = parts.join(replacement);
  return result;
}

function customIndexOf(str, search, startIndex = 0) {
  // Handle negative startIndex
  startIndex = Math.max(startIndex, 0);

  for (let i = startIndex; i < str.length - search.length + 1; i++) {
    // Check if the substring starting at index i matches the search string
    let found = true;
    for (let j = 0; j < search.length; j++) {
      if (str[i + j] !== search[j]) {
        found = false;
        break;
      }
    }

    if (found) {
      return i; // Return the index if the substring is found
    }
  }

  return -1; // Return -1 if the substring is not found
}

function customIncludes(str, search, startIndex = 0) {
  // Use the customIndexOf function to check if the search string exists in the original string
  return customIndexOf(str, search, startIndex) !== -1;
}

function isValidTagName(tagName) {
  for (const validName of validTagNames) {
    if (tagName === validName) {
      return true;
    }
  }

  return false;
}

function isTagSelfClosed(tagName) {
  for (const validName of selfClosingTags) {
    if (tagName === validName) {
      return true;
    }
  }

  return false;
}

export {
  customTrim,
  customSplit,
  isValidTagName,
  isTagSelfClosed,
  printNode,
  readHTMLFile,
  customConcat,
  customSubstring,
  customReplace,
  customIndexOf,
  customIncludes,
};
