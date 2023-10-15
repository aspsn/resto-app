import { defaultMenu } from "@/constants/menu";
import { getLocalStorage, setLocalStorage } from "@/helpers/localStorage";
import { OrderInterface } from "@/interface/order";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextInterface {
  menus: Array<IdName> | [];
  orders: Array<OrderInterface> | [];
  generateId: () => number;
  handleReset: () => void;
  setMenus: (e: Array<IdName>) => void;
  setOrders: (e: Array<OrderInterface>) => void;
  getListMenu: () => void;
  getListOrder: () => void;
}

const AppContext = createContext<AppContextInterface>({
  menus: [],
  orders: [],
  generateId: () => 0,
  handleReset: () => undefined,
  setMenus: () => undefined,
  setOrders: () => undefined,
  getListMenu: () => undefined,
  getListOrder: () => undefined,
});

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [menus, setMenus] = useState<Array<IdName>>([]);
  const [orders, setOrders] = useState<Array<OrderInterface>>([]);

  useEffect(() => {
    getListMenu();
    getListOrder();
  }, []);

  const handleReset = () => {
    localStorage.removeItem("menus");
    localStorage.removeItem("orders");
    getListMenu();
    getListOrder();
  };

  const generateId = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const getListMenu = () => {
    const menus = getLocalStorage("menus");

    if (!menus) {
      setLocalStorage("menus", JSON.stringify(defaultMenu));
      setMenus(defaultMenu);
    } else {
      const parseMenus = JSON.parse(menus);
      setMenus(parseMenus);
    }
  };

  const getListOrder = () => {
    const orders = getLocalStorage("orders");

    if (!orders) {
      setOrders([]);
    } else {
      const parseOrders = JSON.parse(orders);
      setOrders(parseOrders);
    }
  };

  return (
    <AppContext.Provider
      value={{
        menus,
        orders,
        generateId: () => generateId(),
        handleReset: () => handleReset(),
        setMenus: (e) => setMenus(e),
        setOrders: (e) => setOrders(e),
        getListMenu: () => getListMenu(),
        getListOrder: () => getListOrder(),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
