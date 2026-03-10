import React from "react";

const ResultAnalysis = ({ result }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold mb-2">Result Analysis</h1>
        <p className="text-slate-400">
          Exam ID: <span className="text-cyan-400">{result.examId}</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
        {[
          { label: "Total", value: result.total },
          { label: "Correct", value: result.correct, color: "green" },
          { label: "Incorrect", value: result.incorrect, color: "red" },
          { label: "Accuracy", value: `${result.accuracy}%`, color: "cyan" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[#030712] border border-white/10 rounded-xl p-6
            shadow-lg hover:scale-105 transition"
          >
            <p className="text-slate-400 text-sm">{item.label}</p>
            <h2
              className={`text-3xl font-bold text-${item.color || "white"}-400`}
            >
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Mistake Analysis */}
      <div className="max-w-6xl mx-auto bg-[#030712] border border-white/10 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-semibold mb-6">Mistake Breakdown</h2>

        <div className="space-y-4">
          <div>
            <p className="text-slate-400 mb-1">Knowledge Gaps</p>
            <div className="w-full h-3 bg-white/10 rounded-full">
              <div
                className="h-3 bg-red-500 rounded-full"
                style={{ width: `${result.knowledgeGap}%` }}
              />
            </div>
          </div>

          <div>
            <p className="text-slate-400 mb-1">Trap / Confusion</p>
            <div className="w-full h-3 bg-white/10 rounded-full">
              <div
                className="h-3 bg-yellow-400 rounded-full"
                style={{ width: `${result.trap}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Question Review</h2>

        {result.questions.map((q, index) => (
          <div
            key={index}
            className="bg-[#030712] border border-white/10 rounded-xl p-6"
          >
            <p className="font-semibold mb-3">
              Q{index + 1}. {q.question}
            </p>

            <p
              className={`mb-1 ${
                q.isCorrect ? "text-green-400" : "text-red-400"
              }`}
            >
              Your Answer: {q.userAnswer || "Not Answered"}
            </p>

            {!q.isCorrect && (
              <p className="text-cyan-400">Correct Answer: {q.correctAnswer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultAnalysis;
