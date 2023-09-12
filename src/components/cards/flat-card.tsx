import { FC, ReactNode } from "react";

import { AssetDataFragment } from "~/graphql/generated/graphql";

export interface FlatCardProps {
  image?: AssetDataFragment | null;
  title: ReactNode | string;
  body?: ReactNode | string;
}

export const FlatCard: FC<FlatCardProps> = ({ image, title, body }) => {
  return (
    <div
      className="relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center"
      style={{ backgroundImage: `url(${image?.url})` }}
    >
      <div className="absolute bottom-6 z-10 right-0 right-0 mx-5 flex justify-between items-center">
        <h3 className="text-xs bg-secondary text-white px-5 py-2 uppercase hover:bg-neutral-100 hover:text-accent transition ease-in-out duration-500">
          {title}
        </h3>
      </div>
      <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900" />
      <main className="p-5 z-10 w-[75%] text-neutral-100">{body}</main>
    </div>
  );
};
