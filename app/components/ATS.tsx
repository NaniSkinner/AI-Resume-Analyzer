import React from "react";

interface ATSProps {
  score: number;
  suggestions: {
    type: "good" | "improve";
    tip: string;
  }[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  // Add some debugging and safety checks
  console.log("ATS component received:", { score, suggestions });

  // Determine background color based on score
  const getBackgroundClass = () => {
    if (score > 70) return "bg-green-50";
    if (score > 49) return "bg-yellow-50";
    return "bg-red-50";
  };

  // Get status message based on score
  const getStatusMessage = () => {
    if (score > 70) return "Great Job!";
    if (score > 49) return "Good Progress!";
    return "Needs Work!";
  };

  return (
    <div className={`rounded-2xl shadow-md w-full p-6 ${getBackgroundClass()}`}>
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">✓</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800">
          ATS Score - {score || 0}/100
        </h3>
      </div>

      {/* Status Message */}
      <h4 className="text-base font-semibold text-gray-700 mb-3">
        {getStatusMessage()}
      </h4>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">
        This score represents how well your resume is likely to perform in
        Applicant Tracking Systems used by employers.
      </p>

      {/* Suggestions List */}
      <div className="space-y-2 mb-4">
        {suggestions && suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1">
                {suggestion.type === "good" ? (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">⚠</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-700 flex-1">{suggestion.tip}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No ATS suggestions available</p>
        )}
      </div>

      {/* Closing Message */}
      <p className="text-sm text-gray-600 italic">
        Keep refining your resume to improve your chances of getting past ATS
        filters and into the hands of recruiters.
      </p>
    </div>
  );
};

export default ATS;
