import Link from "next/link";
import { FC } from "react";

import { FlatCard } from "./flat-card";
import { CategoryDataFragment } from "~/graphql/generated/graphql";
import { localizedRoute, SupportedLanguages } from "~/i18n";
import { renderRichText } from "~/utils/rich-text";

export interface CategoryCardProps {
  category: CategoryDataFragment;
  lang: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({ category, lang }) => {
  return (
    <Link
      href={localizedRoute(`/categories/${category.slug}`, lang as SupportedLanguages)}
      key={category.slug}
    >
      <FlatCard
        image={category.image}
        title={category.categoryName}
        body={renderRichText(category.description?.json)}
      />
    </Link>
  );
};
