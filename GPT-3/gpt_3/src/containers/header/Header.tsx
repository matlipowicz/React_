import "./header.css";
import logo from "../../graphics/ai.png";

const Header = () => {
    return (
        <>
            <section className="gpt3__header">
                <div className="gpt3__header-left">
                    <h1 className="gpt3__header-left--heading">Let’s Build Something amazing with GPT-3 OpenAI</h1>
                    <p className="gpt3__header-left--paragraph">
                        Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy
                        alteration boisterous the attachment. Party we years to order allow asked of.
                    </p>
                    <form action="#" className="gpt3__header-left--form">
                        <input type="text" className="gpt3__header-left--input" placeholder="Your Emial Address" />
                        <button type="submit" className="gpt3__header-left--btn">
                            Get Started
                        </button>
                    </form>
                    <div className="gpt3__header-left--users">
                        <picture className="gpt3__header-left--people">
                            <img src={require("../../graphics/people.png")} alt="users-img" className="gpt3__header-left--img" />
                        </picture>
                        <p className="gpt3__header-left--quantity">1,600 people requested access a visit in last 24 hours</p>
                    </div>
                </div>
                <div className="gpt3__header-right">
                    <img src={logo} alt="ai-image" className="gpt3__header-right--img" />
                </div>
            </section>
            ;
        </>
    );
};

export default Header;
