import CommonLayout from "@/layout/common";
import { ChangeEvent, useState } from "react";

function Menu() {
  const [inputMenu, setInputMenu] = useState<string>("");

  const handleChangeInputMenu = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMenu(value);
  };

  return (
    <CommonLayout>
      <section>
        <div>
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="menu"
          >
            Menu Makanan
          </label>
          <div className="mt-1 flex items-center justify-between">
            <input
              id="menu"
              type="text"
              placeholder="Tambahkan disini..."
              className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-neutral-400"
              value={inputMenu}
              onChange={handleChangeInputMenu}
            />
            <button
              className="bg-primary text-primary-foreground ml-2 h-10 w-[120px] rounded-md px-4 py-2 text-center text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!inputMenu}
            >
              Tambah
            </button>
          </div>
        </div>

        <div className="mt-4 w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <caption className="text-muted-foreground mt-4 text-sm">
              Daftar menu restoran Anda
            </caption>
            <thead className="border-b">
              <tr className="hover:bg-muted/50 border-b">
                <th className="text-muted-foreground h-12 w-[100px] px-4 text-left align-middle font-medium">
                  ID
                </th>
                <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                  Menu
                </th>
                <th className="text-muted-foreground h-12 px-4 text-right align-middle font-medium">
                  Hapus?
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              <tr className="hover:bg-muted/50 border-b">
                <td className="p-4 align-middle font-medium">996756</td>
                <td className="p-4 align-middle">Ayam Kecap Manis</td>
                <td className="flex justify-end p-4 align-middle">
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
                    className="cursor-pointer text-red-300 hover:text-red-500"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </CommonLayout>
  );
}

export default Menu;
