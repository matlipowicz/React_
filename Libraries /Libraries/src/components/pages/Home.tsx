import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
const Home = () => {
    return (
        <Link to={"/"} style={{ justifyContent: "left", display: "flex", gap: "10px" }}>
            <div>
                <p>
                    <AiFillHome />
                    Home
                </p>
            </div>
        </Link>
    );
};

export default Home;
