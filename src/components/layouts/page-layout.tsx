import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";

export interface PageLayoutProps extends PropsWithChildren {
  fullWidth?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({ fullWidth, children }) => {
  return (
    <div
      className={clsx("w-full", {
        "container px-4 pt-8 mx-auto": !fullWidth,
      })}
    >
      {children}
    </div>
  );
};
