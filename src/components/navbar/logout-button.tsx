"use client";

import { FC } from "react";

import { useOnClientLogout } from "~/hooks/use-on-client-logout";
import { useClientI18n } from "~/i18n/hooks";

export const LogoutButton: FC = () => {
  const { t } = useClientI18n();

  const onLogout = useOnClientLogout();
  return <button onClick={onLogout}>{t("common.logout")}</button>;
};
