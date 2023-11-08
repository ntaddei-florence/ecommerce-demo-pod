import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

const options = {};

export const renderRichText = (doc: Document) => documentToReactComponents(doc, options);
