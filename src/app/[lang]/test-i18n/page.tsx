import { getTranslations } from "~/i18n";

export interface TestI18NPageProps {
  params: {
    lang: string;
  };
}

export const dynamic = "force-dynamic";

export default async function TestI18NPage({ params: { lang } }: TestI18NPageProps) {
  const t = getTranslations(lang);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <p>
        Language is {lang}: {t("common.test")}
      </p>
    </div>
  );
}
