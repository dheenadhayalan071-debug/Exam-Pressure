import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useTestStore from "../Store/useTestStore";

const TOTAL_QUESTIONS = 20;

const TestPage = () => {
  const navigate = useNavigate();

  const {
    examId,
    currentQuestion,
    timeLeft,
    answers,
    examEnded,
    tick,
    nextQuestion,
    setAnswer,
    endExam,
  } = useTestStore();

  /* TIMER */
  useEffect(() => {
    if (examEnded) return;

    if (timeLeft === 0) {
      currentQuestion === TOTAL_QUESTIONS
        ? submitExam("TIME_UP")
        : nextQuestion();
      return;
    }

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, currentQuestion, examEnded, nextQuestion, tick]);

  /* FULLSCREEN EXIT */
  useEffect(() => {
    const handleFsExit = () => {
      if (!document.fullscreenElement && !examEnded) {
        submitExam("EXIT_FULLSCREEN");
      }
    };
    document.addEventListener("fullscreenchange", handleFsExit);
    return () => document.removeEventListener("fullscreenchange", handleFsExit);
  }, []);

  /* REFRESH BLOCK */
  useEffect(() => {
    const blockRefresh = (e) => {
      submitExam("REFRESH");
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", blockRefresh);
    return () => window.removeEventListener("beforeunload", blockRefresh);
  }, []);

  async function submitExam(reason) {
    if (examEnded) return;

    endExam(reason);

    const payload = {
      examId,
      answers,
      reason,
      submittedAt: new Date().toISOString(),
    };

    await axios.post(
      "https://exam-pressure.onrender.com/exam/submit",
      payload,
      { withCredentials: true },
    );

    // ✅ STORE FOR RESULT-LOCK
    localStorage.setItem(
      "examLock",
      JSON.stringify({
        examId,
        reason,
        submittedAt: payload.submittedAt,
      }),
    );

    navigate("/result-lock");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#020617] text-white flex flex-col">
      {/* NAVBAR */}
      <nav className="flex justify-between px-8 py-4 backdrop-blur-xl bg-white/10 border-b border-white/10 shadow-lg">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          Exam<span className="text-indigo-400">-Pressure</span>
        </h2>
        <span className="font-mono text-red-400 h-fit w-fit  px-5 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10 text-center">
          ⏱ {timeLeft}s
        </span>
      </nav>

      {/* PAGINATION */}
      <div className="flex flex-wrap gap-2 justify-center py-4">
        {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => {
          const q = i + 1;
          const answered = answers[q];

          return (
            <button
              key={q}
              className={`
                w-9 h-9 rounded-full text-sm font-bold
                backdrop-blur-md border transition-all duration-300
                ${
                  currentQuestion === q
                    ? "bg-red-500 text-white scale-110 shadow-lg"
                    : answered
                      ? "bg-green-500/30 border-green-400 text-green-300"
                      : "bg-white/10 border-white/20 text-gray-300"
                }
              `}
            >
              {q}
            </button>
          );
        })}
      </div>

      {/* MAIN QUESTION CARD */}
      <main className="flex-1 flex justify-center items-center px-4">
        <div
          className="max-w-3xl w-full p-8 rounded-3xl
          backdrop-blur-2xl bg-white/10 border border-white/10
          shadow-[0_20px_50px_rgba(0,0,0,0.6)]
        "
        >
          <h2 className="mb-6 text-xl text-center font-semibold">
            Q{currentQuestion}. What does HTTP stand for?
          </h2>

          {[
            "HyperText Transfer Protocol",
            "High Transfer Text Protocol",
            "Hyper Tool Transfer Process",
            "Host Transfer Text Protocol",
          ].map((opt, i) => (
            <label
              key={i}
              className={`
                flex gap-3 p-4 mb-3 cursor-pointer rounded-full
                backdrop-blur-md border transition-all duration-300
                ${
                  answers[currentQuestion]?.index === i
                    ? "bg-red-500/30 border-red-400 scale-[1.02]"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }
              `}
            >
              <input
                type="radio"
                checked={answers[currentQuestion]?.index === i}
                onChange={() => setAnswer(currentQuestion, i, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="p-6 flex justify-center backdrop-blur-xl bg-white/5 border-t border-white/10">
        <button
          onClick={() =>
            currentQuestion === TOTAL_QUESTIONS
              ? submitExam("MANUAL_SUBMIT")
              : nextQuestion()
          }
          className="
            px-10 py-3 rounded-full font-semibold tracking-wide
            bg-red-500 hover:bg-red-600
            transition-all duration-300
            hover:scale-105 shadow-lg cursor-pointer
          "
        >
          {currentQuestion === TOTAL_QUESTIONS
            ? "Submit Exam"
            : "Next Question"}
        </button>
      </footer>
    </div>
  );
};

export default TestPage;
