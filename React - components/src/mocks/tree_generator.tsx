export interface NestedExplorerNode {
    file?: string;
    subFiles?: object[];
}
export interface ExplorerNode {
    node: [{ file?: string; subFiles?: Array<NestedExplorerNode> }];
}

export const files = [
    {
        file: "documents",
        subFiles: [
            {
                file: "27-10-1990",
            },
            {
                file: "invoices",
                subFiles: [
                    {
                        file: "electricityBills",
                        subFiles: [{ file: "invoice1" }, { file: "invoice2" }],
                    },
                    { file: "invoice12" },
                ],
            },
        ],
    },
    {
        file: "photos",
        subFiles: [
            {
                file: "summer2020",
                subFiles: [{ file: "10.25" }, { file: "10.26" }, { file: "10.27" }],
            },
        ],
    },
];
