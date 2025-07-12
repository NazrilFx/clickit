"use client";

import { FiChevronDown, FiBarChart2 } from "react-icons/fi";
import { AiTwotoneDollar } from "react-icons/ai";
import { PiLinkSimpleDuotone, PiWalletDuotone } from "react-icons/pi";
import { TbArrowBarToDown } from "react-icons/tb";
import Link from "next/link";

export default function AffiliateSidebar() {
  return (
    <>
      <aside className="bg-softgray w-60 flex flex-col h-[100vw]">
        <div>
          <div className="flex items-center gap-2 px-5 py-4 cursor-pointer select-none">
            <img
              alt="User avatar"
              className="rounded-full"
              height="24"
              src="https://storage.googleapis.com/a1aa/image/aacf814a-0a64-4b6e-af84-f7d250e78729.jpg"
              width="24"
            />
            <span className="text-sm text-[#1a1a1a]">nazrildev</span>
            <FiChevronDown className="" />
          </div>
          <nav className="text-sm text-[#1a1a1a]">
            <ul className="pl-2 pr-5">
              {/* Earn */}
              <p className="p-2 opacity-50 text-[12px]">Start Earn</p>
              <li className="group hover:bg-gray-200 rounded-md flex items-center gap-2 cursor-pointer select-none mb-1">
                <Link
                  href={"/affiliate"}
                  className="flex items-center gap-2 w-full px-4 py-2"
                >
                  <div className="w-1 h-0 bg-blue-400 rounded-2xl absolute group-hover:h-8 transition-all -translate-x-4"></div>
                  <PiLinkSimpleDuotone className="text-xl group-hover:ml-2 transition-all" />
                  <span>Your Link</span>
                </Link>
              </li>
              <li className="group hover:bg-gray-200 rounded-md flex items-center gap-2 cursor-pointer select-none mb-1">
                <Link
                  href={"/affiliate/link-to-share"}
                  className="flex items-center gap-2 w-full px-4 py-2"
                >
                  <div className="w-1 h-0 bg-blue-400 rounded-2xl absolute group-hover:h-8 transition-all -translate-x-4"></div>
                  <AiTwotoneDollar className="text-xl group-hover:ml-2 transition-all" />
                  <span>Get Link To Share</span>
                </Link>
              </li>
              <li className="group hover:bg-gray-200 rounded-md flex items-center gap-2 cursor-pointer select-none mb-6">
                <Link
                  href={"/affiliate/insights"}
                  className="flex items-center gap-2 w-full px-4 py-2"
                >
                  <div className="w-1 h-0 bg-blue-400 rounded-2xl absolute group-hover:h-8 transition-all -translate-x-4"></div>
                  <FiBarChart2 className="text-xl group-hover:ml-2 transition-all" />
                  <span>Insights</span>
                </Link>
              </li>

              {/* Payment */}
              <p className="p-2 opacity-50 text-[12px]">Payment</p>
              <li className="group hover:bg-gray-200 rounded-md flex items-center gap-2 cursor-pointer select-none mb-1">
                <Link
                  href={"/affiliate/widthdrawal"}
                  className="flex items-center gap-2 w-full px-4 py-2"
                >
                  <div className="w-1 h-0 bg-blue-400 rounded-2xl absolute group-hover:h-8 transition-all -translate-x-4"></div>
                  <TbArrowBarToDown className="text-xl group-hover:ml-2 transition-all" />
                  <span>Request Withdrawal</span>
                </Link>
              </li>
              <li className="group hover:bg-gray-200 rounded-md flex items-center cursor-pointer select-none mb-1">
                <Link
                  href={"/affiliate/balance"}
                  className="flex items-center gap-2 w-full px-4 py-2"
                >
                  <div className="w-1 h-0 bg-blue-400 rounded-2xl absolute group-hover:h-8 transition-all -translate-x-4"></div>
                  <PiWalletDuotone className="text-xl group-hover:ml-2 transition-all" />
                  <span>Your Balance</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
