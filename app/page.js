import Link from "next/link";
import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

import Hero from "@/components/Hero";
import CollectionCollage from "./components/CollectionCollage";
import CollectionSlider from "./components/CollectionSlider";
import TextWithImage from "./components/TextWithImage";
import Video from "./components/Video";

export const metadata = {
  title:
    "Gedenksieraden en herinneringssieraden voor jou persoonlijk gemaakt -- gedenk-sieraad.nl",
  description:
    "Exclusieve gedenksieraden om as, haarlokjes en vingerafdrukken van je dierbare in te verwerken en te personaliseren. De online juwelier van voordelige ashangers, memorials, unieke assieraden en See You gedenksieraden. Herinneringssieraden voor huisdieren. Herdenkingswinkel",
};

export default async function Home() {
  const collectionResponse = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: getCollectionsQuery,
    }),
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    method: "POST",
  });

  const collectionJson = await collectionResponse.json();

  if (collectionJson.errors) {
    console.error("GraphQL Errors:", collectionJson.errors);
  }
  return (
    <div className="">
      asdasfasdfsa
      {/* <Hero />
      <CollectionCollage collections={collectionJson.data} />
      <CollectionSlider collectionHandle="luxury-hand-made" />
      <TextWithImage />
      <CollectionSlider collectionHandle="exquisite-hand-made" />
      <Video /> */}
      {/* <CollectionSlider collectionHandle="elegant-hand-made" /> */}
    </div>
  );
}

const getCollectionsQuery = `
  query Collections {
    collection1: collection(handle: "sieraden-met-vingerprint") {
      ...collectionFields
    }
    collection2: collection(handle: "assieraden") {
      ...collectionFields
    }
    collection3: collection(handle: "dieren") {
      ...collectionFields
    }
  }

  fragment collectionFields on Collection {
    title
    handle
    descriptionHtml
    products(first: 15) {
      nodes {
        title
      }
    }
    image {
      height
      altText
      width
      url
    }
  }
`;
