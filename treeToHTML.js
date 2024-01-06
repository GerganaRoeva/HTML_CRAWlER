import { isTagSelfClosed, customConcat, customReplace } from "./helpers.js";

function treeToHTML(tree) {
  if (!tree || tree.length === 0) {
    return "";
  }
  let htmlStrings = "";
  for (const node of tree) {

    if (node.type === "text") {
      htmlStrings = customConcat(htmlStrings, node.children);
    } else {
      const childrenHtml = treeToHTML(node.children);

      if (node.type === "element") {
        if (!isTagSelfClosed(node.tagName)) {
          htmlStrings = customConcat(
            htmlStrings,
            `<${node.tagName} ${node.attributes}>${childrenHtml}</${node.tagName}>`
          );
        } else {
          htmlStrings = customConcat(
            htmlStrings,
            `<${node.tagName} ${node.attributes}>`
          );
        }
      }
    }
  }
  htmlStrings = customReplace(htmlStrings, "</root>", "");
  htmlStrings = customReplace(htmlStrings, "<root >", "");

  return htmlStrings;
}

export { treeToHTML };
