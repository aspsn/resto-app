import { listMeja } from "@/constants/meja";
import { dataOrderInterface } from "@/interface/order";
import CommonLayout from "@/layout/common";
import { useState } from "react";

function Order() {
  const [dataOrder, setDataOrder] = useState<dataOrderInterface>();

  return (
    <CommonLayout>
      <section className="flex flex-col gap-3">
        <div className="border-input flex overflow-hidden rounded-md border">
          {listMeja.map((m, i) => (
            <div
              key={i}
              className={` flex h-[60px] flex-1 cursor-pointer items-center justify-center  p-2 text-center text-sm transition-colors ${
                dataOrder?.table === m.value
                  ? "bg-black text-white hover:bg-black "
                  : "text-foreground hover:bg-muted bg-white "
              } ${i === 1 ? "border-x" : ""}`}
              onClick={() =>
                setDataOrder({
                  ...(dataOrder as dataOrderInterface),
                  table: m.value,
                })
              }
            >
              {m.label}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <label className="text-sm font-medium leading-none">Menu</label>
            <button
              type="button"
              className="border-input bg-background text-muted-foreground mt-1 flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>Pilih menu</span>
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
          </div>
          <div>
            <label className="text-sm font-medium leading-none">Jumlah</label>
            <button
              type="button"
              className="border-input bg-background text-muted-foreground mt-1 flex h-10 w-[140px] items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>Kuantitas</span>
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
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-primary text-primary-foreground ml-2 h-10 w-[100px] rounded-md px-4 py-2 text-center text-sm disabled:cursor-not-allowed disabled:opacity-50"
            disabled
          >
            Tambah
          </button>
        </div>
      </section>
    </CommonLayout>
  );
}

export default Order;
