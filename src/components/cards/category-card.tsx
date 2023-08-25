import Link from "next/link";
import { FC } from "react";

import { BasicCard } from ".";
import { CategoryDataFragment } from "~/graphql/generated/graphql";
import { renderRichText } from "~/utils/rich-text";

export interface CategoryCardProps {
  category: CategoryDataFragment;
}

export const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <BasicCard
      image={{ ...category.image, width: 256, height: 170 }}
      title={category.categoryName}
      body={renderRichText(category.description?.json)}
      actions={
        <>
          <Link href={`/categories/${category.slug}`} className="btn btn-sm btn-outline">
            Vedi tutto
          </Link>
        </>
      }
    />
  );
};
