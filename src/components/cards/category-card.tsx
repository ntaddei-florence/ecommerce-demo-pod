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
            "absolute w-full transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
            "flex justify-center items-center z-10",
            "transition-all group-hover:scale-150"
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
        </div>

        <div className="absolute bottom-0 left-0 z-10 w-full">
          <main
            className={clsx(
              "scale-y-0 group-hover:scale-y-100 transition-all origin-bottom",
              "z-10 p-8 w-full text-2xl text-center font-light blurred leading-normal"
            )}
          >
            {getLocalizedFieldValue(category.values.description, lang)?.data}
          </main>
        </div>
        <div
          className={clsx(
            "absolute top-0 right-0 bottom-0 left-0",
            "bg-gray-900 bg-opacity-50" // makes the text more readable
          )}
        />
      </div>
    </Link>
  );
};
