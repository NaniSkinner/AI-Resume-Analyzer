import ScoreGage from "./ScoreGage";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
      <div className="flex flex-col items-center space-y-1">
        <p className="text-xs font-semibold text-gray-800 text-center">
          {title}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold">
            <span className={textColor}>{score}</span>/100
          </p>
          <ScoreBadge score={score} />
        </div>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  // Add some debugging
  console.log("Summary component received feedback:", feedback);

  const score = feedback?.overallScore ?? 0;

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-lg shadow-sm w-full border border-gray-100">
        <div className="p-4">
          <ScoreGage score={score} />
          <div className="flex flex-row items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <h2 className="text-sm !text-black font-bold">
                Your Resume Score
              </h2>
              <ScoreBadge score={score} />
            </div>
            <p className="text-xs text-gray-600">Based on variables below.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Category
          title="Tone and Style"
          score={feedback?.toneAndStyle?.score ?? 0}
        />
        <Category title="Content" score={feedback?.content?.score ?? 0} />
        <Category title="Structure" score={feedback?.structure?.score ?? 0} />
        <Category title="Skills" score={feedback?.skills?.score ?? 0} />
      </div>
    </div>
  );
};

export default Summary;
