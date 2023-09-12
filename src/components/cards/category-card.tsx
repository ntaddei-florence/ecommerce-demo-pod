import Link from "next/link";
import { FC } from "react";

import { FlatCard } from "./flat-card";
import { CategoryDataFragment } from "~/graphql/generated/graphql";
import { renderRichText } from "~/utils/rich-text";

export interface CategoryCardProps {
  category: CategoryDataFragment;
}

export const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link href={`/categories/${category.slug}`} key={category.slug}>
      <FlatCard
        image={category.image}
        title={category.categoryName}
        body={renderRichText(category.description?.json)}
      />
    </Link>
  );
};
