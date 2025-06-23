"use client";
import { useEffect, useState } from "react";
import { ILinkWithId } from "@/models/Link";
import { FiTrash2, FiEdit2, FiMoreVertical } from "react-icons/fi";
import Link from "next/link";

export default function LinksCard() {
  const [links, setLinks] = useState<ILinkWithId[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("/api/link/yours");
        if (!response.ok) {
          throw new Error("Failed to fetch links");
        }
        const json = await response.json();
        setLinks(json.links || []);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="grid grid-rows-* grid-cols-2 justify-center gap-4">
      {links.map((link, index) => (
        <div
          key={index}
          className="flex flex-col w-full max-w-[600px] md:flex-row items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
        >

            <div>
              <img className="w-[180px] h-[150px] object-cover" src="/home.jpg" alt="home" />
            </div>
            <div className="flex flex-col justify-normal h-full bg-blue-50 flex-1 p-2 pl-4">
              <h1 className="text-xl mb-2 truncate">{link.name}</h1>
              <p className="text-sm opacity-70 ml-2">{link.description}</p>
              <div className="flex justify-end mt-auto w-full *:px-2.5 *:py-1 *:rounded-xl gap-1.5 *:cursor-pointer">
                <small className="text-sm mr-auto">Total Clicks : {link.totalClicks}</small>
                <Link href={`/buyer/${link.linkUid}`} className="bg-teal-500 text-teal-300"><FiMoreVertical/></Link> 
                <button className="bg-blue-500 text-blue-300"><FiEdit2/></button>
                <button className="bg-red-500 text-red-300"><FiTrash2/></button>
              </div>
            </div>
        </div>
      ))}
      
    </div>
  );
}
