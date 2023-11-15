import { ImageLoader } from "next/image";

const imageLoader: ImageLoader = ({ src }) => {
  return src;
};

export default imageLoader;
