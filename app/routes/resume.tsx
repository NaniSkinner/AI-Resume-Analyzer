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
  const [scrollY, setScrollY] = useState(0);
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

  // Parallax scroll animation for resume preview
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resume = resumes.find((resume) => resume.id === id);
  return (
    <main
      className="pt-0 relative"
      style={{
        backgroundImage: `url('/images/bg-main-2.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
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
              <div
                className="animate-in fade-in duration-1000 max-lg:static"
                style={{
                  position: "sticky",
                  top: "20px",
                  transform: `translateY(${scrollY * 2.1}px)`,
                }}
              >
                <div className="border border-gray-200/60 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden resume-preview">
                  <div className="px-3 py-2 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xs font-medium text-gray-700">
                      Resume Preview
                    </h3>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-matcha-600 hover:text-matcha-700 transition-colors"
                    >
                      Open Full PDF →
                    </a>
                  </div>
                  <div className="relative group h-[600px] overflow-auto p-4">
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer block w-full h-full"
                    >
                      <img
                        src={imageUrl}
                        className="w-auto h-auto max-w-full max-h-full object-contain transition-all duration-300 hover:scale-[1.01] mx-auto"
                        title="Click to open full PDF"
                        alt="Resume preview"
                        style={{
                          borderRadius: "0",
                          display: "block",
                        }}
                      />
                    </a>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/3 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
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
