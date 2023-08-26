import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { gSuperAdmin, ISuperAdmin } from "src/base/global/superadmin";

const SuperAdminContext = createContext<any>(null);

export const SuperAdminProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [globalSuperAdmin, setGlobalSuperAdmin] =
    useState<ISuperAdmin>(gSuperAdmin);

  const superadminContextValue = useMemo(
    () => ({
      globalSuperAdmin,
      setGlobalSuperAdmin,
    }),
    [globalSuperAdmin]
  );

  return (
    <SuperAdminContext.Provider value={superadminContextValue}>
      {children}
    </SuperAdminContext.Provider>
  );
};

interface ISuperAdminContextValue {
  globalSuperAdmin: ISuperAdmin;
  setGlobalSuperAdmin: (e: ISuperAdmin) => void;
}

export const contexSuperAdmin = () => {
  const { globalSuperAdmin, setGlobalSuperAdmin } =
    useContext<ISuperAdminContextValue>(SuperAdminContext);
  return { globalSuperAdmin, setGlobalSuperAdmin };
};
