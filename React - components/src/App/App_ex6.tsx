import { useState } from "react";
import { useCallback } from "react";
import reactLogo from "./assets/react.svg";
import style from "./App.module.css";
import { Tree } from "../components/TreeGenerator";
import { files } from "../mocks/tree_generator";

function AppSix() {
    return (
        <>
            {/* //? Nie wiem jak się pozbyć tego, rozumiem że nie czyta sobie tych wałaściwości */}
            {/* @ts-ignore */}
            <Tree node={files} />
        </>
    );
}

export default AppSix;
