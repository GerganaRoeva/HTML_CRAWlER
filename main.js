import { parseHTML } from "./htmlParser.js";
import { customSplit, customTrim, printNode, readHTMLFile } from "./helpers.js";
import { relativePath } from "./XPath.js";
import { TreeNode } from "./dataStructures.js";

const command = 0;
const path = 1;

const filePath = "example.html";
const htmlContent = readHTMLFile(filePath);

const root = new TreeNode("element", "root");

const parsedHTML = parseHTML(htmlContent, root);

var input = 'PRINT "//html/body/p"';

var inputArr = customSplit(input, " ");

switch (inputArr[command]) {
  case "PRINT":
    var targetNode = relativePath(parsedHTML, inputArr[path]);
    console.log(targetNode)
    break;
  case "SET":
  case "COPY":

  default:
    console.log("Invalid command");
}

// printNode(parsedHTML);
