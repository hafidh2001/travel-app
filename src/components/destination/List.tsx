import { FC } from "react";
import { contexDestination } from "src/base/contex/DestinationContex";
import { IDestination } from "src/base/global/interface";
import { Card } from "./Card";

// components

export const List: FC<{}> = () => {
  const { globalDestination } = contexDestination();
  let list;
  list = globalDestination.list;

  return (
    <div className="w-full md:w-4/5 md:p-5">
      {!!globalDestination.loading ? (
        <div className="flex items-center justify-center">loading ...</div>
      ) : (
        <div className="m-0 p-0">
          <p className="mb-2">
            {globalDestination.list.length} destination found
          </p>
          {/* {JSON.stringify(globalDestination.list)} */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-y-7 gap-x-0 md:gap-x-10">
            {list.map((item: any, idx: number) => (
              <Card key={idx} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
