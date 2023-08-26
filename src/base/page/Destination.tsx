import { useEffect } from "react";
import { contexDestination } from "src/base/contex/DestinationContex";
import { getAllDestination } from "src/utils/ws";

// components
import { Filter } from "src/components/destination/Filter";
import { List } from "src/components/destination/List";
import { IDataDestination } from "../global/interface";

const Destination = () => {
  const { globalDestination, setGlobalDestination } = contexDestination();

  useEffect(() => {
    document.title = "Destination - Travel App";
    window.scrollTo(0, 0);
    init();
  }, []);

  const init = async () => {
    if (!!globalDestination.loading) return;
    setGlobalDestination({
      ...globalDestination,
      loading: true,
    });

    await getAllDestination().then((res: any) => {
      console.log(res);
      if (!!res) {
        setGlobalDestination({
          ...globalDestination,
          list: res.data,
          list_total: res.total,
          pagination: res.links,
          current_page: res.current_page,
          loading: false,
        });
      }
    });
  };

  return (
    <div className="m-0 py-10 px-5 md:px-20 w-full min-h-screen">
      <Filter />
      <List />
    </div>
  );
};

export default Destination;
