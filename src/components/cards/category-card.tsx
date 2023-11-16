import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

import { getLocalizedFieldValue } from "~/akeneo/utils";
import { CategoryIndexData } from "~/algolia/types";
import { localizedRoute } from "~/i18n";

export interface CategoryCardProps {
  category: CategoryIndexData;
  lang: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({ category, lang }) => {
  return (
    <Link href={localizedRoute(`/categories/${category.slug}`, lang)}>
      <div className="overflow-hidden group relative h-[50vh] w-full flex items-end justify-start text-left">
        <div
          className="absolute w-full h-full top-0 left-0 bg-cover bg-center group-hover:scale-125 transition duration-500 cursor-pointer"
          style={{ backgroundImage: `url(${category.image})` }}
        />
        <div
          className={clsx(
            "absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2",
            "flex flex-col justify-between items-center z-10"
          )}
        >
          <h3
            className={clsx(
              "bg-secondary text-white text-sm uppercase px-5 py-2",
              "hover:bg-neutral-100 hover:text-accent text-xl",
              "transition ease-in-out duration-500"
            )}
          >
            {getLocalizedFieldValue(category.values.name, lang)?.data}
          </h3>
          <main className={clsx("z-10 text-neutral-100 p-5 text-xl text-center")}>
            {getLocalizedFieldValue(category.values.description, lang)?.data}
          </main>
        </div>
        <div
          className={clsx(
            "absolute top-0 right-0 bottom-0 left-0",
            "bg-gradient-to-b from-transparent to-gray-900"
          )}
        />
      </div>
    </Link>
  );
};
