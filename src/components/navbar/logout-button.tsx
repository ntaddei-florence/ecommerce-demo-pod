"use client";

import { useParams } from "next/navigation";
import { FC } from "react";

import { useOnClientLogout } from "~/hooks/use-on-client-logout";
import { getTranslations } from "~/i18n";

export const LogoutButton: FC = () => {
  const params = useParams();
  const lang = params.lang as string;
  const t = getTranslations(lang);

  const onLogout = useOnClientLogout();
  return <button onClick={onLogout}>{t("common.logout")}</button>;
};
