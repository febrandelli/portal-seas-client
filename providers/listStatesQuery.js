import {Requests} from "../utils";
import {useQuery} from "react-query";

export function useListStatesQuery() {
    const listStates = async () => {
        return await Requests({
            url: "estado",
            type: "get"
        });
    };
    return useQuery("listStates", listStates, {
        refetchOnWindowFocus: false,
    });
}
