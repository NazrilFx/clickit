"use client";

import { useEffect, useState } from "react";

export default function KirimLokasi() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          setLatitude(latitude);
          setLongitude(longitude);
        },
        (err) => {
          console.error("Gagal mendapatkan lokasi:", err.message);
        }
      );
    } else {
      console.warn("Geolocation tidak didukung di browser ini.");
    }
  }, []);

  return (
    <>
      <p>Latitude : {latitude}</p>
      <p>Longtitude : {longitude}</p>
    </>
  );
}
