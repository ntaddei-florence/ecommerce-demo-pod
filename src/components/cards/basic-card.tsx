import Image from "next/image";
import { FC, ReactNode } from "react";

import { AssetDataFragment } from "~/graphql/generated/graphql";

export interface BasicCardProps {
  image?: AssetDataFragment | null;
  title: ReactNode | string;
  body?: ReactNode | string;
  actions?: ReactNode;
}

export const BasicCard: FC<BasicCardProps> = ({ image, title, body, actions }) => {
  return (
    <div className="card min-w-32 border border-gray-200 rounded-xl">
      {image?.url && (
        <figure>
          <Image
            src={image?.url}
            alt={image.title ?? ""}
            width={image.width ?? 128}
            height={image.height ?? 128}
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {body}
        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
    </div>
  );
};
