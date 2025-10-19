import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Logo from "./Logo";
import ThreeBackground from "./3d/ThreeBackground";
import FloatingElements from "./3d/FloatingElements";

const BRAND_GOLD = "hsl(43, 74%, 52%)";
const BRAND_LIGHT = "hsl(41, 73%, 77%)";
const BRAND_DARK = "hsl(216, 47%, 8%)";

const DetailsScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  // 🔁 If UID missing, redirect to login
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!age.trim() || isNaN(Number(age)) || Number(age) < 1) {
      setError("Please enter a valid age.");
      return;
    }
    if (!gender) {
      setError("Please select a gender.");
      return;
    }

    const uid = localStorage.getItem("uid");
    if (!uid) {
      setError("User UID not found. Please login again.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${name} ${surname}`.trim(),
          gender,
          age,
          email: email.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to update user");
      }

      console.log("✅ User details updated.");
      navigate("/"); // ✅ Final redirection to home
    } catch (err) {
      console.error(err);
      setError("Failed to submit details. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[hsl(216,47%,8%)] to-indigo-900">
      <ThreeBackground />
      <FloatingElements />

      <div className="flex flex-col items-center mb-4 z-10">
        <Logo size="lg" className="mb-2" />
        <div className="text-4xl font-display font-extrabold" style={{ color: BRAND_GOLD }}>
          SSCS
        </div>
        <div className="text-base font-bold -mt-1 mb-2" style={{ color: BRAND_LIGHT }}>
          Shri Shrree Asttro Consultancy
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center w-full">
        <div className="rounded-2xl p-[2px] bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-500 shadow-2xl shadow-yellow-900/30">
          <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl py-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-2xl font-bold tracking-tight" style={{ color: BRAND_DARK }}>
                Enter Your Details
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="font-medium" style={{ color: BRAND_DARK }}>
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={loading}
                    style={{ borderColor: BRAND_GOLD }}
                  />
                </div>

                {/* Surname */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="surname" className="font-medium" style={{ color: BRAND_DARK }}>
                    Surname <span className="text-xs text-gray-400">(optional)</span>
                  </label>
                  <Input
                    id="surname"
                    type="text"
                    placeholder="Enter your surname"
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                    disabled={loading}
                    style={{ borderColor: BRAND_GOLD }}
                  />
                </div>

                {/* Age */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="age" className="font-medium" style={{ color: BRAND_DARK }}>
                    Age <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={e => setAge(e.target.value.replace(/[^\d]/g, ""))}
                    disabled={loading}
                    style={{ borderColor: BRAND_GOLD }}
                    min={1}
                  />
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="gender" className="font-medium" style={{ color: BRAND_DARK }}>
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    disabled={loading}
                    className="text-sm rounded-md border px-3 py-2"
                    style={{ borderColor: BRAND_GOLD }}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-medium" style={{ color: BRAND_DARK }}>
                    Email Address <span className="text-xs text-gray-400">(optional)</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                    style={{ borderColor: BRAND_GOLD }}
                  />
                  <p className="text-xs text-gray-500">
                    We'll send you a welcome email and important updates
                  </p>
                </div>

                {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                <Button type="submit" disabled={loading} style={{ background: BRAND_GOLD, color: BRAND_DARK }}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-2 pb-6">
              <div className="text-xs" style={{ color: BRAND_DARK }}>
                Your details are safe with us.
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailsScreen;
