import Image from "next/image";
import LandingPageNav from "@/components/LandingPageNav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";
export default async function HomePage() {
  async function checkAffiliatorLogin() {
    try {
      const cookieStore = cookies();

      const affiliatorRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/auth-affiliator/me`,
        {
          credentials: "include",
          headers: {
            Cookie: cookieStore.toString(), // Include cookies in the request
          },
        }
      );

      if (affiliatorRes.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Affiliator login check error:", error);
    }
  }
  // Check if user is logged in
  async function checkUserLogin() {
    try {
      const cookieStore = cookies();

      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/auth/me`,
        {
          credentials: "include",
          headers: {
            Cookie: cookieStore.toString(), // Include cookies in the request
          },
        }
      );

      if (userRes.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login check error:", error);
    }
  }

  const check = await checkUserLogin();
  const affiliatorCheck = await checkAffiliatorLogin();
  
  if (check) {
    redirect("buyer");
  } else if (affiliatorCheck) {
    redirect("/affiliate");
  } else {
    return (
      <>
        <LandingPageNav />
        <main className="min-h-screen px-4 py-12 md:px-24 bg-white text-gray-900">
          {/* Hero Section */}
          <section className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Get Free Ad Impressions, Pay Only When Someone{" "}
              <span className="relative before:content-[''] before:absolute  before:w-5 before:h-5 before:bg-blue-600 bg-transparent before:skew-x-12 text-black px-2">
                Clicks
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Iklan Anda akan tampil di depan ribuan orang secara gratis. Hanya
              bayar saat mereka tertarik dan mengklik. Efisien, hemat, dan
              transparan.
            </p>
            <div className="mt-8">
              <a
                href="/signup"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
              >
                Launch Your Campaign
              </a>
            </div>
          </section>

          {/* Image Banner */}
          <section className="max-w-4xl mx-auto mb-20">
            <Image
              src="/images/hero-banner.jpg"
              alt="People clicking ads on phone and laptop"
              width={1200}
              height={600}
              className="rounded-lg shadow-md"
            />
          </section>

          {/* Feature Section */}
          <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
            <div>
              <Image
                src="/icons/impressions.svg"
                alt="Free impressions"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-xl mb-2">100% Free Impressions</h3>
              <p className="text-gray-600 text-sm">
                Iklan Anda akan tampil di halaman relevan tanpa biaya awal. Anda
                hanya bayar saat ada klik.
              </p>
            </div>

            <div>
              <Image
                src="/icons/secure.svg"
                alt="Secure and transparent"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-xl mb-2">Transparan & Aman</h3>
              <p className="text-gray-600 text-sm">
                Semua interaksi user terekam. Anda bisa lihat laporan klik dan
                konversi real-time.
              </p>
            </div>

            <div>
              <Image
                src="/icons/money.svg"
                alt="Pay per click"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-xl mb-2">
                Hanya Bayar Saat Diklik
              </h3>
              <p className="text-gray-600 text-sm">
                Tidak ada biaya tersembunyi. Anda hanya membayar ketika iklan
                Anda benar-benar diklik.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center mt-24 mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Siap Menjangkau Lebih Banyak Pelanggan?
            </h2>
            <p className="text-gray-600 mb-6">
              Daftar sekarang dan mulai kampanye iklan pertama Anda secara
              gratis!
            </p>
            <a
              href="/register"
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
            >
              Mulai Sekarang
            </a>
          </section>
        </main>
      </>
    );
  }
}
