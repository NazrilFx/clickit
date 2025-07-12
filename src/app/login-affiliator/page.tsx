"use client";
import FormInput from "@/components/FormInput";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import isLogin from "@/utils/isLogin";

export default function LoginAffiliatorPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const res = await fetch("/api/csrf");
        const json = await res.json();
        setCsrfToken(json.csrfToken);
        return json.csrfToken;
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchCsrfToken().then(() => {
      setLoading(false); // Set loading to false after fetching CSRF token
    });

    const checkLogin = async () => {
      const isLoginCheck = await isLogin(); // misal import dari utils
      if (isLoginCheck) {
        alert("You are already logged in!");
        router.push("/buyer"); // Redirect to buyer page if already logged in
      }
    };
    checkLogin();
  }, []); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth-affiliator/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          csrfToken, // Include CSRF token in the request
        }),
      });
      const json = await res.json();
      if (res.ok) {
        alert("Login successful!");
        // Redirect to login or home page
        router.push("/affiliate");
      } else {
        alert(json.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during Login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[350px] border-1 mt-10 border-gray-200 m-auto p-5 rounded-lg shadow-xl">
      <h1 className="mb-2">Login as <span className="text-blue-600">Affiliator</span></h1>
      <form onSubmit={handleSubmit} className="flex flex-col *:m-3">
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
        <button
          className="cursor-pointer bg-blue-600 py-3 text-white border-1 border-blue-700 rounded-xl"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>
          Dont have account?{" "}
          <Link href={"/signup-affiliator"} className="text-blue-500">
            click here
          </Link>
        </p>
      </form>
    </div>
  );
}
