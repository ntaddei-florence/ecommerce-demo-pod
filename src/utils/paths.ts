export const getLinkToVariant = (
  variant: { slug?: string | null; sku?: string | null },
  product: { slug?: string | null }
) => {
  return `/products/${product.slug}/${variant.sku}`;
};
