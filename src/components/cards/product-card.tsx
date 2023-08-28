import Link from "next/link";
import { FC } from "react";

import { BasicCard } from ".";
import { ProductCollectionDataFragment } from "~/graphql/generated/graphql";

export interface ProductCardProps {
  product: ProductCollectionDataFragment;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const defaultMediaImage = product.defaultMedia?.mediaCollection?.items[0];
  const firstVariant = product.variantsCollection?.items[0];
  const firstVariantImage = firstVariant?.media?.mediaCollection?.items[0];
  const headerImage = firstVariantImage ?? defaultMediaImage ?? undefined;
  const firstVariantSlug = firstVariant?.slug ?? `${product?.slug}/sku/${firstVariant?.sku}`;
  return (
    <BasicCard
      image={{ ...headerImage, width: 256, height: 170 }}
      title={product.name}
      // body={renderRichText(product.description?.json)}
      actions={
        <>
          <Link href={`/products/${firstVariantSlug}`} className="btn btn-sm btn-outline">
            Vedi varianti
          </Link>
        </>
      }
    />
  );
};
