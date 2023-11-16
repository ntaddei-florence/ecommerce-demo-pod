import { ImageLoader } from "next/image";

const imageLoader: ImageLoader = ({ src }) => {
  // TODO: implement width for optimization
  return src;
};

export default imageLoader;
