import { atlassian, dropbox, google, shopify, slack } from "../../graphics/imports";
import "./brand.css";

const Brand = () => {
    return (
        <div className="gpt3__brand">
            <img src={google} alt="google-logo" className="gpt3__brand--logo" />
            <img src={slack} alt="slack-logo" className="gpt3__brand--logo" />
            <img src={atlassian} alt="atlassian-logo" className="gpt3__brand--logo" />
            <img src={dropbox} alt="dropbox-logo" className="gpt3__brand--logo" />
            <img src={shopify} alt="shopify-logo" className="gpt3__brand--logo" />
        </div>
    );
};

export default Brand;
