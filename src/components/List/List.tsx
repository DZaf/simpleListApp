
import styles from "./List.module.scss";
import { useAppSelector } from "../../hooks/useAuth";
import JobForm from "../forms/job/JobForm";

const List: React.FC = () => {
    const user = useAppSelector((state) => state.user.user);


    return (
        <div className={styles.listContainer}>

            <JobForm />
            {user && user.jobs.map((job) => (
                <li className={styles.job} key={job.title}>
                    <strong>{job.title}</strong>: {job.description} (ends {job.endDate})
                </li>
            ))}
        </div>
    );
}

export default List;

