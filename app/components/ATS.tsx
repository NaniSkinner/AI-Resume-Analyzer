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
    <div
      className={`rounded-lg shadow-sm w-full p-4 border border-gray-100 ${getBackgroundClass()}`}
    >
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
        <h3 className="text-sm font-bold text-gray-800">
          ATS Score - {score || 0}/100
        </h3>
      </div>

      {/* Status Message */}
      <h4 className="text-sm font-semibold text-gray-700 mb-2">
        {getStatusMessage()}
      </h4>

      {/* Description */}
      <p className="text-xs text-gray-600 mb-3">
        How well your resume performs in ATS systems.
      </p>

      {/* Suggestions List */}
      <div className="space-y-2 mb-3">
        {suggestions && suggestions.length > 0 ? (
          suggestions.slice(0, 3).map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="mt-0.5">
                {suggestion.type === "good" ? (
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                ) : (
                  <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">⚠</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-700 flex-1 leading-relaxed">
                {suggestion.tip}
              </p>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500">No suggestions available</p>
        )}
      </div>

      {/* Closing Message */}
      <p className="text-xs text-gray-600 italic">
        Keep improving to get past ATS filters.
      </p>
    </div>
  );
};

export default ATS;
