import { useNavigate } from "react-router-dom";

const ExitPage = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      {/* Glass Card */}
      <div className="w-full max-w-2xl text-center backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl animate-fadeIn">
        {/* Emoji */}
        <div className="text-6xl mb-6">🙁📝</div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="text-white">Sorry, you exited the</span>{" "}
          <span className="text-violet-400">exam</span>
        </h1>

        {/* Sub Heading */}
        <p className="text-gray-400 text-sm md:text-base mb-10 leading-relaxed">
          If you want to give the exam again, go back to the home page and start
          your exam from the beginning. Stay calm, focus up, and try again 💪
        </p>

        {/* Button */}
        <button
          onClick={goToHome}
          className="group inline-flex items-center justify-center px-8 py-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold transition-all duration-300 hover:bg-violet-500/20 hover:scale-105 active:scale-95"
        >
          Go to Home Page
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      {/* Animation Styles */}
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

export default ExitPage;
