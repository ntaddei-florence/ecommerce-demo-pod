"use client";

import Image from "next/image";
import Link from "next/link";

import { getLocalizedFieldValue } from "~/akeneo/utils";
import { CategoryIndexData } from "~/algolia/types";
import { useClientI18n } from "~/i18n";

export function CategorySearchItem({ objectID, values, image, slug }: CategoryIndexData) {
  const { lang, localizedRoute } = useClientI18n();

  return (
    <div
      className="p-4 border border-light rounded-lg shadow flex flex-col sm:flex-row gap-4 items-center"
      key={objectID}
    >
      <div>
        {/* TODO missing image placeholder */}
        {image && (
          <Image
            src={image}
            loader={({ src }) => src} // TODO: remove me
            width={400}
            height={300}
            objectFit="cover"
            alt=""
          />
        )}
      </div>
      <div className="flex flex-col gap-4 justify-between h-full">
        <div>
          <Link
            href={localizedRoute(`/categories/${slug}`)}
            className="text-xl font-semibold pb-1 link link-primary"
          >
            {getLocalizedFieldValue(values.name, lang)?.data}
          </Link>
          <h4 className="mt-4">{getLocalizedFieldValue(values.description, lang)?.data}</h4>
        </div>
      </div>
    </div>
  );
}
