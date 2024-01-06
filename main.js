import { parseHTML } from "./htmlParser.js";
import { customSplit, customTrim, printNode, readHTMLFile } from "./helpers.js";
import { relativePath } from "./XPath.js";
import { TreeNode } from "./dataStructures.js";
import { treeToHTML } from "./treeToHTML.js";
import * as readline from "readline";
import { writeInFile } from "./writeInFile.js";

const filePath = "example.html";
const htmlContent = readHTMLFile(filePath);

const root = new TreeNode("element", "root");

const parsedHTML = parseHTML(htmlContent, root);

// let input =
//   'COPY "//html/body/div/div" "//html/body/table[@id="table2"]/tr[2]/td"';
let read = true;
let inputArr = [];
// do {
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Enter something: ", (input) => {
  //   console.log(`You entered: ${input}`);
  if (input === "Q") {
    read = false;
  }
  inputArr = customSplit(input, " ");
  var targetNodes = relativePath(parsedHTML, inputArr[1]);

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
  rl.close();
});

// } while (read);
let list = [];
list.push(parsedHTML);

// var parser = new DOMParser();

// // Parse the string into an HTML document
// var doc = parser.parseFromString(treeToHTML(list), "text/html");
// console.log(doc);
writeInFile(treeToHTML(list));
