import { dataTab } from "@/constants/tab";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

function CommonLayout({ children }: { children: ReactNode }) {
  const { pathname } = useRouter();

  return (
    <main className="w-[650px] p-6">
      <h1 className="text-3xl font-semibold">Restoran Asep App</h1>
      <div className="mt-4 flex justify-between">
        <div className="bg-muted flex items-center rounded-md p-1">
          {dataTab.map((tab, i) => (
            <Link key={i} href={tab.label}>
              <button
                className={`${
                  pathname === `/${tab.label}`
                    ? "text-foreground bg-white"
                    : "text-muted-foreground bg-transparent"
                } min-w-[100px] rounded-sm px-3 py-1.5 text-center text-sm font-medium`}
              >
                {tab.value}
              </button>
            </Link>
          ))}
        </div>

        <button className="bg-background border-input hover:bg-muted flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="mr-2"
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
            <path d="M16 16h5v5"></path>
          </svg>
          Reset
        </button>
      </div>
      <div className="bg-muted mt-4 min-h-[300px] rounded-md px-6 py-4">
        {children}
      </div>
    </main>
  );
}

export default CommonLayout;
