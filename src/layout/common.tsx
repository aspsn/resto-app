import { dataTab } from "@/constants/tab";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import { ReactNode } from "react";

function CommonLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = useRouter();
  const { showToastReset, handleReset } = useAppContext();

  return (
    <main className="w-[650px] p-6">
      <h1 className="text-3xl font-semibold">Restoran Asep App</h1>
      <div className="mt-4 flex justify-between">
        <div className="flex items-center rounded-md bg-muted p-1">
          {dataTab.map((tab, i) => (
            <button
              key={i}
              onClick={() => router.push(`/${tab.label}`)}
              className={`${
                pathname === `/${tab.label}`
                  ? "bg-white text-foreground"
                  : "bg-transparent text-muted-foreground"
              } min-w-[100px] rounded-sm px-3 py-1.5 text-center text-sm font-medium`}
            >
              {tab.value}
            </button>
          ))}
        </div>
        <div className="relative flex justify-center">
          <div
            className={`absolute bottom-11 flex h-10 items-center gap-2 overflow-hidden rounded-md bg-green-600 px-4 py-2 text-sm text-white shadow-lg transition-opacity duration-300 ${
              showToastReset
                ? "opacity-1 visible w-max"
                : "invisible w-0 opacity-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>{" "}
            Data telah direset ulang
          </div>
          <button
            className="flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            onClick={handleReset}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            Reset
          </button>
        </div>
      </div>
      <div className="mt-4 min-h-[300px] rounded-md bg-muted px-6 py-4">
        {children}
      </div>
    </main>
  );
}

export default CommonLayout;
