export type TransactionStatus = "Pending" | "Done" | "Failed";

export interface Transaction {
    id: string;
    name: string;
    date: string;
    amount: number;
    type: "Incoming" | "Outgoing";
    account: string;
    accountIcon?: string; // URL or name for icon handling
    category: string;
    categoryIcon?: string;
    mode: "Google Pay" | "Paytm" | "PhonePe" | "Bank Transfer" | "Card";
    modeIcon?: string;
    status: TransactionStatus;
    description?: string;
    lentBorrowed?: {
        toFrom: string;
        settledOn: string;
        dueDate: string;
        mobile: string;
        address: string;
    };
}

export const transactions: Transaction[] = [
    {
        id: "1",
        name: "TestUser",
        date: "0:05 Dec 21",
        amount: 129000.00,
        type: "Incoming",
        account: "Axis Bank",
        category: "Shopping",
        mode: "Google Pay",
        status: "Pending",
        description: "Specific details about this transaction.",
    },
    {
        id: "2",
        name: "twinkle",
        date: "0:05 Dec 21",
        amount: 6870.00,
        type: "Incoming",
        account: "Union Bank of India",
        category: "Trips",
        mode: "Paytm",
        status: "Failed",
        description: "Trip reimbursement.",
    },
    {
        id: "3",
        name: "Tarunpreet Singh",
        date: "0:04 Dec 21",
        amount: 12000.00,
        type: "Incoming",
        account: "State Bank of India",
        category: "Food",
        mode: "PhonePe",
        status: "Done",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        lentBorrowed: {
            toFrom: "N/A",
            settledOn: "Not Yet",
            dueDate: "N/A",
            mobile: "N/A",
            address: "N/A",
        }
    },
    // Add more mock data to match the "1-9 of 18 transactions" count if desired
];
