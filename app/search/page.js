import { Suspense } from "react";

import Search from "@/components/Search";

export const metadata = {
  title: "Zoek producten in onze webshop",
  description: "Generated by create next app",
};

export default async function SearchPage() {
  return (
    <div className="">
      <Suspense>
        <Search />
      </Suspense>
    </div>
  );
}
