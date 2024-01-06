import { writeFileSync } from "node:fs";

function writeInFile(content) {
  writeFileSync("./test.html", content);
}

export { writeInFile };
