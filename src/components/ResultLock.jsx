import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const reasonMap = {
  TIME_UP: "Auto Submitted (Time Up)",
  EXIT_FULLSCREEN: "Auto Submitted (Fullscreen Exit)",
  REFRESH: "Auto Submitted (Page Refresh)",
  MANUAL_SUBMIT: "Manually Submitted",
};

const ResultLock = () => {
  const navigate = useNavigate();

  const raw = localStorage.getItem("examLock");
  const lockData = raw ? JSON.parse(raw) : null;

  if (!lockData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        ❌ No exam submission found
      </div>
    );
  }

  const { examId, submittedAt, submitReason } = lockData;

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <header className="px-8 py-5 border-b border-white/10 flex justify-between">
        <h1 className="text-2xl font-bold">
          Exam<span className="text-red-500">-</span>Pressure
        </h1>
        <span className="text-sm text-slate-400">
          Exam ID: <span className="font-mono">{examId}</span>
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-xl">
          <div className="text-6xl mb-4">🔒</div>

          <h2 className="text-2xl font-semibold mb-4">
            Exam Submitted Successfully
          </h2>

          <div className="text-left text-sm space-y-2 bg-black/30 rounded-xl p-4 border border-white/10">
            <p>
              <span className="text-slate-400">Submitted At:</span>{" "}
              <span className="font-mono">
                {new Date(submittedAt).toLocaleString()}
              </span>
            </p>
            <p>
              <span className="text-slate-400">Reason:</span>{" "}
              <span className="text-red-400">{reasonMap[submitReason]}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultLock;
