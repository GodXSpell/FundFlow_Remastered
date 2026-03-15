import { Transaction } from "@/app/dashboard/transactions/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    AlertCircleIcon,
    BanknoteIcon,
    CalendarIcon,
    CreditCardIcon,
    LandmarkIcon,
    MapPinIcon,
    SmartphoneIcon,
    TagIcon,
    UserIcon
} from "lucide-react";

interface TransactionDetailsProps {
    transaction: Transaction | null;
}

export function TransactionDetails({ transaction }: TransactionDetailsProps) {
    if (!transaction) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground p-8">
                <div className="text-center">
                    <p>Select a transaction to view details</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full space-y-6">
            {/* Header Section */}
            <div className="flex flex-col items-center gap-4 py-6 border-b border-border/50">
                <Avatar className="h-20 w-20 border-4 border-muted/20 shadow-xl">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${transaction.name}`} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                        {transaction.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="text-center space-y-1">
                    <h2 className="text-xl font-bold tracking-tight">{transaction.name}</h2>
                    <p className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
                        {transaction.date}
                        <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                        <span className={transaction.status === "Done" ? "text-green-500" : "text-yellow-500"}>
                            {transaction.status}
                        </span>
                    </p>
                </div>
                <div className="text-3xl font-bold tracking-tighter">
                    {transaction.amount > 0 ? "+" : ""}
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(transaction.amount)}
                </div>
            </div>

            {/* Details Section - Sidebar Style */}
            <div className="space-y-6 px-1">
                <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Transaction Info</h3>

                    <DetailItem icon={TagIcon} label="Category" value={transaction.category} />
                    <DetailItem icon={LandmarkIcon} label="Account" value={transaction.account} />
                    <DetailItem icon={CreditCardIcon} label="Mode" value={transaction.mode} />
                    <DetailItem icon={BanknoteIcon} label="Type" value={transaction.type} />
                </div>

                {transaction.description && (
                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Description</h3>
                        <div className="px-2 py-2 text-sm text-foreground/80 leading-relaxed bg-muted/20 rounded-md">
                            {transaction.description}
                        </div>
                    </div>
                )}

                {transaction.lentBorrowed && (
                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Lent / Borrowed</h3>
                        <DetailItem icon={UserIcon} label="To / From" value={transaction.lentBorrowed.toFrom} />
                        <DetailItem icon={CalendarIcon} label="Settled On" value={transaction.lentBorrowed.settledOn} />
                        <DetailItem icon={AlertCircleIcon} label="Due Date" value={transaction.lentBorrowed.dueDate} />
                        <DetailItem icon={SmartphoneIcon} label="Mobile" value={transaction.lentBorrowed.mobile} />
                        <DetailItem icon={MapPinIcon} label="Address" value={transaction.lentBorrowed.address} />
                    </div>
                )}
            </div>
        </div>
    );
}

function DetailItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    if (!value || value === "N/A") return null;

    return (
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors group">
            <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
            </div>
            <div className="text-sm font-medium text-foreground">
                {value}
            </div>
        </div>
    )
}
