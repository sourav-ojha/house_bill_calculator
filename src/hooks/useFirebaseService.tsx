import React, { useEffect } from "react";
import { Tenant } from "../services/types";

const useFirebaseService = (
  firebaseService: (params?: Object) => Promise<any>,
  dataType: string,
  args?: Object
) => {
  const [loading, setLoading] = React.useState(true);
  const [list, setList] = React.useState<Array<any>>([]);

  const serviceCall = () => {
    setLoading(true);
    firebaseService(args)
      .then((res) => {
        setList(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        console.log("finally");
      });
  };


  return { serviceCall, loading, list };
};

export default useFirebaseService;
