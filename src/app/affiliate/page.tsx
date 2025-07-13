"use client";
import { useEffect, useState } from "react";
import { ILinkWithId } from "@/models/Link";
import getCurrentAffiliator from "@/utils/fetchCurrentAffiliator";
import Image from "next/image";

interface IFormattedLink extends ILinkWithId {
  linkName: string;
  description: string;
}

export default function AffiliatePage() {
  const [links, setLinks] = useState<IFormattedLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [affiliatorUid, setAffiliatorUid] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/link/taken-by-user", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch links");
        }

        const json = await res.json();
        setLinks(json.links || []);
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentAffiliator().then((affiliator) =>
      setAffiliatorUid(affiliator?.uid)
    );

    fetchLinks();
  }, []);

  return (
    <>
      <section aria-label="Grow your audience" className="mb-8">
        <h1 className="mr-auto font-bold text-2xl pt-3 pb-5">Your Link</h1>
        <h3 className="font-bold text-xl mb-1">Grow your audience</h3>
        <p className="text-[#4a4a4a] mb-6 max-w-xl">
          Give subscribers exclusive sign-up benefits to grow your list faster.
        </p>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {loading ? (
            <p>Loading...</p>
          ) : links.length > 0 ? (
            links.map((link) => (
              <div key={link.linkUid} className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold">{link.linkName}</h4>
                <p>{link.description}</p>
                <p>
                  Share this link :{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    className="text-blue-400"
                    onClick={() =>
                      navigator.clipboard
                        .writeText(
                          `${process.env.NEXT_PUBLIC_API_URL}/r/${link.linkUid}?a=${affiliatorUid}`
                        )
                        .then(() => alert("Link copied!"))
                        .catch(() => alert("Gagal menyalin"))
                    }
                  >
                    {`${process.env.NEXT_PUBLIC_API_URL}/r/${link.linkUid}?a=${affiliatorUid}`}
                  </span>
                </p>
                <a
                  href={`/affiliate/${link.linkUid}`}
                  className="text-blue-500 hover:underline"
                >
                  View Link
                </a>
                  {link.image?.map((img) => (
                    <p>Hello</p>
                    // <Image key={img} src={img} alt={"Photo"}/>
                  ))}
              </div>
            ))
          ) : (
            <p>No links available.</p>
          )}
        </div>
      </section>
    </>
  );
}
