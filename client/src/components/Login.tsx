import React, { useState, useEffect } from "react";
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { auth, RecaptchaVerifier } from "../firebase";
import { signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import Logo from "./Logo";
import ThreeBackground from "./3d/ThreeBackground";
import FloatingElements from "./3d/FloatingElements";
import { useLocation } from "wouter";

const BRAND_GOLD = "hsl(43, 74%, 52%)";
const BRAND_LIGHT = "hsl(41, 73%, 77%)";
const BRAND_DARK = "hsl(216, 47%, 8%)";

const Login: React.FC = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {
            console.log("✅ reCAPTCHA verified");
          },
          'expired-callback': () => {
            console.log("❌ reCAPTCHA expired");
            window.recaptchaVerifier = undefined;
          }
        });
        console.log("✅ reCAPTCHA verifier initialized");
      } catch (error) {
        console.error("❌ Failed to initialize reCAPTCHA:", error);
      }
    }
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");

    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const fullPhone = `+91${phone}`;
      console.log("Attempting to send OTP to:", fullPhone);
      console.log("RecaptchaVerifier:", window.recaptchaVerifier);
      
      const result = await signInWithPhoneNumber(auth, fullPhone, window.recaptchaVerifier);
      setConfirmationResult(result);
      setStep("otp");
      console.log("✅ OTP sent successfully");
    } catch (err: any) {
      console.error("❌ OTP sending failed:", err);
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);
      
      // More specific error messages
      if (err.code === 'auth/invalid-phone-number') {
        setError("Invalid phone number format.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many requests. Please try again later.");
      } else if (err.code === 'auth/captcha-check-failed') {
        setError("reCAPTCHA verification failed. Please refresh and try again.");
      } else if (err.code === 'auth/project-not-found') {
        setError("Firebase project not found. Please check configuration.");
      } else {
        setError(`Failed to send OTP: ${err.message || 'Unknown error'}`);
      }
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);
    setStatusMessage("Verifying OTP and checking your account...");
    try {
      const res = await confirmationResult?.confirm(otp);
      if (res?.user) {
        const uid = res.user.uid;
        const phone = res.user.phoneNumber || "";
        
        // Save UID
        localStorage.setItem("uid", uid);

        // Send to backend
        
        const response = await fetch("http://localhost:5500/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid, phone, email: email.trim() || undefined }),
        });

        const result = await response.json();

        if (response.ok) {
          if (result.message === "User exists") {
            setStatusMessage("Welcome back! Redirecting to home page...");
            setTimeout(() => navigate("/"), 1000); // Redirect existing users to home page
          } else if (result.message === "User created") {
            setStatusMessage("Account created! Redirecting to complete your profile...");
            setTimeout(() => navigate("/details"), 1000); // Redirect new users to details form
          } else {
            // Fallback for any other successful response
            setStatusMessage("Login successful! Redirecting...");
            setTimeout(() => navigate("/details"), 1000);
          }
        } else {
          setError(result?.message || "Login succeeded, but user not saved.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
      setStatusMessage("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[hsl(216,47%,8%)] to-indigo-900">
      <ThreeBackground />
      <FloatingElements />
      <div className="flex flex-col items-center mb-4 z-10">
        <Logo size="lg" className="mb-2" />
        <div className="text-4xl font-display font-extrabold" style={{ color: BRAND_GOLD }}>SSCS</div>
        <div className="text-base font-bold -mt-1 mb-2" style={{ color: BRAND_LIGHT }}>Shri Shrree Asttro Consultancy</div>
      </div>

      <div className="relative z-10 flex items-center justify-center w-full">
        <div className="rounded-2xl p-[2px] bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-500 shadow-2xl shadow-yellow-900/30">
          <Card className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-2xl font-bold tracking-tight" style={{ color: BRAND_DARK }}>
                {step === "phone" ? "Sign in to your account" : "Enter OTP"}
              </CardTitle>
            </CardHeader>

            <CardContent>
              {step === "phone" ? (
                <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-medium" style={{ color: BRAND_DARK }}>
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))}
                      maxLength={10}
                      disabled={loading}
                      className="text-lg placeholder:text-xs"
                      autoComplete="tel"
                      style={{ borderColor: BRAND_GOLD }}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium" style={{ color: BRAND_DARK }}>
                      Email Address <span className="text-sm text-gray-500">(Optional)</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="text-lg placeholder:text-xs"
                      autoComplete="email"
                      style={{ borderColor: BRAND_GOLD }}
                    />
                    <p className="text-xs text-gray-500">
                      We'll send you a welcome email and important updates
                    </p>
                  </div>
                  
                  <div id="recaptcha-container" />
                  {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                  <Button type="submit" className="w-full font-bold" style={{ background: BRAND_GOLD, color: BRAND_DARK }} disabled={loading}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2 items-center">
                    <label htmlFor="otp" className="font-medium" style={{ color: BRAND_DARK }}>
                      Enter OTP
                    </label>
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      containerClassName="justify-center"
                      className="text-lg tracking-widest"
                      disabled={loading}
                      autoFocus
                    >
                      <InputOTPGroup>
                        {[...Array(6)].map((_, i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    <div className="text-xs mt-2" style={{ color: BRAND_LIGHT }}>(OTP sent via SMS)</div>
                  </div>
                  {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                  {statusMessage && <div className="text-green-600 text-sm text-center font-medium">{statusMessage}</div>}
                  <Button type="submit" className="w-full font-bold" style={{ background: BRAND_GOLD, color: BRAND_DARK }} disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full hover:underline"
                    style={{ color: BRAND_GOLD }}
                    onClick={() => {
                      setStep("phone");
                      setOtp("");
                      setError("");
                      setStatusMessage("");
                    }}
                    disabled={loading}
                  >
                    Change phone number
                  </Button>
                </form>
              )}
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-2 pb-6">
              <div className="text-xs" style={{ color: BRAND_DARK }}>
                Your phone number is safe with us.
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
