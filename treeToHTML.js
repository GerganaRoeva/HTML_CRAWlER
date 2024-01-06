import { isTagSelfClosed } from "./helpers.js";

function treeToHTML(tree) {
  if (!tree || tree.length === 0) {
    return "";
  }
  let htmlStrings = "";
  for (const node of tree) {
    console.log(node.tagName);

    if (node.type === "text") {
      htmlStrings = htmlStrings.concat(node.children);
    } else {
      const childrenHtml = treeToHTML(node.children);

      if (node.type === "element") {
        if (!isTagSelfClosed(node.tagName)) {
          htmlStrings = htmlStrings.concat(
            `<${node.tagName} ${node.attributes}>${childrenHtml}</${node.tagName}>`
          );
        } else {
          htmlStrings = htmlStrings.concat(
            `<${node.tagName} ${node.attributes}>`
          );
        }
      }
    }
  }
  htmlStrings = htmlStrings.replace("</root>", "");
  htmlStrings = htmlStrings.replace("<root >", "");

  return htmlStrings;
}

export { treeToHTML };
