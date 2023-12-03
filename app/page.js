import Link from "next/link";

export const metadata = {
  title: "Home page",
  description: "Generated by create next app",
};

export default async function Home() {
  return (
    <>
      <div className="text-center text-3xl my-20">Home page</div>
      {/* <Hero /> */}
      <Link href={`/products/testproduct`}>Testproduct</Link>
    </>
  );
}
