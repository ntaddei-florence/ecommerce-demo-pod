// import { redirect } from "next/navigation";

// import { localizedRoute } from "~/i18n";

export interface ProductDetailProps {
  params: {
    slug: string;
    lang: string;
  };
}

export default async function ProductDetailPage({ params: {} }: ProductDetailProps) {
  // const variant = null;
  // const product = null;
  // redirect(localizedRoute(`/products/${product?.slug}/${variant?.sku}`, lang));
}
