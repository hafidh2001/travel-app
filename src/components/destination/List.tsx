import { FC } from "react";
import { contexLayout } from "src/base/contex/LayoutContext";
import { contexDestination } from "src/base/contex/DestinationContex";
import { IPagination } from "src/base/global/interface";
import { getAllDestination } from "src/utils/ws";

// components
import { Card } from "./Card";

export const List: FC<{}> = () => {
  const { globalLayout } = contexLayout();
  const { globalDestination, setGlobalDestination } = contexDestination();

  const onPagination = async (page: number) => {
    if (!!globalDestination.loading) return;
    setGlobalDestination({
      ...globalDestination,
      loading: true,
    });

    await getAllDestination(globalLayout.width < 768 ? 5 : 10, page).then(
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

  return (
    <div className="w-full md:p-5">
      {!!globalDestination.loading ? (
        <div className="flex items-center justify-center">loading ...</div>
      ) : (
        <div className="m-0 p-0">
          <p className="my-2">
            {globalDestination.list_total} destination found
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-y-7 gap-x-0 md:gap-x-10">
            {globalDestination.list.map((item: any, idx: number) => (
              <Card key={idx} data={item} />
            ))}
          </div>
          <div className="mt-5 w-full flex items-center justify-center space-x-2">
            {globalDestination.pagination.map(
              (item: IPagination, idx: number, arr: IPagination[]) =>
                !!item.url && (
                  <button
                    key={idx}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex justify-center items-center ${
                      Number(item.label.split("=")) ===
                      globalDestination.current_page
                        ? "scale-110 bg-blue-primary"
                        : "bg-gray-600"
                    }`}
                    onClick={async () => {
                      if (
                        Number(item.label.split("=")) !==
                        globalDestination.current_page
                      )
                        await onPagination(
                          idx === 0
                            ? globalDestination.current_page - 1
                            : idx === arr.length - 1
                            ? globalDestination.current_page + 1
                            : Number(item.label.split("="))
                        );
                    }}
                  >
                    <span className="text-gray-50 font-bold text-sm md:text-base">
                      {idx === 0
                        ? "<<"
                        : idx === arr.length - 1
                        ? ">>"
                        : item.label}
                    </span>
                  </button>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
