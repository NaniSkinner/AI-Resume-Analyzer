import type { Route } from "./+types/home";
import Narvbar from "../components/Narvbar";
import ResumeCard from "../components/ResumeCard";
import { usePuterStore } from "../lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MatchaResume" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Home() {
  const { auth, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        setLoading(true);

        const resumeList =
          ((await kv.list("resume:*", true)) as KVItem[]) || [];

        const parsedResumes = resumeList?.map(
          (resume) => JSON.parse(resume.value) as Resume
        );

        console.log(parsedResumes);
        setResumes(parsedResumes || []);
      } catch (error) {
        console.error("Error loading resumes:", error);
        setResumes([]);
      } finally {
        setLoading(false);
      }
    };

    loadResumes();
  }, [kv]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Narvbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loading && resumes?.length === 0 ? (
            <h2>No Resume found. Upload your resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
        {loading && (
          <div className="flex flex-col items-center justify-center">
            <img
              src="/images/resume-scan-2.gif"
              className="w-[200px]"
              alt="Loading animation"
            />
          </div>
        )}
      </section>

      {!loading && resumes.length > 0 && (
        <div className="resumes-section pb-8">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loading && resumes?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link
            to="/upload"
            className="primary-button w-fit text-xl font-semibold"
          >
            Upload Resume
          </Link>
        </div>
      )}
    </main>
  );
}
