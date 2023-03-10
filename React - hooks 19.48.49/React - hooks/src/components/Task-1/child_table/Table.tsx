import React from "react";
import { useState } from "react";
import "./Table.modules.css";
import { Children } from "../bus-table_list";

export const Table = ({ kids }: Children) => {
    return (
        <>
            <div className="table">
                <p>Name</p>
                <p>Age</p>
                {kids.map((el, index) => {
                    return (
                        <div key={index}>
                            <div className="table__name-column">
                                <p className="table__name-column--paragraph">{el.name}</p>
                            </div>
                            <div className="table__age-column">
                                <p className="table__age-column--paragraph">{el.age}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
