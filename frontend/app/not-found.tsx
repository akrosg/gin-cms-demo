import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-extrabold text-slate-100 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mb-8">
        お探しのページは削除されたか、名前が変更されたか、一時的に利用できない可能性があります。
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
