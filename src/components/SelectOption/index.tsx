import { useEffect, useRef, useState } from "react";

interface SelectOptionInterface {
  label: string;
  data: Array<IdName>;
  value: IdName;
  onChange: (m: IdName) => void;
}

function SelectOption({ label, data, value, onChange }: SelectOptionInterface) {
  const refElement = useRef<HTMLDivElement>(null);
  const [showOption, setShowOption] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        refElement.current &&
        !refElement.current.contains(event.target as Element)
      ) {
        setShowOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <label className="text-sm font-medium leading-none">{label}</label>
      <div className="relative" ref={refElement}>
        <button
          type="button"
          className={`mt-1 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            value.id === 0 ? "text-muted-foreground" : "text-foreground"
          }`}
          onClick={() => setShowOption(!showOption)}
        >
          <span>{value.name}</span>
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
            className="h-4 w-4 opacity-50"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {showOption ? (
          <div className="absolute top-11 z-50 w-full rounded-md bg-background p-1 shadow-md">
            {data.map((m) => (
              <div
                key={m.id}
                className="relative flex w-full cursor-default items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-muted"
                onClick={() => {
                  onChange(m);
                  setShowOption(false);
                }}
              >
                <div className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  {m.id === value.id ? (
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
                      className="h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : null}
                </div>
                <div>{m.name}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default SelectOption;
