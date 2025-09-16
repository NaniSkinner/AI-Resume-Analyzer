import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "../lib/puter";
import Footer from "../components/Footer";

export function meta() {
  return [
    { title: "MatchaResume - Auth" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Auth() {
  const store = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();
  const next = location.search.split("next=")[1];

  const handleSignIn = async () => {
    console.log("Sign in button clicked");
    try {
      await store.auth.signIn();
      console.log("Sign in completed, auth state:", store.auth.isAuthenticated);
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  useEffect(() => {
    if (store.auth.isAuthenticated) {
      navigate(next || "/");
    }
  }, [store.auth.isAuthenticated, next, navigate]);

  useEffect(() => {
    console.log("Auth component mounted");
    console.log("Puter available:", !!window.puter);
  }, []);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full">
          {/* Centered Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-lg">
              <h1 className="text-4xl font-bold text-gray-800 mb-3">
                Welcome to <span className="text-matcha-600">MATCHA</span>RESUME
              </h1>
              <h2 className="text-lg text-gray-600 mb-6">
                Log in to your account
              </h2>

              {/* Lavender Login Button */}
              <div className="flex justify-center">
                {store.isLoading ? (
                  <button className="lavender-auth-button animate-pulse cursor-not-allowed">
                    <span>Signing in...</span>
                  </button>
                ) : (
                  <>
                    {store.auth.isAuthenticated ? (
                      <button
                        className="lavender-auth-button"
                        onClick={store.auth.signOut}
                      >
                        <span>Log Out</span>
                      </button>
                    ) : (
                      <button
                        className="lavender-auth-button"
                        onClick={handleSignIn}
                      >
                        <span>Log In</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Information Boxes */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Box 1: Simple 3 Steps */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-matcha-400 to-matcha-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Simple 3 Steps
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Upload your resume, get instant AI analysis, and receive
                personalized tips to land your dream job.
              </p>
            </div>

            {/* Box 2: Easy & Free using Puter */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-lavender-500 to-lavender-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Easy & Free using Puter
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Completely free to use! Sign up to{" "}
                <span className="font-semibold text-lavender-600">Puter</span>{" "}
                or sign in if you already have an account.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer at Bottom */}
      <Footer />
    </main>
  );
}
