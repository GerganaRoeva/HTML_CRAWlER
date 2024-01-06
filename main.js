import { parseHTML } from "./htmlParser.js";
import { customSplit, customTrim, printNode, readHTMLFile } from "./helpers.js";
import { relativePath } from "./XPath.js";
import { TreeNode } from "./dataStructures.js";
import readline from "readline";

const filePath = "example.html";
const htmlContent = readHTMLFile(filePath);

const root = new TreeNode("element", "root");

const parsedHTML = parseHTML(htmlContent, root);

let inputArr = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  inputArr = customSplit(input, " ");

  if (inputArr[0] === "Q") return;

  if (inputArr.length > 1) {
    const targetNodes = relativePath(parsedHTML, inputArr[1]);

    switch (inputArr[0]) {
      case "PRINT":
        inputArr[1] = customTrim(inputArr[1], '"');

        if (inputArr[1] === "//") {
          printNode(parsedHTML);
        } else {
          for (const node of targetNodes)
            for (const child of node.children) {
              if (child.type === "text") {
                console.log(child.children);
              } else console.log(child);
            }
        }
        break;
      case "SET":
        inputArr[1] = customTrim(inputArr[1], '"');

        for (const node of targetNodes) {
          for (const child of node.children) {
            if (child.type === "text") {
              child.children = customTrim(inputArr[2], '"');
              console.log(child.children);
            } else {
              child = customTrim(inputArr[2], '"');
              console.log(child);
            }
          }
        }
        break;
      case "COPY":
        inputArr[1] = customTrim(inputArr[1], '"');

        inputArr[2] = customTrim(inputArr[2], '"');

        var nodes = relativePath(parsedHTML, inputArr[2]);
        let newVal = "";

        for (const node of targetNodes) {
          for (const child of node.children) {
            if (child.type === "text") {
              newVal = child.children;
            } else {
              newVal = child;
            }
          }
        }

        for (const node of nodes) {
          for (const child of node.children) {
            if (child.type === "text") {
              child.children = newVal;
              console.log(child.children);
            } else {
              child = newVal;
              console.log(child);
            }
          }
        }
        break;

      default:
        console.log("Invalid command");
    }
  } else console.log("Invalid command");
});

let list = [];
list.push(parsedHTML);
// writeInFile(treeToHTML(list));
