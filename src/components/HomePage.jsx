import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen bg-[#030712]">
      <div className="h-full flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-white font-extrabold text-5xl md:text-6xl tracking-tight">
          Welcome to <span className="text-indigo-400">Exam-Pressure</span> ⏱️
        </h1>

        <p className="text-slate-400 text-lg mt-5 max-w-xl leading-relaxed">
          Experience real exam pressure with timed tests, locked results, and
          deep performance analysis.
        </p>
        <div className="p-[1.5px] rounded-full bg-gradient-to-r from-slate-500 to-slate-300 mt-8">
          <button
            className="group inline-flex items-center justify-center px-8 py-4 rounded-full backdrop-blur-md bg-[#030712] border border-white/20 text-white font-semibold transition-all duration-300 hover:bg-violet-500/20 hover:scale-105 active:scale-95"
            onClick={() => {
              navigateToLogin();
            }}
          >
            Enter Exam Mode
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
