"use client";

import clsx from "clsx";
import Image from "next/image";
import { FC, useState } from "react";

import { ProductMediaDataFragment } from "~/graphql/generated/graphql";

export interface MediaCarouselProps {
  media: ProductMediaDataFragment;
}

export const MediaCarousel: FC<MediaCarouselProps> = ({ media }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  return (
    <>
      <div className="w-full">
        {media.mediaCollection?.items.map((mediaItem, i) =>
          mediaItem?.url ? (
            <Image
              key={mediaItem.url}
              src={mediaItem.url}
              alt={mediaItem.title ?? ""}
              className={clsx("!relative w-24 h-24", {
                hidden: i !== selectedImageIndex,
              })}
              style={{ objectFit: "contain" }}
              fill
            />
          ) : null
        )}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {media.mediaCollection?.items.map((mediaItem, i) =>
          mediaItem?.url ? (
            <Image
              alt={mediaItem.title ?? ""}
              src={mediaItem.url}
              key={mediaItem.url}
              width={64}
              height={64}
              className={clsx("rounded-lg", {
                "border-2 border-accent": i === selectedImageIndex,
              })}
              style={{ objectFit: "cover" }}
              onClick={() => setSelectedImageIndex(i)}
            />
          ) : null
        )}
      </div>
    </>
  );
};
