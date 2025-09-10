import type { Route } from "./+types/home";
import Narvbar from "../components/Narvbar";
import { resumes } from "../constants";
import ResumeCard from "../components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MatchaResume" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Home() {
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
