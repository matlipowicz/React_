import { BsFillPeopleFill, BsFillBagCheckFill, BsFillFileEarmarkRuledFill, BsFillHddRackFill, BsPersonFillAdd } from "react-icons/bs";

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
        linkName: "Invoices",
        link: "/invoices",
        icon: <BsFillFileEarmarkRuledFill />,
    },
    {
        linkName: "Posts",
        link: "/posts",
        icon: <BsFillHddRackFill />,
    },
];
