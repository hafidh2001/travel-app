import { useEffect, useState } from "react";
import axios from "axios";
import { configs } from "src/base/global/global";
import { contexSuperAdmin } from "src/base/contex/SuperAdminContex";

// components
import { List } from "src/components/superadmin/ListUser";
import { FormUser } from "src/components/superadmin/FormUser";
import { getAllUser, getUserById } from "../../utils/ws";
import { IUserById } from "../global/interface";

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
      console.log(res);
      if (!!res) {
        setGlobalSuperAdmin({
          ...globalSuperAdmin,
          listUser: res,
          loadingListUser: false,
        });
      }
    });
  };

  const getDataUserById = async (prompt_id: number) => {
    await axios
      .post(
        `${configs.url_backend}/api/prompt/byid`,
        {
          prompt_id,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${(window as any).user.auth.access_token}`,
        //   },
        // }
      )
      .then((res: any) => {
        if (!!res) {
          setGlobalSuperAdmin({
            ...globalSuperAdmin,
            // dataSuperAdminById: res.data.data,
          });
        }
      });
  };

  return (
    <div className="py-10 px-5 md:px-20">
      {state === "List" ? (
        <List
          setState={setState}
          getData={getData}
          getDataUserById={getDataUserById}
        />
      ) : state === "Add User" || state === "Edit User" ? (
        <FormUser state={state} setState={setState} getData={getData} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SuperAdmin;
