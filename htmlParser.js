import { Stack, TreeNode } from "./dataStructures.js";
import { customTrim, isValidTagName, isTagSelfClosed } from "./helpers.js";

function parseHTML(html, root) {
  const stack = new Stack();
  stack.push(root);
  let currentText = "";
  // console.log(root)

  for (let i = 0; i < html.length; i++) {
    if (html[i] === "<") {
      if (customTrim(currentText)) {
        stack.peek().children.push(new TreeNode("text", null, {}, currentText));
      }
      currentText = "";
      if (html[i + 1] === "/") {
        let tagName = "";
        i += 2;
        while (html[i] !== ">") {
          tagName += html[i];
          i++;
        }

        if (stack.peek().tagName !== tagName) {
          throw new Error(
            `Tag mismatch: Expected </${
              stack.peek().tagName
            }> but found </${tagName}>`
          );
        }

        stack.pop();
      } else {
        let tagName = "";
        i++;
        while (html[i] !== ">" && html[i] !== " ") {
          tagName += html[i];
          i++;
        }
        let atribute = "";

        while (html[i] !== ">") {
          atribute += html[i];
          i++;
        } 
        atribute = customTrim(atribute);

        if (!isTagSelfClosed(tagName)) {
          if (!isValidTagName(tagName)) {
            throw new Error(`Invalid tag name: <${tagName}>`);
          }

          const newNode = new TreeNode("element", tagName, atribute);
          stack.peek().children.push(newNode);
          stack.push(newNode);
        } else {
          const newNode = new TreeNode("element", tagName, atribute);
          stack.peek().children.push(newNode);
        }
      }
    } else {
      currentText += html[i];
    }
  }

  if (stack.size() > 1) {
    throw new Error("HTML parsing error: Tags not properly closed");
  }

  return root;
}

export { parseHTML };
