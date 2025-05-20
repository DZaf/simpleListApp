import { useRef } from "react";
import { useAppDispatch } from "../../../hooks/useAuth";
import { addJob } from "../../../slices/auth/userSile";
import { Job } from "../../../types/job.types";
import Input from "../../Input/Input";
import styles from "./JobForm.module.scss";

const JobForm = () => {

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();


    function handleAddJob(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        if (titleRef.current && descriptionRef.current && endDateRef.current) {
            const newJob: Job = {
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                endDate: endDateRef.current.value,
            };
            dispatch(addJob(newJob));
        }
    };
    return (
        <div className={styles.inputContainer}>
            <Input
                name="Title"
                placeholder="Title"
                ref={titleRef}
            />
            <Input
                name="Description"
                placeholder="Description"
                ref={descriptionRef}
            />
            <Input
                name="EndDate"
                placeholder="End Date"
                type="date"
                ref={endDateRef}
            />
            <button type="button" onClick={handleAddJob}>Add</button>
        </div>
    );
}

export default JobForm;