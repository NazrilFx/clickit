"use client"
import { useParams } from "next/navigation"

export default function OwnerLinkDetail() {
  const params = useParams();
  const uid = params.uid; // hasilnya string | undefined

  return (
    <div>Ini adalah halaman detail {uid}</div>
  );
}
