export interface TestI18NPageProps {
  params: {
    lang: string;
  };
}

export default async function TestI18NPage({ params: { lang } }: TestI18NPageProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <p>Language is {lang}</p>
    </div>
  );
}
