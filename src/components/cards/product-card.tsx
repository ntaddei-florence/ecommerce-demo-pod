import Link from "next/link";
import { FC } from "react";

import { BasicCard } from "./basic-card";
import { ProductCollectionDataFragment } from "~/graphql/generated/graphql";
import { localizedRoute, SupportedLanguages } from "~/i18n";
import { getLinkToVariant } from "~/utils/paths";

export interface ProductCardProps {
  product: ProductCollectionDataFragment;
  lang: string;
}

export const ProductCard: FC<ProductCardProps> = ({ product, lang }) => {
  const defaultMediaImage = product.defaultMedia?.mediaCollection?.items[0];
  const firstVariant = product.variantsCollection?.items[0];
  const firstVariantImage = firstVariant?.media?.mediaCollection?.items[0];
  const headerImage = firstVariantImage ?? defaultMediaImage ?? undefined;
  const firstVariantLink = firstVariant ? getLinkToVariant(firstVariant, product) : "#";
  return (
    <Link href={localizedRoute(firstVariantLink, lang as SupportedLanguages)}>
      <BasicCard image={{ ...headerImage, width: 256, height: 170 }} title={product.name} />
    </Link>
  );
};
