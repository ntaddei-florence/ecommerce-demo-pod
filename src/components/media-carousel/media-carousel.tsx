"use client";

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
            <div key={mediaItem.url} className={i === selectedImageIndex ? undefined : "hidden"}>
              <Image
                src={mediaItem.url}
                alt={mediaItem.title ?? ""}
                className="!relative max-h-64"
                objectFit="contain"
                fill
              />
            </div>
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
              className={`${i === selectedImageIndex ? "border border-2 border-primary" : ""}`}
              style={{
                objectFit: "cover",
              }}
              onClick={() => setSelectedImageIndex(i)}
            />
          ) : null
        )}
      </div>
    </>
  );
};
