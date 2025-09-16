import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect } from "react";
import { usePuterStore } from "../lib/puter";
import { useState } from "react";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { id, companyName, jobTitle, feedback, imagePath } = resume;
  const { fs } = usePuterStore();
  const [resumeURL, setResumeURL] = useState<string | null>(null);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        // Use the imagePath from the resume prop instead of literal string
        const blob = await fs.read(imagePath);
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setResumeURL(url);
      } catch (error) {
        console.error("Error loading resume image:", error);
      }
    };
    loadResumes();
  }, [fs, imagePath]);

  return (
    <Link to={`/resume/${id}`} className="resume-card">
      <div className="resume-card-header">
        <div className="flex-1">
          {companyName && (
            <h3 className="font-semibold text-neutral-800 mb-1 break-words">
              {companyName}
            </h3>
          )}
          {jobTitle && (
            <p className="text-sm text-matcha-600 break-words font-medium">
              {jobTitle}
            </p>
          )}
          {!companyName && !jobTitle && (
            <h3 className="font-semibold text-neutral-800 break-words">
              Resume Analysis
            </h3>
          )}
        </div>
        <div className="flex-shrink-0 ml-4">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      <div className="resume-card-content">
        {resumeURL && (
          <div className="relative overflow-hidden rounded-lg border border-matcha-100">
            <img
              src={resumeURL || imagePath}
              alt="Resume preview"
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-matcha-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-matcha-400 rounded-full"></div>
            <span className="text-xs font-medium text-matcha-600">
              AI Analyzed
            </span>
          </div>
          <svg
            className="w-4 h-4 text-matcha-400 group-hover:text-matcha-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
