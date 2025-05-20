import List from "../components/List/List";
import { useAppSelector } from "../hooks/useAuth";

const Home: React.FC = () => {
    const user = useAppSelector((state) => state.user.user);



    return (
        <div>
            <List />
        </div>
    );

};
export default Home;