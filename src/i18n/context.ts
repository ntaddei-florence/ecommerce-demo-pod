import { ContextParams, ContextPlugin } from "./types";

export function getContextScores(params: ContextParams, plugins: ContextPlugin[]) {
  return plugins.map((plugin) => plugin(params));
}

export function getBestMatchTemplate(
  // these are the params passed to t function
  params: ContextParams,
  // this is the sub-dictionary holding context-keys
  contextDictionary: Record<string, string>,
  plugins: ContextPlugin[]
) {
  const paramsScoredKeys = getContextScores(params, plugins).flat().filter(Boolean);

  const contextKeysToCompare = Object.keys(contextDictionary);

  // for each key in the subdictionary, we want to calculate its score (how well they match params)
  const scoreMap = contextKeysToCompare.reduce(
    (acc, contextKey) => {
      // each key part represent a piece of context (i.e. many, female, etc.)
      const contextKeyParts = contextKey.split("_").filter(Boolean);
      let keyScore = 0;
      let orderScore = 0;
      for (const keyPart of contextKeyParts) {
        const scoreIndex = paramsScoredKeys.indexOf(keyPart);

        if (scoreIndex > -1) {
          // if the key part was found in params, add the relative score
          keyScore += 1;
          orderScore += scoreIndex;
        } else {
          // if the key contains a part that is not present in the params, it must be excluded
          keyScore = -1;
          break;
        }
      }

      if (keyScore >= 0) {
        return {
          ...acc,
          [contextKey]: { keyScore, orderScore },
        };
      } else {
        return acc;
      }
    },
    {} as Record<string, { keyScore: number; orderScore: number }>
  );

  const sortedMatches = Object.entries(scoreMap).sort(([aKey, aScore], [bKey, bScore]) => {
    // First order by keyScore (the number of "pieces" matched in key)
    if (aScore.keyScore < bScore.keyScore) return 1;
    if (bScore.keyScore < aScore.keyScore) return -1;

    // if keyScore is the same, order by specificity
    // a key is more specific than another if it has more "pieces" (separated by _)
    const aKeys = aKey.split("_");
    const bKeys = bKey.split("_");

    if (aKeys.length > bKeys.length) return -1;
    if (aKeys.length < bKeys.length) return 1;

    // if two keys have same score and specificity, use the same order returned by the plugin
    return aScore.orderScore < bScore.orderScore ? -1 : 1;
  });

  const bestMatch = sortedMatches[0];
  if (bestMatch) {
    const bestKey = bestMatch[0];
    return contextDictionary[bestKey];
  }

  return "";
}
