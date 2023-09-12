export const getLinkToVariant = (
  variant: { slug?: string | null; sku?: string | null },
  product: { slug?: string | null }
) => {
  return variant.slug //
    ? `/products/${variant.slug}`
    : `/products/${product.slug}/${variant.sku}`;
};
