"use client";

import { useEffect, useState } from "react";
import getCurrentAffiliator from "@/utils/fetchCurrentAffiliator";

export default function AffiliateBalancePage() {
    const [affiliatorBalance, setAffiliatorBalance] = useState<number | undefined>(undefined);

    useEffect(() => {
        getCurrentAffiliator().then((affiliator) => setAffiliatorBalance(affiliator?.balance_idr));
    }, []);
  return (
    <>
      <section aria-label="Affiliate Balance" className="mb-8">
        <h1 className="mr-auto font-bold text-2xl pt-3 pb-5">Affiliate Balance</h1>
        <p className="text-[#4a4a4a] mb-6 max-w-xl">
          Your current affiliate balance is displayed below.
        </p>
        {/* Placeholder for balance display */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Current Balance: Rp {affiliatorBalance}</h2>
        </div>
      </section>
    </>
  );
}