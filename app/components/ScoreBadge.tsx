import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const getBadgeStyles = () => {
    if (score > 70) {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-700",
        label: "Matcha Perfect",
      };
    } else if (score > 49) {
      return {
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
        label: "Good Start",
      };
    } else {
      return {
        bgColor: "bg-red-100",
        textColor: "text-red-700",
        label: "Needs Work",
      };
    }
  };

  const { bgColor, textColor, label } = getBadgeStyles();

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}
    >
      <p>{label}</p>
    </div>
  );
};

export default ScoreBadge;
