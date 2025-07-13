"use client";
import { useEffect, useState } from "react";
import { ILinkWithId } from "@/models/Link";
import getCsrfToken from "@/utils/fetcherCsrfToken";
import { IAffiliator } from "@/models/Affiliator";
import getCurrentAffiliator from "@/utils/fetchCurrentAffiliator";
import Image from "next/image";

export default function LinkToShareCards() {
  const [links, setLinks] = useState<ILinkWithId[]>([]);
  const [csrfToken, setCsrfToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentAffiliator, setCurrentAffiliator] = useState<IAffiliator | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch("/api/link", {
        method: "GET",
      });

      if (!res.ok) {
        console.error("Failed to fetch links");
        return;
      }
      const json = await res.json();
      setLinks(json.links || []);
    };

    getCsrfToken()
      .then((token) => setCsrfToken(token || ""))
      .finally(() => setLoading(false));

    getCurrentAffiliator().then((affiliator) => setCurrentAffiliator(affiliator));

    fetchLinks();
  }, []);

  const handleTakeLink = (linkUid: string) => async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      // Contoh: fetch ke API atau copy ke clipboard
      const res = await fetch("/api/link/taken-by-user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          affiliator_id: currentAffiliator?._id,
          linkUid,
          csrfToken,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to take link");
      }

      alert(data.message || "Link taken successfully!");
    } catch (error) {
      console.error("Gagal:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid grid-rows-* grid-cols-2 justify-center gap-4">
      {links.map((link, index) => (
        <div
          key={index}
          className="flex flex-col w-full max-w-[600px] md:flex-row items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <div className="relative w-[180px] h-full min-h-[100px]">
            <Image
              src={
                Array.isArray(link.image) &&
                  typeof link.image[0] === "string" &&
                  link.image[0].trim() !== ""
                  ? link.image[0]
                  : "/home.jpg"
              }
              alt="home"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-normal h-full bg-blue-50 flex-1 p-2 pl-4">
            <h1 className="text-xl mb-2 truncate">{link.name}</h1>
            <p className="text-sm opacity-70 ml-2">{link.description}</p>
            <div className="flex flex-col justify-end mt-auto w-full *:px-2.5 *:py-2 *:rounded-xl gap-1.5 *:cursor-pointer">
              <small className="text-sm mr-auto">
                Total Clicks Remaining : {link.totalClicks}
              </small>
              <button
                onClick={handleTakeLink(link.linkUid)}
                className="bg-blue-500 text-white"
              >
                Take this link
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
