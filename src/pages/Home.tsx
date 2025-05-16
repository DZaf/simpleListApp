import { useAppSelector } from "../hooks/useAuth";

const Home: React.FC = () => {
    const user = useAppSelector((state) => state.user.user);



    return (
        <div>
            <h2>List Page</h2>

            {user && (
                <div>
                    <h3>Welcome, {user.name} {user.surname}</h3>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>

                    <h4>Your Jobs:</h4>
                    <ul>
                        {user.jobs.map((job) => (
                            <li key={job.title}>
                                <strong>{job.title}</strong>: {job.description} (ends {job.endDate})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

};
export default Home;