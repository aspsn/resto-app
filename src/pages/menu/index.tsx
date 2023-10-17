import { useAppContext } from "@/context/AppContext";
import { setLocalStorage } from "@/helpers/localStorage";
import CommonLayout from "@/layout/common";
import { ChangeEvent, useEffect, useState } from "react";

function Menu() {
  const [inputMenu, setInputMenu] = useState<string>("");
  const { menus, generateId, getListMenu } = useAppContext();

  useEffect(() => getListMenu(), []);

  const handleChangeInputMenu = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMenu(value);
  };

  const handleAddMenu = () => {
    const tempMenu = [
      {
        id: generateId(),
        name: inputMenu,
      },
      ...menus,
    ];

    if (inputMenu) {
      setLocalStorage("menus", JSON.stringify(tempMenu));
      getListMenu();
      setInputMenu("");
    }
  };

  const handleDeleteMenu = (id: number) => {
    const tempMenu = [...menus];
    const filter = tempMenu.filter((m) => m.id !== id);

    setLocalStorage("menus", JSON.stringify(filter));
    getListMenu();
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-neutral-400"
              value={inputMenu}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddMenu();
              }}
              onChange={handleChangeInputMenu}
            />
            <button
              className="ml-2 h-10 w-[120px] rounded-md bg-primary px-4 py-2 text-center text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!inputMenu}
              onClick={handleAddMenu}
            >
              Tambah
            </button>
          </div>
        </div>

        <div className="mt-4 w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <caption className="mt-4 text-sm text-muted-foreground">
              Daftar menu restoran Anda
            </caption>
            <thead className="border-b">
              <tr className="border-b hover:bg-muted/50">
                <th className="h-12 w-[100px] px-4 text-left align-middle font-medium text-muted-foreground">
                  ID
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Menu
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                  Hapus?
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {menus.map((m, i) => (
                <tr key={i} className="border-b hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{m.id}</td>
                  <td className="p-4 align-middle">{m.name}</td>
                  <td className="flex justify-end p-4 align-middle">
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
                      className="cursor-pointer text-red-300 hover:text-red-500"
                      onClick={() => handleDeleteMenu(m.id)}
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </CommonLayout>
  );
}

export default Menu;
