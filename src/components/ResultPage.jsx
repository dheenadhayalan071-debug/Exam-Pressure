import { useState } from "react";
import { useNavigate } from "react-router-dom";
const mockResult = {
  score: 72,
  total: 100,
  accuracy: 68,
  timeTaken: "42m 10s",
  status: "PASS",

  summary: {
    correct: 18,
    wrong: 12,
    skipped: 5,
  },

  topicStats: {
    JavaScript: 70,
    React: 50,
    HTML: 100,
    CSS: 90,
  },

  questions: [
    {
      id: 1,
      question: "What is closure in JavaScript?",
      userAnswer: "B",
      correctAnswer: "C",
      explanation:
        "A closure is a function that remembers variables from its lexical scope even when executed outside it.",
    },
    {
      id: 2,
      question: "Which hook is used for side effects?",
      userAnswer: "A",
      correctAnswer: "A",
      explanation: "useEffect is used for handling side effects in React.",
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      userAnswer: null,
      correctAnswer: "B",
      explanation: "CSS stands for Cascading Style Sheets.",
    },
  ],
};

const ResultPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("ALL");

  const getStatus = (q) => {
    if (q.userAnswer === null) return "SKIPPED";
    if (q.userAnswer === q.correctAnswer) return "CORRECT";
    return "WRONG";
  };

  const filteredQuestions = mockResult.questions.filter((q) => {
    if (filter === "ALL") return true;
    return getStatus(q) === filter;
  });
  /* ================= COMPONENTS ================= */

  const StatCard = ({ label, value, highlight }) => (
    <div
      className={`px-6 py-4 rounded-2xl bg-[#030712] border border-white/10 shadow-lg
    ${highlight === "green" && "text-green-400"}
    ${highlight === "red" && "text-red-400"}`}
    >
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  const BreakCard = ({ title, value, color }) => {
    const colorMap = {
      green: "text-green-400",
      red: "text-red-400",
      gray: "text-gray-400",
    };

    return (
      <div className="rounded-2xl p-6 bg-[#030712] border border-white/10 text-center shadow-lg">
        <p className="text-slate-400">{title}</p>
        <p className={`text-4xl font-bold ${colorMap[color]}`}>{value}</p>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    const map = {
      CORRECT: "bg-green-500/20 text-green-400",
      WRONG: "bg-red-500/20 text-red-400",
      SKIPPED: "bg-gray-500/20 text-gray-400",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}
      >
        {status}
      </span>
    );
  };

  const ActionBtn = ({ label }) => (
    <button
      className="px-6 py-3 rounded-full font-semibold bg-white/10 hover:bg-cyan-500
    hover:text-black transition-all hover:scale-105"
      onClick={() => {
        navigate("/main");
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ================= HERO ================= */}
        <section className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">Result Summary</h1>
          <p className="text-slate-400">
            This result reflects pressure handling, not just knowledge.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <StatCard
              label="Score"
              value={`${mockResult.score}/${mockResult.total}`}
            />
            <StatCard label="Accuracy" value={`${mockResult.accuracy}%`} />
            <StatCard label="Time Used" value={mockResult.timeTaken} />
            <StatCard
              label="Status"
              value={mockResult.status}
              highlight={mockResult.status === "PASS" ? "green" : "red"}
            />
          </div>
        </section>

        {/* ================= BREAKDOWN ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BreakCard
            title="Correct"
            value={mockResult.summary.correct}
            color="green"
          />
          <BreakCard
            title="Wrong"
            value={mockResult.summary.wrong}
            color="red"
          />
          <BreakCard
            title="Skipped"
            value={mockResult.summary.skipped}
            color="gray"
          />
        </section>

        {/* ================= TOPIC STATS ================= */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Topic Performance</h2>

          <div className="space-y-4">
            {Object.entries(mockResult.topicStats).map(([topic, value]) => (
              <div key={topic}>
                <div className="flex justify-between mb-1">
                  <span>{topic}</span>
                  <span className="text-slate-400">{value}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full">
                  <div
                    className="h-3 bg-cyan-500 rounded-full transition-all"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FILTER ================= */}
        <section>
          <div className="flex gap-3 mb-6">
            {["ALL", "CORRECT", "WRONG", "SKIPPED"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition
                  ${
                    filter === t
                      ? "bg-cyan-500 text-black"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* ================= QUESTIONS ================= */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const status = getStatus(q);

              return (
                <div
                  key={q.id}
                  className="rounded-xl p-5 bg-[#030712] border border-white/10 shadow-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">
                      Q{q.id}. {q.question}
                    </h3>
                    <StatusBadge status={status} />
                  </div>

                  <p className="text-sm text-slate-400">
                    Your Answer:{" "}
                    <span className="text-white">
                      {q.userAnswer || "Not Answered"}
                    </span>
                  </p>

                  <p className="text-sm text-green-400">
                    Correct Answer: {q.correctAnswer}
                  </p>

                  <div className="mt-3 text-sm text-slate-300">
                    💡 {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= ACTION ================= */}
        <section className="flex flex-wrap justify-center gap-4 pt-6">
          <ActionBtn label="Retry Same Level" />
          <ActionBtn label="Upgrade Difficulty" />
          <ActionBtn label="Review Weak Topics" />
          <ActionBtn label="Back to Dashboard" />
        </section>
      </div>
    </div>
  );
};

export default ResultPage;
