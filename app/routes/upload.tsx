import React from "react";
import Narvbar from "../components/Narvbar";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "../components/fileUploader";
import { usePuterStore } from "../lib/puter";
import { convertPdfToImage } from "~/lib/pdf2img";
import { prepareInstructions, AIResponseFormat } from "../constants";

// Simple UUID generator function
const generateUUID = () => {
  return "xxxx-xxxx-4xxx-yxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function meta() {
  return [
    { title: "MatchaResume - Upload" },
    {
      name: "description",
      content: "Upload your resume for AI-powered analysis",
    },
  ];
}

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [uploaderKey, setUploaderKey] = useState(0);

  const handleAnalyze = async (
    companyName: string,
    jobTitle: string,
    jobDescription: string,
    resume: File
  ) => {
    setIsProcessing(true);
    setStatusText("Uploading resume...");
    const uploadedFile = await fs.upload([resume]);
    // TODO: Add rest of analysis logic
  };

  const startNewAnalysis = () => {
    setIsProcessing(false);
    setStatusText("");
    setAnalysisComplete(false);
    setFile(null);
    setUploaderKey((prev) => prev + 1); // Force FileUploader to reset
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    const form = e.currentTarget;
    if (form) {
      const formData = new FormData(form);
      const companyName = formData.get("company-name") as string;
      const jobTitle = formData.get("job-title") as string;
      const jobDescription = formData.get("job-description") as string;
      const resume = formData.get("resume") as File;

      // Get the file from the FileUploader component state
      console.log(
        "📋 Form submission - current file state:",
        file?.name || "null"
      );
      if (!file) {
        setStatusText("Please upload a resume file first");
        return;
      }

      try {
        setIsProcessing(true);
        setStatusText("Uploading resume...");
        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile)
          return setStatusText("Error: Failed to upload resume");

        setStatusText("Converting resume to image...");
        const imageFile = await convertPdfToImage(file);
        console.log("PDF conversion result:", imageFile);

        if (!imageFile.file) {
          const errorMsg = imageFile.error || "Failed to convert PDF to image";
          console.error("PDF conversion failed:", errorMsg);
          setStatusText(`Error: ${errorMsg}`);
          setIsProcessing(false);
          return;
        }

        setStatusText("Uploading the image...");
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage)
          return setStatusText("Error: Failed to upload image");

        setStatusText("Preparing data for analysis...");
        const uuid = generateUUID();
        const data = {
          id: uuid,
          resumePath: uploadedFile.path,
          imagePath: uploadedImage.path,
          companyName: companyName,
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          feedback: {}, // Initialize as empty object
        };
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText("Analyzing resume...");
        const feedback = await ai.feedback(
          uploadedImage.path,
          prepareInstructions({
            jobTitle: jobTitle,
            jobDescription: jobDescription,
            AIResponseFormat: AIResponseFormat,
          })
        );

        console.log("AI feedback response:", feedback);

        if (!feedback) {
          console.error("AI analysis failed: No response received");
          setStatusText(
            "Error: Failed to analyze resume - AI service unavailable"
          );
          setIsProcessing(false);
          return;
        }

        // Extract feedback text from AI response
        let feedbackText = "";
        if (feedback.message && feedback.message.content) {
          feedbackText =
            typeof feedback.message.content === "string"
              ? feedback.message.content
              : feedback.message.content[0]?.text || "";
        } else {
          console.error("Invalid AI response format:", feedback);
          setStatusText("Error: Invalid AI response format");
          setIsProcessing(false);
          return;
        }

        try {
          data.feedback = JSON.parse(feedbackText);
          await kv.set(`resume:${uuid}`, JSON.stringify(data));
        } catch (parseError) {
          console.error("Failed to parse AI response:", parseError);
          setStatusText("Error: Invalid AI response format");
          setIsProcessing(false);
          return;
        }

        setStatusText("Analysis complete! Your resume has been analyzed.");
        setAnalysisComplete(true);
        console.log("Analysis result:", data);

        // Keep the success state visible - don't auto-reset
        // Users can manually start a new analysis if needed
      } catch (error) {
        console.error("Analysis error:", error);
        setStatusText("Error occurred during analysis");
        setIsProcessing(false);
      }
    }
  };

  return (
    <main className=" bg-[url('/images/bg-main.svg')] bg-cover">
      <Narvbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : analysisComplete ? (
            <>
              <h2 className="text-green-600">✅ {statusText}</h2>
              <button
                onClick={startNewAnalysis}
                className="primary-button mt-4"
              >
                Analyze Another Resume
              </button>
            </>
          ) : (
            <h2>Upload your resume to get ATS score and improvemnt tips</h2>
          )}
          {!isProcessing && !analysisComplete && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  id="company-name"
                  name="company-name"
                  placeholder="Company Name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  id="job-title"
                  name="job-title"
                  placeholder="Job Title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={4}
                  id="job-description"
                  name="job-description"
                  placeholder="Job Description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader key={uploaderKey} onFileSelect={setFile} />
              </div>

              <button type="submit" className="primary-button">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
