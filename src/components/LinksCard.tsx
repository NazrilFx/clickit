"use client";
import { useEffect, useState } from "react";
import { ILinkWithId } from "@/models/Link";
import { FiTrash2, FiEdit2, FiMoreVertical } from "react-icons/fi";
import Link from "next/link";
import FormInput from "@/components/FormInput";
import getCsrfToken from "@/utils/fetcherCsrfToken";
import { loadSnapScript } from "@/utils/loadSnapScript";
import Image from "next/image";

export default function LinksCard() {
  const [links, setLinks] = useState<ILinkWithId[]>([]);
  const [linksTakenByAffiliator, setLinksTakenByAffiliator] =
    useState<number>(0);
  const [showAddClicksModal, setShowAddClicksModal] = useState<boolean>(false);
  const [addClicksValue, setAddClicksValue] = useState<string>("");
  const [targetAddClick, setTargetAddClick] = useState<string>("");
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const priceClickRp = parseInt(process.env.PRICE_CLICK_RP || "500");

  useEffect(() => {
    loadSnapScript().catch((err) => console.error(err));

    const fetchLinks = async () => {
      try {
        const response = await fetch("/api/link/yours");
        if (!response.ok) {
          throw new Error("Failed to fetch links");
        }
        const json = await response.json();
        setLinks(json.links || []);
        setLinksTakenByAffiliator(json.linksTakenByAffiliator || 0);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    getCsrfToken()
      .then((token) => setCsrfToken(token || ""))
      .finally(() => setLoading(false));

    fetchLinks();
  }, []);

  const addClicks = () => async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const amount: number = parseInt(addClicksValue) * priceClickRp;
      const midtransResponse = await fetch("/api/midtrans/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
        }),
      });

      if (!midtransResponse.ok) {
        throw new Error("Failed to create Midtrans transaction");
      }

      const midtransData = await midtransResponse.json();
      if (!midtransData.token) {
        throw new Error("Midtrans token not received");
      }

      window.snap.pay(midtransData.token, {
        onSuccess: async (result) => {
          const response = await fetch("/api/link/add-clicks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: targetAddClick,
              clicks: addClicksValue,
              csrfToken,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to add clicks");
          }
          if (response.ok) {
            alert("Clicks added successfully!" + result);
            setShowAddClicksModal(false);
            setAddClicksValue("");
            setTargetAddClick("");
            window.location.reload();
          }
        },
        onPending: (result) => {
          alert("Transaction pending: " + result.token);
        },
        onError: (result) => {
          console.error("Terjadi error:", result);
        },
      });
    } catch (error) {
      console.error("Error adding clicks:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      {showAddClicksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay background */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Modal content */}
          <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-10">
            <h2 className="text-xl font-semibold mb-4">Add Clicks</h2>
            <FormInput
              value={addClicksValue}
              name="add-clicks"
              type="number"
              placeholder="Enter number of clicks"
              onChange={(e) => setAddClicksValue(e.target.value)}
            ></FormInput>
            <div className="mt-2 opacity-70">
              Price :{" "}
              {isNaN(parseInt(addClicksValue) * priceClickRp)
                ? 0
                : parseInt(addClicksValue) * priceClickRp}
            </div>

            <button
              onClick={addClicks()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded mr-4 cursor-pointer"
            >
              Submit
            </button>
            <button
              onClick={() => setShowAddClicksModal(false)}
              className="mt-4 px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
              <small className="text-sm mr-auto">
                Total Clicks : {link.totalClicks}
              </small>
              <small>Clicks Available : {link.clicksAvailable}</small>
              <small>
                Affiliator Used This Link : {linksTakenByAffiliator}
              </small>
              <button
                onClick={() => {
                  setShowAddClicksModal(true);
                  setTargetAddClick(link._id);
                }}
                className="px-2 py-1 bg-blue-500 w-[120px] rounded-md text-white mb-2 cursor-pointer"
              >
                Add Clicks
              </button>

              <div className="flex justify-center mt-auto w-full *:px-2.5 *:py-1 *:rounded-xl gap-1.5 *:cursor-pointer">
                <Link
                  href={`/buyer/${link.linkUid}`}
                  className="bg-teal-500 text-teal-300"
                >
                  <FiMoreVertical />
                </Link>
                <button className="bg-blue-500 text-blue-300">
                  <FiEdit2 />
                </button>
                <button className="bg-red-500 text-red-300">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
