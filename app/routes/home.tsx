import type { Route } from "./+types/home";
import Narvbar from "../components/Narvbar";
import { resumes } from "../constants";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Home() {
  return (
    <main className=" bg-[url('/images/bg-main.svg')] bg-cover">
      <Narvbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Track your resume with Resumind</h1>
          <h2> Get smart feedback for your resume</h2>
        </div>
      </section>

      {resumes.map((resume) => (
        <div key={resume.id}>
          <h1> {resume.jobTitle} </h1>
        </div>
      ))}
    </main>
  );
}
