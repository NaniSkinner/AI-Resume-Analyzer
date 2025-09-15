import React, { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { useParams, Link, useNavigate } from "react-router";
import { resumes } from "~/constants";

export function meta() {
  return [
    { title: "MatchaResume | Review Resume" },
    {
      name: "description",
      content: "Review your resume with AI-powered analysis",
    },
  ];
}

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback });
    };

    fetchResume();
  }, [id, kv]);

  const resume = resumes.find((resume) => resume.id === id);
  return (
    <main className="pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="back" className="w-2.5 h-2.5" />
          <span className="text-lavender-500 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 flex items-center justify-center p-6">
          {imageUrl && resumeUrl && feedback && (
            <div className="animate-in fade-in duration-1000 w-full max-w-2xl">
              <div className="gradient-border">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={imageUrl}
                      className="w-full h-auto object-contain rounded-xl border border-gray-200"
                      title="Click to open full PDF"
                      alt="Resume preview"
                    />
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
