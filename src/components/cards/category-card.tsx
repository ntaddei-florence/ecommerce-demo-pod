import { FC } from "react";

import { BasicCard } from ".";
import { CategoryDataFragment } from "~/graphql/generated/graphql";

export interface CategoryCardProps {
  category: CategoryDataFragment;
}

export const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <BasicCard
      image={category.image}
      title={category.categoryName}
      body={category.description?.json}
      actions={
        <>
          <div className="btn btn-sm btn-outline">Vedi tutto</div>
        </>
      }
    />
  );
};
