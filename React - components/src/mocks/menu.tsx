import React from "react";
import { BsFillPeopleFill, BsFillBagCheckFill, BsFillFileEarmarkRuledFill, BsFillHddRackFill } from "react-icons/bs";

export const menuData = [
    {
        linkName: "Clients",
        link: "/clients",
        icon: <BsFillPeopleFill />,
    },
    {
        linkName: "Orders",
        link: "/orders",
        icon: <BsFillBagCheckFill />,
    },
    {
        linkName: "Facture",
        link: "/invoices",
        icon: <BsFillFileEarmarkRuledFill />,
    },
    {
        linkName: "Posts",
        link: "/posts",
        icon: <BsFillHddRackFill />,
    },
];
