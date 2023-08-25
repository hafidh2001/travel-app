import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { gLayout, ILayout } from "src/base/global/layout";

const LayoutContext = createContext<any>(null);

export const LayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [globalLayout, setGlobalLayout] = useState<ILayout>(gLayout);

  const layoutContextValue = useMemo(
    () => ({
      globalLayout,
      setGlobalLayout,
    }),
    [globalLayout]
  );

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

interface ILayoutContextValue {
  globalLayout: ILayout;
  setGlobalLayout: (e: ILayout) => void;
}

export const contexLayout = () => {
  const { globalLayout, setGlobalLayout } =
    useContext<ILayoutContextValue>(LayoutContext);
  return { globalLayout, setGlobalLayout };
};
