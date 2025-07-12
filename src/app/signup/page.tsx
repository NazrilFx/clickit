"use client";
import FormInput from "@/components/FormInput";
import { useState, useEffect } from "react";
import Link from "next/link";
import CountryDialCodePicker from "@/components/CountryNumberPicker";
import getCsrfToken from "@/utils/fetcherCsrfToken";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    getCsrfToken()
      .then((token) => setCsrfToken(token || ""))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone: number,
          csrfToken, // Include CSRF token in the request
        }),
      });
      const json = await res.json();
      if (res.ok) {
        alert("Signup successful! please login to continue");
        // Redirect to login or home page
        setName("");
        setNumber("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert(json.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[450px] border-1 mt-10 border-gray-200 m-auto p-5 rounded-lg shadow-xl">
      <h1 className="mb-2">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col *:m-3">
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <CountryDialCodePicker onChange={(e) => setNumber(e.target.value)} />
        <FormInput
          type="number"
          name="number"
          value={number}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, ""); // filter hanya angka
            setNumber(onlyNumbers);
          }}
          placeholder="Whatsapp Number (ex: 6285792962289)"
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
        <button
          className="cursor-pointer bg-blue-600 py-3 text-white border-1 border-blue-700 rounded-xl"
          disabled={loading}
          type="submit"
        >
          {loading ? "Sign in..." : "Signup"}
        </button>
        <p>
          Have an account?{" "}
          <Link href={"/login"} className="text-blue-500">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
