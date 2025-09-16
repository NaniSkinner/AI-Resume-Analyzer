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
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col gap-2">
          {companyName && (
            <h2 className="!text-black font-bold break-words">{companyName}</h2>
          )}
          {jobTitle && (
            <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
          )}
          {!companyName && !jobTitle && (
            <h2 className="text-black font-bold break-words">Resume</h2>
          )}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      {resumeURL && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={resumeURL || imagePath}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover rounded-2xl"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
