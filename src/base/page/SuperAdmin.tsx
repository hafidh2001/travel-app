import { useEffect, useState } from "react";
import axios from "axios";
import { configs } from "src/base/global/global";
import { contexSuperAdmin } from "src/base/contex/SuperAdminContex";

// components
import { List } from "src/components/superadmin/ListUser";
import { FormUser } from "src/components/superadmin/FormUser";
import { getAllUser } from "src/utils/ws";

const SuperAdmin = () => {
  const { globalSuperAdmin, setGlobalSuperAdmin } = contexSuperAdmin();
  const [state, setState] = useState<string>("List");

  useEffect(() => {
    document.title = "SuperAdmin - Travel App";
    window.scrollTo(0, 0);
    getData();
  }, []);

  const getData = async (name?: string, role?: string) => {
    if (!!globalSuperAdmin.loadingListUser) return;
    setGlobalSuperAdmin({
      ...globalSuperAdmin,
      loadingListUser: true,
    });

    await getAllUser(name, role).then((res: any) => {
      if (!!res) {
        setGlobalSuperAdmin({
          ...globalSuperAdmin,
          listUser: res,
          loadingListUser: false,
        });
      }
    });
  };

  return (
    <div className="py-10 px-5 md:px-20">
      {state === "List" ? (
        <List setState={setState} getData={getData} />
      ) : state === "Add User" || state === "Edit User" ? (
        <FormUser state={state} setState={setState} getData={getData} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SuperAdmin;
