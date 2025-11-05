import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Transaction {
  id: string;
  from: string;
  amount: number;
  timestamp: Date;
  hash: string;
}

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  return (
    <Card className="p-5 bg-card border-border hover:shadow-md transition-all duration-300 animate-in slide-in-from-top-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">From</span>
            <code className="text-sm text-foreground font-mono bg-secondary px-2 py-0.5 rounded">{formatAddress(transaction.from)}</code>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{formatTime(transaction.timestamp)}</span>
            <span>•</span>
            <code className="font-mono bg-secondary px-2 py-0.5 rounded">{formatAddress(transaction.hash)}</code>
          </div>
        </div>
        
        <ArrowRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
        
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold text-primary font-mono">
            {formatAmount(transaction.amount)}
          </div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">DOT</div>
        </div>
      </div>
    </Card>
  );
};

export default TransactionCard;
