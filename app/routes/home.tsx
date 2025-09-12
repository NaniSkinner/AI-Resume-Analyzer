import type { Route } from "./+types/home";
import Narvbar from "../components/Narvbar";
import { resumes } from "../constants";
import ResumeCard from "../components/ResumeCard";
import { usePuterStore } from "../lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MatchaResume" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  // Temporarily disabled to prevent infinite loops
  // useEffect(() => {
  //   if (!auth.isAuthenticated) {
  //     navigate("/auth?next=/");
  //   }
  // }, [auth.isAuthenticated, navigate]);

  return (
    <main className=" bg-[url('/images/bg-main.svg')] bg-cover">
      <Narvbar />
      <section className="main-section">
        <div className="page-heading py-15">
          <h1>Let AI match your resume to your dream job</h1>
          <h2>Job matching that thinks like a recruiter.</h2>
        </div>
      </section>

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </main>
  );
}
