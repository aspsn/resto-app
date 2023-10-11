import CommonLayout from "@/layout/common";

function Kasir() {
  return (
    <CommonLayout>
      <section>
        <label className="text-sm font-medium leading-none">Meja</label>
        <div className="flex gap-2">
          <button
            type="button"
            className="border-input bg-background text-muted-foreground flex h-10 w-[180px] items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>Nomor Meja</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-4 w-4 opacity-50"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
          <button
            className="bg-primary text-primary-foreground h-10 rounded-md px-4 py-2 text-center text-sm disabled:cursor-not-allowed disabled:opacity-50"
            disabled
          >
            Print struk
          </button>
        </div>
      </section>
    </CommonLayout>
  );
}

export default Kasir;
