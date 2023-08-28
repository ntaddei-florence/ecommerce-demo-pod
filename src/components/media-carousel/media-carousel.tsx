"use client";

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
            <div
              key={mediaItem.url}
              className={`w-full ${i === selectedImageIndex ? "" : "hidden"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaItem.url} alt={mediaItem.title ?? ""} className="w-full" />
            </div>
          ) : null
        )}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {media.mediaCollection?.items.map((mediaItem, i) =>
          mediaItem?.url ? (
            <button
              key={mediaItem?.url}
              className="btn btn-xs"
              onClick={() => setSelectedImageIndex(i)}
            >
              {i}
            </button>
          ) : null
        )}
      </div>
    </>
  );
};
