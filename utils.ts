import path from "path";
import { fileURLToPath } from "url";

export const __fileName = fileURLToPath(import.meta.url);
export const __dirName = path.dirname(__fileName);
