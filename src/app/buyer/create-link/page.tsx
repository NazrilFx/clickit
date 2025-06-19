"use client";
import { useState, useEffect } from "react";
import FormInput from "@/components/FormInput";
import CountryDialCodePicker from "@/components/CountryNumberPicker";

export default function AffiliatePage() {
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: {
      linkName: string;
      number: string;
      message: string;
      description: string;
    } = {
      linkName: name,
      number: number,
      message: message,
      description: description,
    };

    try {
      const response = await fetch("/api/link/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Hasil:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section aria-label="Grow your audience" className="mb-8">
        <h1 className="mr-auto text-blue-900 rounded-2xl border-1 border-blue-500 bg-blue-50 w-60 flex justify-center font-bold text-2xl py-3 my-3">
          Create Your Link
        </h1>
        <form className="space-y-5">
          <FormInput
            type="text"
            name="linkName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Link Name"
          />
          <CountryDialCodePicker onChange={(e) => setNumber(e.target.value)} />
          <FormInput
            name="number"
            value={number}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, ""); // filter hanya angka
              setNumber(onlyNumbers);
            }}
            type="number"
            placeholder="Whatsapp Number (ex: 6285792962289)"
          />
          <FormInput
            type="text"
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Message (ex: Hi, I want to buy this product)"
          />
          <FormInput
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            textarea
            type="text"
            placeholder="description (briefing for affiliator)"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Kirim Pesan
          </button>
        </form>
      </section>
    </>
  );
}
