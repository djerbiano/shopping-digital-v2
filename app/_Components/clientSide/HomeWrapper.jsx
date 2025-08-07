"use client";

import Loading from "@/app/loading";
import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("./HomeClient"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function HomeWrapper({ products }) {
  return <HomeClient products={products} />;
}
