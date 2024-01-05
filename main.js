import { parseHTML } from "./htmlParser.js";
import { customSplit, customTrim, printNode, readHTMLFile } from "./helpers.js";
import { relativePath } from "./XPath.js";
import { TreeNode } from "./dataStructures.js";

const filePath = "example.html";
const htmlContent = readHTMLFile(filePath);

const root = new TreeNode("element", "root");

const parsedHTML = parseHTML(htmlContent, root);

let input =
  'COPY "//html/body/div/div" "//html/body/table[@id="table2"]/tr[2]/td"';

let inputArr = customSplit(input, " ");

switch (inputArr[0]) {
  case "PRINT":
    if (inputArr[1] === "//") {
      printNode(parsedHTML);
    } else {
      inputArr[1] = customTrim(inputArr[1], '"');

      var targetNodes = relativePath(parsedHTML, inputArr[1]);
      //   console.log(targetNodes);

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
    var targetNodes = relativePath(parsedHTML, inputArr[1]);

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
    var nodes1 = relativePath(parsedHTML, inputArr[1]);

    inputArr[2] = customTrim(inputArr[2], '"');

    var nodes2 = relativePath(parsedHTML, inputArr[2]);
    let newVal = "";

    for (const node of nodes1) {
      for (const child of node.children) {
        if (child.type === "text") {
          newVal = child.children;
        } else {
          newVal = child;
        }
      }
    }

    for (const node of nodes2) {
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

// printNode(parsedHTML);
