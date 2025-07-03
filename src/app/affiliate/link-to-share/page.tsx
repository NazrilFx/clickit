"use client";
import LinkToShareCards from "@/components/LinkToShareCards";
import { AiTwotoneDollar } from "react-icons/ai";

export default function LinkToSharePage() {
  return (
    <section className="p-3">
      <h1 className="text-2xl mb-10 flex items-center"><AiTwotoneDollar className="mr-2"/> Get Link to Share and Get Commisiion</h1>
      <LinkToShareCards />
    </section>
  );
}
