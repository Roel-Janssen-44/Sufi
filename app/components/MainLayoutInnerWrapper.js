"use client";

import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, createContext, useContext } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c79385",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#fff",
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        ol: {
          justifyContent: "center",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

import Navbar from "./Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const CartContext = createContext();

export const useCartDrawer = () => {
  return useContext(CartContext);
};

export default function RootLayout({ shopData, children }) {
  const [cartDrawerIsOpen, setCartDrawerIsOpen] = useState(false);

  return (
    <>
      <ShopifyProvider
        storeDomain={`https://${process.env.NEXT_PUBLIC_STORE_DOMAIN}`}
        storefrontToken={process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN}
        storefrontApiVersion="2023-10"
        countryIsoCode="NL"
        languageIsoCode="NL"
      >
        <CartProvider
          onLineAdd={() => {
            console.log("a line is being added");
            // gtag("event", "add_to_cart", {
            //   currency: "USD",
            //   value: 30.03,
            //   items: [
            //     {
            //       item_id: "SKU_12345",
            //       item_name: "Stan and Friends Tee",
            //       affiliation: "Google Merchandise Store",
            //       coupon: "SUMMER_FUN",
            //       discount: 2.22,
            //       index: 0,
            //       item_brand: "Google",
            //       item_category: "Apparel",
            //       item_category2: "Adult",
            //       item_category3: "Shirts",
            //       item_category4: "Crew",
            //       item_category5: "Short sleeve",
            //       item_list_id: "related_products",
            //       item_list_name: "Related Products",
            //       item_variant: "green",
            //       location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
            //       price: 10.01,
            //       quantity: 3,
            //     },
            //   ],
            // });
          }}
          // onLineAdd={() => {

          // onLineAdd={() => {
          //   console.log("a line is being added");
          // setCartDrawerIsOpen(true)
          // }}
          // onLineAddComplete={() => {
          // }}
        >
          <CartContext.Provider value={setCartDrawerIsOpen}>
            <ThemeProvider theme={theme}>
              {/* <Navbar
                cartDrawerIsOpen={cartDrawerIsOpen}
                setCartDrawerIsOpen={setCartDrawerIsOpen}
                menu={shopData.menu}
              /> */}
              {/* <Breadcrumb /> */}
              {children}
            </ThemeProvider>
          </CartContext.Provider>
        </CartProvider>
      </ShopifyProvider>
      {/* <Footer /> */}
    </>
  );
}
