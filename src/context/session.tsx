"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { Loading } from "../components/Loading";
import { SignIn } from "../components/domain/SignIn";

const SessionContext = createContext(null);

export const useSessionContext = () => useContext(SessionContext);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(Cookies.get("user"));
    setLoading(false);
  }, []);

  return (
    <SessionContext.Provider value={null}>
      {loading ? (
        <div className="flex flex-col h-screen items-center justify-center">
          <Loading />
        </div>
      ) : user !== undefined ? (
        children
      ) : (
        <SignIn setUser={setUser} />
      )}
    </SessionContext.Provider>
  );
};
