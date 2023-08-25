import Link from "next/link";
import { FC } from "react";

import { BasicCard } from ".";
import { ProductCollectionDataFragment } from "~/graphql/generated/graphql";

export interface ProductCardProps {
  product: ProductCollectionDataFragment;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <BasicCard
      // image={{ ...product.image, width: 256, height: 170 }}
      title={product.name}
      // body={renderRichText(product.description?.json)}
      actions={
        <>
          <Link href={`/products/${product.sys.id}`} className="btn btn-sm btn-outline">
            Vedi varianti
          </Link>
        </>
      }
    />
  );
};
