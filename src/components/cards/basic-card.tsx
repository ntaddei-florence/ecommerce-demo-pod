import Image from "next/image";
import { FC, ReactNode } from "react";

export interface BasicCardProps {
  image?: string | null;
  title: ReactNode | string;
  body?: ReactNode | string;
  actions?: ReactNode;
}

export const BasicCard: FC<BasicCardProps> = ({ image, title, body, actions }) => {
  return (
    <div className="card w-128 border border-gray-200 rounded-xl">
      {image && (
        <Image src={image} className="aspect-square object-cover" alt="" width={512} height={512} />
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {body}
        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
    </div>
  );
};
