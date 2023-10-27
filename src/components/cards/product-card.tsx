import Link from "next/link";
import { FC } from "react";

import { BasicCard } from "./basic-card";
import { ProductCollectionDataFragment } from "~/graphql/generated/graphql";
import { getLinkToVariant } from "~/utils/paths";

export interface ProductCardProps {
  product: ProductCollectionDataFragment;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const defaultMediaImage = product.defaultMedia?.mediaCollection?.items[0];
  const firstVariant = product.variantsCollection?.items[0];
  const firstVariantImage = firstVariant?.media?.mediaCollection?.items[0];
  const headerImage = firstVariantImage ?? defaultMediaImage ?? undefined;
  const firstVariantLink = firstVariant ? getLinkToVariant(firstVariant, product) : "#";
  return (
    <Link href={firstVariantLink}>
      <BasicCard image={{ ...headerImage, width: 256, height: 170 }} title={product.name} />
    </Link>
  );
};
