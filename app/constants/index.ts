export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Gauntlet AI",
    jobTitle: "Senior AI Engineer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 98,
      ATS: {
        score: 100,
        tips: [],
      },
      toneAndStyle: {
        score: 97,
        tips: [],
      },
      content: {
        score: 99,
        tips: [],
      },
      structure: {
        score: 98,
        tips: [],
      },
      skills: {
        score: 100,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "4",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_04.png",
    resumePath: "/resumes/resume-4.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "5",
    companyName: "Netflix",
    jobTitle: "Full Stack Developer",
    imagePath: "/images/resume_05.png",
    resumePath: "/resumes/resume-5.pdf",
    feedback: {
      overallScore: 92,
      ATS: {
        score: 95,
        tips: [],
      },
      toneAndStyle: {
        score: 88,
        tips: [],
      },
      content: {
        score: 94,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 96,
        tips: [],
      },
    },
  },
  {
    id: "6",
    companyName: "Tesla",
    jobTitle: "Data Engineer",
    imagePath: "/images/resume_06.png",
    resumePath: "/resumes/resume-6.pdf",
    feedback: {
      overallScore: 67,
      ATS: {
        score: 72,
        tips: [],
      },
      toneAndStyle: {
        score: 65,
        tips: [],
      },
      content: {
        score: 70,
        tips: [],
      },
      structure: {
        score: 68,
        tips: [],
      },
      skills: {
        score: 60,
        tips: [],
      },
    },
  },
  {
    id: "7",
    companyName: "Amazon",
    jobTitle: "UX Designer",
    imagePath: "/images/resume_07.png",
    resumePath: "/resumes/resume-7.pdf",
    feedback: {
      overallScore: 81,
      ATS: {
        score: 78,
        tips: [],
      },
      toneAndStyle: {
        score: 85,
        tips: [],
      },
      content: {
        score: 83,
        tips: [],
      },
      structure: {
        score: 82,
        tips: [],
      },
      skills: {
        score: 77,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
            interface Feedback {
            overallScore: number; //max 100
            ATS: {
              score: number; //rate based on ATS suitability
              tips: {
                type: "good" | "improve";
                tip: string; //give 3-4 tips
              }[];
            };
            toneAndStyle: {
              score: number; //max 100
              tips: {
                type: "good" | "improve";
                tip: string; //make it a short "title" for the actual explanation
                explanation: string; //explain in detail here
              }[]; //give 3-4 tips
            };
            content: {
              score: number; //max 100
              tips: {
                type: "good" | "improve";
                tip: string; //make it a short "title" for the actual explanation
                explanation: string; //explain in detail here
              }[]; //give 3-4 tips
            };
            structure: {
              score: number; //max 100
              tips: {
                type: "good" | "improve";
                tip: string; //make it a short "title" for the actual explanation
                explanation: string; //explain in detail here
              }[]; //give 3-4 tips
            };
            skills: {
              score: number; //max 100
              tips: {
                type: "good" | "improve";
                tip: string; //make it a short "title" for the actual explanation
                explanation: string; //explain in detail here
              }[]; //give 3-4 tips
            };
          }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
}: {
  jobTitle: string;
  jobDescription: string;
  AIResponseFormat: string;
}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
        Please analyze and rate this resume and suggest how to improve it.
        The rating can be low if the resume is bad.
        Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
        If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
        If available, use the job description for the job user is applying to to give more detailed feedback.
        If provided, take the job description into consideration.
        The job title is: ${jobTitle}
        The job description is: ${jobDescription}
        Provide the feedback using the following format: ${AIResponseFormat}
        Return the analysis as a JSON object, without any other text and without the backticks.
        Do not include any other text or comments.`;
