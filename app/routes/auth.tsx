import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "../lib/puter";

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
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-[#F5F3F0]/90 backdrop-blur-sm rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log in to your account</h2>
          </div>
          <div className="flex flex-col gap-4">
            {store.isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing in...</p>
              </button>
            ) : (
              <>
                {store.auth.isAuthenticated ? (
                  <button className="auth-button" onClick={store.auth.signOut}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={handleSignIn}>
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
