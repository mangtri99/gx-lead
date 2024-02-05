import { useMemo, useState } from "react";
import { APIResponse, Option } from "../../../config/types";
import useFetch from "../../../composables/useFetch";
import { BRANCH_URL, STATUS_URL } from "../../../config/api";

export default function useLeadOptionFilter() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [statusOptions, setStatusOptions] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [branchOptions, setBranchOptions] = useState<any>();
  const { $fetch } = useFetch();
  const fetchOptions = async () => {
    try {
      Promise.all([
        $fetch<APIResponse<Option[]>>(BRANCH_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const branch = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
            };
          })
          setBranchOptions(branch);
        }),

        $fetch<APIResponse<Option[]>>(STATUS_URL, {
          method: "GET",
        }).then((res) => {
          const response = res.data.data;
          const status = response.map((item) => {
            return {
              value: String(item.id),
              label: item.name,
            };
          });
          setStatusOptions(status);
        }),
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  useMemo(() => {
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    statusOptions,
    branchOptions,
  };
}
