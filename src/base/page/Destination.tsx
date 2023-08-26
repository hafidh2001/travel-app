import { useEffect } from "react";
import { contexDestination } from "src/base/contex/DestinationContex";
import { getAllDestination } from "src/utils/ws";

// components
import { Filter } from "src/components/destination/Filter";
import { List } from "src/components/destination/List";

const Destination = () => {
  const { globalDestination, setGlobalDestination } = contexDestination();

  useEffect(() => {
    document.title = "Destination - Travel App";
    window.scrollTo(0, 0);
    init();
  }, []);

  const init = async () => {
    if (globalDestination.list.length === 0) {
      if (!!globalDestination.loading) return;
      setGlobalDestination({
        ...globalDestination,
        loading: true,
      });

      await getAllDestination().then((res: any) => {
        if (!!res) {
          setGlobalDestination({
            ...globalDestination,
            list: res.data,
            loading: false,
          });
        }
      });
    }
  };

  return (
    <div className="m-0 py-10 px-5 md:px-20 w-full min-h-screen">
      <div className="w-full flex flex-col md:flex-row">
        <Filter />
        <List />
      </div>
    </div>
  );
};

export default Destination;
