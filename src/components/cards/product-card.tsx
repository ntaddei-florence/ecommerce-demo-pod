import { FC } from "react";

import { ProductIndexData } from "~/algolia/types";

export interface ProductCardProps {
  product: ProductIndexData;
  lang: string;
}

export const ProductCard: FC<ProductCardProps> = ({}) => {
  // const defaultMediaImage = product.defaultMedia?.mediaCollection?.items[0];
  // const firstVariant = product.variantsCollection?.items[0];
  // const firstVariantImage = firstVariant?.media?.mediaCollection?.items[0];
  // const headerImage = firstVariantImage ?? defaultMediaImage ?? undefined;
  // const firstVariantLink = firstVariant ? getLinkToVariant(firstVariant, product) : "#";
  // return (
  //   <Link href={localizedRoute(firstVariantLink, lang)}>
  //     <BasicCard image={{ ...headerImage, width: 256, height: 170 }} title={product.name} />
  //   </Link>
  // );
  return null;
};
