import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { gDestination, IDestination } from "src/base/global/destination";

const DestinationContext = createContext<any>(null);

export const DestinationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [globalDestination, setGlobalDestination] =
    useState<IDestination>(gDestination);

  const destinationContextValue = useMemo(
    () => ({
      globalDestination,
      setGlobalDestination,
    }),
    [globalDestination]
  );

  return (
    <DestinationContext.Provider value={destinationContextValue}>
      {children}
    </DestinationContext.Provider>
  );
};

interface IDestinationContextValue {
  globalDestination: IDestination;
  setGlobalDestination: (e: IDestination) => void;
}

export const contexDestination = () => {
  const { globalDestination, setGlobalDestination } =
    useContext<IDestinationContextValue>(DestinationContext);
  return { globalDestination, setGlobalDestination };
};
