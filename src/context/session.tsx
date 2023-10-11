"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { Menu } from "../components/Menu";
import { items } from "../utils/menu";
import { Loading } from "../components/Loading";
import { SignIn } from "../components/domain/SignIn";
import { List } from "@phosphor-icons/react";

const SessionContext = createContext<{
  showMenu?: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean | undefined>>;
}>({ showMenu: undefined, setShowMenu: () => {} });

export const useSessionContext = () => useContext(SessionContext);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>();
  const [showMenu, setShowMenu] = useState<boolean>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(Cookies.get("user"));
    setLoading(false);
  }, []);

  return (
    <SessionContext.Provider value={{ setShowMenu, showMenu }}>
      {loading ? (
        <div className="flex flex-col h-screen items-center justify-center">
          <Loading />
        </div>
      ) : user !== undefined ? (
        <>
          <List
            className="text-white self-end"
            style={{ position: "absolute", top: "8px", right: "8px" }}
            onClick={() => setShowMenu(true)}
            size={24}
          />
          {showMenu !== undefined && (
            <Menu show={showMenu} setShow={setShowMenu} items={items} />
          )}
          {children}
        </>
      ) : (
        <SignIn setUser={setUser} />
      )}
    </SessionContext.Provider>
  );
};
