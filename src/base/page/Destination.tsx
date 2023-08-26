import { useEffect } from "react";
import { contexLayout } from "src/base/contex/LayoutContext";
import { contexDestination } from "src/base/contex/DestinationContex";
import { getAllDestination } from "src/utils/ws";

// components
import { Filter } from "src/components/destination/Filter";
import { List } from "src/components/destination/List";
import { IconPlus } from "src/components/ui/Icon";

const Destination = () => {
  const { globalLayout } = contexLayout();
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

    await getAllDestination(globalLayout.width < 768 ? 5 : 10).then(
      (res: any) => {
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
      }
    );
  };

  return (
    <div className="m-0 py-10 px-5 md:px-20 w-full min-h-screen">
      <div className="px-0 md:px-5 w-full flex justify-end">
        <button className="px-4 py-2 flex items-center space-x-2 bg-green-600 rounded-lg text-white text-sm font-bold hover:bg-green-700">
          <IconPlus className="w-4 h-4 md:w-5 md:h-5" />
          <span>Add Destination</span>
        </button>
      </div>
      {/* <Filter /> */}
      <List />
    </div>
  );
};

export default Destination;
