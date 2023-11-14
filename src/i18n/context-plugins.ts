import { SupportedLanguages } from "./config";
import { ContextPlugin } from "./types";

const defaultPlugins: ContextPlugin[] = [
  ({ count }) => {
    if (count === undefined) return null;
    const toReturn = [count.toString()];
    if (count !== 1) toReturn.push("many");
    return toReturn;
  },
];

// Plugins potentially depend on language (some languages have different rules for plurals, etc.)
const plugins: Record<SupportedLanguages, ContextPlugin[]> = {
  it: defaultPlugins,
  en: defaultPlugins,
};

export function getPlugins(lang: SupportedLanguages) {
  return plugins[lang];
}
