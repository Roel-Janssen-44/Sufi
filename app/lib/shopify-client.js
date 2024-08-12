import { createStorefrontClient } from "@shopify/hydrogen-react";

const client = createStorefrontClient({
  privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN,
  storeDomain: `https://${process.env.PUBLIC_STORE_DOMAIN}`,
  storefrontApiVersion: "2023-10",
  // storefrontApiVersion: "2024-07",
});
export const getStorefrontApiUrl = client.getStorefrontApiUrl;
export const getPrivateTokenHeaders = client.getPrivateTokenHeaders;
