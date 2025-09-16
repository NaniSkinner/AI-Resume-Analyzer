import React, { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { useParams, Link, useNavigate } from "react-router";
import { resumes } from "~/constants";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Footer from "~/components/Footer";

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
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/resume/" + id);
    }
  }, [isLoading, auth.isAuthenticated, navigate, id]);

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
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-row gap-6 max-lg:flex-col-reverse max-lg:gap-4">
          <section className="feedback-section border border-gray-200/60 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg p-6 max-lg:max-w-none">
            <h2 className="text-lg !text-black font-bold mb-4">
              Resume Review
            </h2>
            {feedback ? (
              <div className="flex flex-col gap-4 animate-in fade-in duration-1000">
                <div className="text-sm space-y-3">
                  <Summary feedback={feedback} />
                  <ATS
                    score={feedback.ATS.score || 0}
                    suggestions={feedback.ATS.tips || []}
                  />
                  <Details feedback={feedback} />
                </div>
              </div>
            ) : null}
          </section>
          <section className="flex-1 max-w-lg max-lg:max-w-none">
            {imageUrl && resumeUrl && feedback && (
              <div className="animate-in fade-in duration-1000 sticky top-6 max-lg:static">
                <div className="border border-gray-200/60 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg p-4">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={imageUrl}
                      className="w-full h-auto object-contain rounded-xl border border-gray-200 max-h-[600px]"
                      title="Click to open full PDF"
                      alt="Resume preview"
                    />
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Resume;
