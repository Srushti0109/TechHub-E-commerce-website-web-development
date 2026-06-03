import { Link, useNavigate } from "react-router-dom";
import { HiArrowLeft, HiOutlineHome } from "react-icons/hi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-violet-600/6 rounded-full blur-[100px]" />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center max-w-lg">
        {/* 404 Display */}
        <div className="relative mb-6">
          <div className="font-display font-bold text-[160px] md:text-[200px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-900 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-display font-bold text-[160px] md:text-[200px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-indigo-500/20 to-transparent select-none blur-sm">
              404
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-8 -mt-10">
          <h1 className="font-display font-bold text-3xl text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-slate-400 leading-relaxed mb-8">
            The page you're looking for seems to have wandered off into the digital void.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <HiArrowLeft />
              Go Back
            </button>
            <Link
              to="/"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <HiOutlineHome />
              Back to Home
            </Link>
          </div>
        </div>

        <p className="text-slate-700 text-xs mt-6 font-mono">
          ERROR_CODE: 404 · PAGE_NOT_FOUND
        </p>
      </div>
    </div>
  );
};

export default NotFound;
