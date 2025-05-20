import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAuth";
import { addJob } from "../../../slices/auth/userSile";
import { Job } from "../../../types/job.types";
import Input from "../../Input/Input";
import styles from "./JobForm.module.scss";
import { useMutation } from "@apollo/client";
import { ADDJOB } from "../../../graphql/job.graphql";
import { useRefreshJobs } from "../../../Utils/refreshListUtil";

const JobForm = () => {
    const dispatch = useAppDispatch();
    const { refetchJobs } = useRefreshJobs();

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    const [addJobMutation] = useMutation(ADDJOB);


    const handleAddJob = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (titleRef.current && descriptionRef.current && endDateRef.current) {
            const newJob: Job = {
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                endDate: endDateRef.current.value,
            };

            const response = await addJobMutation({
                variables: { job: newJob },
            });

            console.log("Response from addJob:", response);

            refetchJobs();

            // Clear fields if needed
            titleRef.current.value = "";
            descriptionRef.current.value = "";
            endDateRef.current.value = "";
        }
    };

    return (
        <div className={styles.inputContainer}>
            <Input name="Title" placeholder="Title" ref={titleRef} />
            <Input name="Description" placeholder="Description" ref={descriptionRef} />
            <Input name="EndDate" placeholder="End Date" type="date" ref={endDateRef} />
            <button type="button" onClick={handleAddJob}>Add</button>
        </div>
    );
};

export default JobForm;
