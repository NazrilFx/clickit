'use client';
import LinksCard from "@/components/LinksCard";

export default function AffiliatePage() {

  return (
    <>
      <section aria-label="Grow your audience" className="mb-8">
        <h1 className="mr-auto text-blue-900 rounded-2xl border-1 border-blue-500 bg-blue-50 w-40 flex justify-center font-bold text-2xl py-3 my-3">Your Links</h1>
        <LinksCard/>
      </section>
    </>
  );
}
