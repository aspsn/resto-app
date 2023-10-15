import { listMeja } from "@/constants/meja";
import { useAppContext } from "@/context/AppContext";
import { OrderInterface } from "@/interface/order";
import CommonLayout from "@/layout/common";
import { useEffect, useState } from "react";

interface MenuDapurInterface extends OrderInterface {
  menuName: string;
}
interface DapurInterface extends IdName {
  orders?: Array<MenuDapurInterface> | [];
}

function Dapur() {
  const [dataDapur, setDataDapur] = useState<Array<DapurInterface>>(listMeja);
  const { menus, orders, getListMenu, getListOrder } = useAppContext();

  useEffect(() => {
    getListMenu();
    getListOrder();
  }, []);

  useEffect(() => {
    const mapping: Array<DapurInterface> = dataDapur.map((d) => {
      const filterMenu = orders.filter((o) => o.tableId === d.id);
      const menu: Array<MenuDapurInterface> = filterMenu.map((m) => ({
        ...m,
        menuName: menus.find((x) => x.id === m.menuId)?.name ?? "",
      }));

      return {
        ...d,
        orders: menu,
      };
    });

    setDataDapur(mapping);
  }, [orders]);

  return (
    <CommonLayout>
      <section className="flex">
        {dataDapur.map((m) => (
          <div key={m.id} className="w-1/3">
            <h3 className="text-xl font-semibold leading-none">{m.name}</h3>
            {m.orders?.length ? (
              <div className="mt-4 flex flex-col gap-1">
                {m.orders?.map((o) => (
                  <div
                    key={o.id}
                    className="flex text-sm text-muted-foreground"
                  >
                    <div className="min-w-[30px]">{`${o.quantity} x`}</div>
                    <div className="w-full break-all">{o.menuName}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </section>
    </CommonLayout>
  );
}

export default Dapur;
