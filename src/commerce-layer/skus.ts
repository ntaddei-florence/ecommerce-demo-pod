import { CommerceLayerClient, SkuCreate, SkuUpdate } from "@commercelayer/sdk";

export async function upsertSku(client: CommerceLayerClient, params: SkuCreate | SkuUpdate) {
  const skuId =
    "id" in params
      ? params.id
      : (
          await client.skus.list({
            filters: { code_eq: params.code },
          })
        ).first()?.id;

  if (skuId) {
    return await client.skus.update({ ...params, id: skuId });
  } else {
    return await client.skus.create(params as SkuCreate);
  }
}
