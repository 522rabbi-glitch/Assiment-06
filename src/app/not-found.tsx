import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-black text-[#ccff00]">404</h1>
      <h2 className="text-2xl font-bold text-white mt-4">Page Not Found</h2>
      <p className="text-slate-400 mt-2 text-sm">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
      >
        Go Back Home
      </Link>
    </div>
  );
}