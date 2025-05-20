// utils/useRefreshJobs.ts
import { useQuery } from "@apollo/client";
import { GET_USER_JOBS } from "../graphql/getJobs.graphql";
import { useAppDispatch, useAppSelector } from "../hooks/useAuth";
import { setJobs } from "../slices/auth/userSile";

export const useRefreshJobs = () => {
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();

    const { refetch, ...queryRest } = useQuery(GET_USER_JOBS, {
        variables: { username: user?.username },
        skip: !user?.username,
        onCompleted: (data) => {
            if (data?.user?.jobs) {
                dispatch(setJobs(data.user.jobs));
            }
        },
    });

    // Return a function you can call manually
    const refetchJobs = async () => {
        const { data } = await refetch();
        if (data?.user?.jobs) {
            dispatch(setJobs(data.user.jobs));
        }
    };

    return { ...queryRest, refetchJobs };
};
