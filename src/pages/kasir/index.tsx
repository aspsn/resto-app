import SelectOption from "@/components/SelectOption";
import { listMeja } from "@/constants/meja";
import { useAppContext } from "@/context/AppContext";
import { setLocalStorage } from "@/helpers/localStorage";
import { OrderInterface } from "@/interface/order";
import CommonLayout from "@/layout/common";
import { useEffect, useState } from "react";

interface MenuOrderInterface extends OrderInterface {
  menuName: string;
}
interface SelectedMeja extends IdName {
  id: number;
  name: string;
  isPrint: boolean;
}

function Kasir() {
  const defaultMeja = {
    id: 0,
    name: "Nomor meja",
    isPrint: false,
  };
  const { menus, orders, getListOrder } = useAppContext();
  const [dataMeja, setDataMeja] = useState<Array<IdName>>([]);
  const [selectedMeja, setSelectedMeja] = useState<SelectedMeja>(defaultMeja);
  const [orderOnPrint, setOrderOnPrint] = useState<Array<MenuOrderInterface>>(
    [],
  );

  useEffect(() => getListOrder(), []);

  useEffect(() => {
    let tempMeja: Array<IdName> = [];
    listMeja.forEach((m) => {
      const mejaOnOrder = orders.filter((o) => o.tableId === m.id);

      if (mejaOnOrder.length) {
        tempMeja.push({
          id: m.id,
          name: m.id.toString(),
        });
      }
    });

    setOrderOnPrint([]);
    setSelectedMeja(defaultMeja);
    setDataMeja(tempMeja);
  }, [orders]);

  useEffect(() => {
    if (selectedMeja.id !== 0) {
      const order = orders.filter((o) => o.tableId === selectedMeja.id);
      const menu: Array<MenuOrderInterface> = order.map((o) => ({
        ...o,
        menuName: menus.find((x) => x.id === o.menuId)?.name ?? "",
      }));

      setOrderOnPrint(menu);
    }
  }, [selectedMeja]);

  const handleSelectMeja = (e: IdName) => {
    setSelectedMeja({ ...e, isPrint: false });
  };

  const handleEmptyTable = () => {
    const filterMeja = orders.filter((o) => o.tableId !== selectedMeja.id);

    setLocalStorage("orders", JSON.stringify(filterMeja));
    setSelectedMeja(defaultMeja);
    getListOrder();
  };

  const handlePrint = () => {
    setSelectedMeja({ ...selectedMeja, isPrint: true });
  };

  return (
    <CommonLayout>
      <section>
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-2">
            <div className="w-[180px]">
              <SelectOption
                label="Meja"
                data={[defaultMeja, ...dataMeja]}
                value={selectedMeja}
                onChange={(e) => handleSelectMeja(e)}
              />
            </div>
            <button
              className="h-10 rounded-md bg-primary px-4 py-2 text-center text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
              disabled={selectedMeja.id === 0}
              onClick={handlePrint}
            >
              Print struk
            </button>
          </div>
          {selectedMeja.id !== 0 ? (
            <button
              className="h-10 rounded-md bg-destructive px-4 py-2 text-center text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
              onClick={handleEmptyTable}
            >
              Kosongkan meja
            </button>
          ) : null}
        </div>
        {selectedMeja.isPrint ? (
          <div className="mt-2 w-full overflow-auto">
            <table className="w-full caption-bottom ">
              <caption className="mt-4 text-sm text-muted-foreground">
                Terima kasih sudah makan di <b>Restoran</b>
              </caption>
              <thead>
                <tr className="border-b bg-muted align-middle text-sm font-medium text-muted-foreground ">
                  <th className="h-12 w-[100px] px-4 text-right">Jumlah</th>
                  <th className="h-12 px-4 text-left">Menu</th>
                  <th className="h-12 w-[100px] px-4 text-left">Harga</th>
                </tr>
              </thead>
              <tbody>
                {orderOnPrint.map((o, i) => (
                  <tr
                    key={o.id}
                    className={`bg-muted align-middle text-sm ${
                      i === orderOnPrint.length - 1 ? "" : "border-b"
                    }`}
                  >
                    <td className="p-4 text-right font-medium ">
                      {o.quantity}
                    </td>
                    <td className="p-4">{o.menuName}</td>
                    <td className="p-4">Gratis</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </CommonLayout>
  );
}

export default Kasir;
