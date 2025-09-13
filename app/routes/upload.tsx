import React from "react";
import Narvbar from "../components/Narvbar";
import { useState } from "react";
import type { FormEvent } from "react";
import FileUploader from "../components/fileUploader";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    // Add your form submission logic here
    const form = e.currentTarget.closest("form");
    if (form) {
      const formData = new FormData(form);
      const companyName = formData.get("company-name");
      const jobTitle = formData.get("job-title");
      const jobDescription = formData.get("job-description");
      const resume = formData.get("resume");
      console.log(companyName, jobTitle, jobDescription, resume);
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
          ) : (
            <h2>Upload your resume to get ATS score and improvemnt tips</h2>
          )}
          {!isProcessing && (
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
                <FileUploader />
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
