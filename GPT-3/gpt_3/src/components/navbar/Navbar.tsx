import React from "react";
import { useState } from "react";
import { Menu } from "./Menu";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import "./navbar.css";
import logo from "../../graphics/logo.svg";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <section className="gpt3__navbar-container section__padding-space">
                <p className="gpt3__navbar-logo">
                    <img className="gpt3__logo" src={logo} alt="logo" />
                </p>
                <nav className="gpt3__navbar">
                    <ul className="gpt3__navbar-ul">
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
                    </ul>
                </nav>
                <div className="gpt3__sign-buttons gpt3__sign-menu-buttons">
                    <button className="gpt3__sign-in">Sign In</button>
                    <button className="gpt3__sign-up">Sign Up</button>
                </div>
                <div className="gpt3__menu">
                    {toggle ? (
                        <RiCloseLine color="#fff" size={27} onClick={() => setToggle(false)} />
                    ) : (
                        <RiMenu3Line color="#fff" size={27} onClick={() => setToggle(true)} />
                    )}
                    {toggle && <Menu />}
                </div>
            </section>
        </>
    );
};

export default Navbar;
