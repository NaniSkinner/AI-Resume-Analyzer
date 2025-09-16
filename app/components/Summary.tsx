import ScoreGage from "./ScoreGage";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-600"
      : score > 49
        ? "text-yellow-400"
        : "text-red-600";

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <div className="flex flex-col items-center space-y-3">
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-bold">
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
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md w-full">
        <ScoreGage score={score} />
        <div className="flex flex-row items-center p-4 gap-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl !text-black font-bold">
              Your Resume Score
            </h2>
            <ScoreBadge score={score} />
          </div>
          <p className="text-sm text-gray">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
