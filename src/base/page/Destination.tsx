import { useEffect, useState } from "react";
import { contexLayout } from "src/base/contex/LayoutContext";
import { contexDestination } from "src/base/contex/DestinationContex";
import { getAllDestination } from "src/utils/ws";

// components
import { Filter } from "src/components/destination/Filter";
import { List } from "src/components/destination/List";
import { IconPlus } from "src/components/ui/Icon";
import { FormDestination } from "../../components/admin/FormDestination";

const Destination = () => {
  const { globalLayout } = contexLayout();
  const { globalDestination, setGlobalDestination } = contexDestination();

  const [tab, setTab] = useState<string>("List");

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

  return !globalDestination.loading ? (
    <div className="m-0 py-10 px-5 md:px-20 w-full min-h-screen">
      {(window as any).user.role === "admin" && tab === "List" && (
        <div className="px-0 md:px-5 w-full flex justify-end">
          <button
            className="px-4 py-2 flex items-center space-x-2 bg-green-600 rounded-lg text-white text-sm font-bold hover:bg-green-700"
            onClick={() => {
              setTab("Add Destination");
            }}
          >
            <IconPlus className="w-4 h-4 md:w-5 md:h-5" />
            <span>Add Destination</span>
          </button>
        </div>
      )}
      {tab === "Add Destination" || tab === "Update Destination" ? (
        <FormDestination tab={tab} setTab={setTab} getData={init} />
      ) : (
        <>
          <Filter />
          <List />
        </>
      )}
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <p>loading...</p>
    </div>
  );
};

export default Destination;
