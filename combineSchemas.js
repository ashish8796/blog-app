import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaDir = path.join(__dirname, "prisma", "models");
const schemaFiles = fs
  .readdirSync(schemaDir)
  .filter((file) => file.endsWith(".prisma"));

let combinedSchema = "";

schemaFiles.forEach((file) => {
  const filePath = path.join(schemaDir, file);
  const schemaPart = fs.readFileSync(filePath, "utf8");
  combinedSchema += schemaPart + "\n";
});

const mainSchemaPath = path.join(__dirname, "prisma", "schema.prisma");
fs.writeFileSync(mainSchemaPath, combinedSchema);
console.log(`Combined schema written to ${mainSchemaPath} successfully.`);
