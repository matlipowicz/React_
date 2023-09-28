import React from "react";
import "./App.css";
import "./index.css";

import { Article, Brand, Card, CTA, Feature, Navbar } from "./components/export_components";
import { Blog, Features, Footer, GPT_3, Header, Possibility } from "./containers/export_containers";

const App = () => {
    return (
        <div className="App padding-space">
            <div className="gradient__bg">
                <Navbar />
                <Header />
            </div>
            <Brand />
            <GPT_3 />
            <Features />
            <Possibility />
            <CTA />
            <Blog />
            <Footer />
        </div>
    );
};

export default App;
