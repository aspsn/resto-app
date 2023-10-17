import SelectOption from "@/components/SelectOption";
import { listMeja } from "@/constants/meja";
import { useAppContext } from "@/context/AppContext";
import { setLocalStorage } from "@/helpers/localStorage";
import { OrderInterface } from "@/interface/order";
import CommonLayout from "@/layout/common";
import { useEffect, useState } from "react";

function Order() {
  const listQuantity: Array<IdName> = Array(5)
    .fill(0)
    .map((a, i) => ({ id: i + 1, name: (i + 1).toString() }));
  const { menus, orders, generateId, getListMenu, getListOrder } =
    useAppContext();
  const [selectedMeja, setSelectedMeja] = useState<IdName>();
  const [selectedMenu, setSelectedMenu] = useState<IdName>({
    id: 0,
    name: "Pilih Menu",
  });
  const [selectedQty, setSelectedQty] = useState<IdName>({
    id: 0,
    name: "Kuantitas",
  });

  useEffect(() => {
    getListMenu();
  }, []);

  const handleAddOrder = () => {
    const payload: OrderInterface = {
      id: generateId(),
      menuId: selectedMenu.id,
      quantity: selectedQty.id,
      tableId: selectedMeja?.id ?? 0,
    };

    setLocalStorage("orders", JSON.stringify([...orders, payload]));
    setSelectedMenu({ id: 0, name: "Pilih Menu" });
    setSelectedQty({ id: 0, name: "Kuantitas" });
    setSelectedMeja(undefined);
    getListOrder();
  };

  return (
    <CommonLayout>
      <section className="flex flex-col gap-3">
        <div className="flex overflow-hidden rounded-md border border-input">
          {listMeja.map((m, i) => (
            <button
              key={i}
              className={` flex h-[60px] flex-1 cursor-pointer items-center justify-center  p-2 text-center text-sm transition-colors ${
                selectedMeja?.id === m.id
                  ? "bg-black text-white hover:bg-black "
                  : "bg-white text-foreground hover:bg-muted "
              } ${i === 1 ? "border-x" : ""}`}
              onClick={() => setSelectedMeja(m)}
            >
              {m.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <SelectOption
              label="Menu"
              data={[{ id: 0, name: "Pilih menu" }, ...menus]}
              value={selectedMenu}
              onChange={(e) => setSelectedMenu(e)}
            />
          </div>
          <div>
            <div className="w-[140px]">
              <SelectOption
                label="Jumlah"
                data={[{ id: 0, name: "Kuantitas" }, ...listQuantity]}
                value={selectedQty}
                onChange={(e) => setSelectedQty(e)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="ml-2 h-10 w-[100px] rounded-md bg-primary px-4 py-2 text-center text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            disabled={
              !selectedMeja || selectedMenu.id === 0 || selectedQty.id === 0
            }
            onClick={handleAddOrder}
          >
            Tambah
          </button>
        </div>
      </section>
    </CommonLayout>
  );
}

export default Order;
