import { readFileSync } from "fs";
import { Stack } from "./dataStructures.js";
import { customTrim } from "./helpers.js";

class Node {
  constructor(type, tagName = null, attributes = {}, children = []) {
    this.type = type;
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = children;
  }
}

function parseHTML(html) {
  const root = new Node("element", "root");
  const stack = new Stack();
  stack.push(root);
  let currentText = "";

  for (let i = 0; i < html.length; i++) {
    if (html[i] === "<") {
      if (customTrim(currentText)) {
        stack.peek().children.push(new Node("text", null, {}, currentText));
      }
      currentText = "";
      if (html[i + 1] === "/") {
        let tagName = "";
        i += 2;
        while (html[i] !== ">") {
          tagName += html[i];
          i++;
        }
        stack.pop();
      } else {
        let tagName = "";
        i++;
        while (html[i] !== ">" && html[i] !== " ") {
          tagName += html[i];
          i++;
        }
        const newNode = new Node("element", tagName);
        stack.peek().children.push(newNode);

        stack.push(newNode);

        while (html[i] !== ">") i++;
      }
    } else {
      currentText += html[i];
    }
  }

  return root;
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

function readHTMLFile(filePath) {
  try {
    return readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    process.exit(1);
  }
}

const filePath = "example.html";
const htmlContent = readHTMLFile(filePath);

const parsedHTML = parseHTML(htmlContent);
printNode(parsedHTML);
