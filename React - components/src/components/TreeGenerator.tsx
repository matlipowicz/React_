import { useState } from "react";
import { ExplorerNode } from "../mocks/tree_generator";
import { AiFillFolder } from "react-icons/ai";
import styles from "../Tree.module.css";

export const Tree: React.FC<ExplorerNode> = ({ node }) => {
    const [expand, setExpand] = useState(-1);
    const expanding = (idx: number) => {
        expand === idx ? setExpand(-1) : setExpand(idx);
    };

    //! Explorer z rekurencją

    return (
        <div className={styles.tree__list}>
            {/*//? Nie wiem jaki typ dać na parametr "parent" */}
            {Object.values(node).map((parent: any, key: number) => {
                return (
                    <div className={parent.file} key={key}>
                        <AiFillFolder />
                        {/* Sprawdzam czy jest subFiles jeżeli tak to tworzy mi button, jeżeli nie to nie tworzy */}
                        {parent.subFiles && <button onClick={() => expanding(key)}>{parent.file}</button>}
                        {/* Jeżeli nie ma subFiles to ma stworzyć spana */}
                        {!parent.subFiles && <span>{parent.file}</span>}

                        <div>{expand === key && parent.subFiles && <Tree node={parent.subFiles} />}</div>
                    </div>
                );
            })}
        </div>
    );

    //! Explorer bez rekurencji
    // return (
    //     <div className={styles.tree__list}>
    //         {node.map((parent: any, key: number) => {
    //             return (
    //                 <div key={key} className={parent.file}>
    //                     <AiFillFolder />
    //                     <span>{parent.file}</span>
    //                     {parent.subFiles.map((child: any, key: number) => {
    //                         return (
    //                             <div key={key} className={child.file}>
    //                                 <AiFillFolder />
    //                                 <span>{child.file}</span>
    //                                 {child.subFiles &&
    //                                     child.subFiles.map((subChild: any, key: number) => {
    //                                         return (
    //                                             <div key={key} className={subChild.file}>
    //                                                 <AiFillFolder />
    //                                                 <span>{subChild.file}</span>
    //                                                 {subChild.subFiles &&
    //                                                     subChild.subFiles.map((underChild: any, key: number) => {
    //                                                         return (
    //                                                             <div key={key} className={underChild.file}>
    //                                                                 <AiFillFolder />
    //                                                                 <span>{underChild.file}</span>
    //                                                             </div>
    //                                                         );
    //                                                     })}
    //                                             </div>
    //                                         );
    //                                     })}
    //                             </div>
    //                         );
    //                     })}
    //                 </div>
    //             );
    //         })}
    //     </div>
    // );
};
