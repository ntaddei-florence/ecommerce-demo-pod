import { ProductDetail } from "~/app/products/product-detail";
import { getApolloClient } from "~/graphql/apollo-client";
import { ProductDetailDocument, ProductDetailQuery } from "~/graphql/generated/graphql";

export interface ProductDetailProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params: { slug } }: ProductDetailProps) {
  const apolloClient = getApolloClient();
  // const clClient = await getCommerceLayerClient();

  // const customers = await clClient.customers.list();
  // const customer = customers[0];

  // const cart = (
  //   await clClient.orders.list({
  //     filters: { status_eq: "draft" },
  //     include: ["line_items.item", "line_items.line_item_options.sku_option"],
  //   })
  // ).last();

  const {
    data: { productCollection, variantCollection },
  } = await apolloClient.query<ProductDetailQuery>({
    query: ProductDetailDocument,
    variables: { slug },
  });

  const variant = variantCollection?.items[0];
  const product = productCollection?.items[0];

  return (
    <div>
      {!variant ? (
        <h2>Product variant not found</h2>
      ) : !product ? (
        <h2>Product not found</h2>
      ) : (
        <ProductDetail product={product} variant={variant} />
      )}
    </div>
  );
}
