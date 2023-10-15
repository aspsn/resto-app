import SelectOption from "@/components/SelectOption";
import { listMeja } from "@/constants/meja";
import { useAppContext } from "@/context/AppContext";
import CommonLayout from "@/layout/common";
import { useEffect, useState } from "react";

function Kasir() {
  const { orders, getListOrder } = useAppContext();
  const [dataMeja, setDataMeja] = useState<Array<IdName>>([]);
  const [selectedMeja, setSelectedMeja] = useState<IdName>({
    id: 0,
    name: "Nomor Meja",
  });

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

    setDataMeja(tempMeja);
  }, [orders]);

  return (
    <CommonLayout>
      <section>
        <div className="flex items-end gap-2">
          <div className="w-[140px]">
            <SelectOption
              label="Meja"
              data={[{ id: 0, name: "Nomor meja" }, ...dataMeja]}
              value={selectedMeja}
              onChange={(e) => setSelectedMeja(e)}
            />
          </div>
          <button
            className="h-10 rounded-md bg-primary px-4 py-2 text-center text-sm text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            disabled={selectedMeja.id === 0}
          >
            Print struk
          </button>
        </div>
      </section>
    </CommonLayout>
  );
}

export default Kasir;
