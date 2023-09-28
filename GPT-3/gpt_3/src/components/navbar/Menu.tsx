export const Menu = () => {
    return (
        <>
            <div className="gpt3__navbar-menu scale-up-center">
                <li className="gpt3__navbar-li">
                    <a href="#" className="gpt3__navbar-link">
                        Home
                    </a>
                </li>
                <li className="gpt3__navbar-li">
                    <a href="#" className="gpt3__navbar-link">
                        What is GPT-3?
                    </a>{" "}
                </li>
                <li className="gpt3__navbar-li">
                    <a href="#" className="gpt3__navbar-link">
                        Open AI
                    </a>{" "}
                </li>
                <li className="gpt3__navbar-li">
                    <a href="#" className="gpt3__navbar-link">
                        Case Studies
                    </a>{" "}
                </li>
                <li className="gpt3__navbar-li">
                    <a href="#" className="gpt3__navbar-link">
                        Library
                    </a>
                </li>

                <div className="gpt3__sign-menu-buttons">
                    <button className="gpt3__sign-in">Sign In</button>
                    <button className="gpt3__sign-up">Sign Up</button>
                </div>
            </div>
        </>
    );
};
