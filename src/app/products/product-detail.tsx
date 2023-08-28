import { FC } from "react";

import { MediaCarousel } from "~/components/media-carousel";
import { ProductDetailDataFragment, VariantDataFragment } from "~/graphql/generated/graphql";

export interface ProductDetailProps {
  product: ProductDetailDataFragment;
  variant: VariantDataFragment;
}

export const ProductDetail: FC<ProductDetailProps> = ({ product, variant }) => {
  const media = variant.media ?? product.defaultMedia;

  return (
    <div className="container mx-auto">
      {media && (
        <div className="max-w-sm">
          <MediaCarousel media={media} />
        </div>
      )}
    </div>
  );
};
