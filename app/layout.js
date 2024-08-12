import { Montserrat } from "next/font/google";
import "./globals.css";
// import {Seo} from `@shopify/hydrogen`;

import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

import CookieBanner from "@/components/CookieBanner";

import MainLayoutInnerWrapper from "@/components/MainLayoutInnerWrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  // const shopDataResponse = await fetch(getStorefrontApiUrl(), {
  //   method: "POST",
  //   headers: getPrivateTokenHeaders({ buyerIp: "..." }),
  //   body: JSON.stringify({
  //     query: GRAPHQL_SHOP_DATA_QUERY,
  //   }),
  // });
  // const shopDataJson = await shopDataResponse.json();
  // console.log("shopDataJson");
  // console.log(shopDataJson);
  return (
    <html lang="nl">
      <head></head>
      <GoogleAnalytics />
      <body className={`${montserrat.className}`}>
        {/* <div className="fixed bottom-4 rounded-lg left-4  w-[95%] text-white p-4 h-20 z-[9999] bg-red-600">
          Er wordt momenteel aan de website gewerkt, het kan zijn dat sommige
          functionaliteiten momenteel niet werken. (Bedankt voor uw geduld!)
        </div> */}
        <CookieBanner />

        {/* <MainLayoutInnerWrapper shopData={shopDataJson.data}> */}
        <MainLayoutInnerWrapper shopData={null}>
          {children}
        </MainLayoutInnerWrapper>
      </body>
    </html>
  );
}

const GRAPHQL_SHOP_DATA_QUERY = `
  query ShopDataQuery {
    menu(handle: "main-menu") {
      title
    }
  }
`;

// const GRAPHQL_SHOP_DATA_QUERY = `
//   query ShopDataQuery {
//     menu(handle: "main-menu") {
//       title
//       items {
//         items {
//           id
//           url
//           title
//         }
//         id
//         url
//         title
//       }
//       id
//       handle
//     }
//   }
// `;
