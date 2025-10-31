import { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";
import { Activity } from "lucide-react";

interface Transaction {
  id: string;
  from: string;
  amount: number;
  timestamp: Date;
  hash: string;
}

interface TransactionFeedProps {
  threshold: number;
}

const TransactionFeed = ({ threshold }: TransactionFeedProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Simulate real-time transactions
  useEffect(() => {
    const generateTransaction = (): Transaction => {
      const amount = threshold + Math.random() * threshold * 2;
      return {
        id: Math.random().toString(36).substr(2, 9),
        from: `0x${Math.random().toString(16).substr(2, 40)}`,
        amount: parseFloat(amount.toFixed(4)),
        timestamp: new Date(),
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      };
    };

    // Add initial transactions
    const initial = Array.from({ length: 5 }, generateTransaction);
    setTransactions(initial.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));

    // Simulate new transactions
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        const newTx = generateTransaction();
        setTransactions((prev) => [newTx, ...prev].slice(0, 20));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [threshold]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Activity className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Live Transactions</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm">Monitoring</span>
        </div>
      </div>
      
      {transactions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Waiting for transactions above {threshold} ETH...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <TransactionCard key={tx.id} transaction={tx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionFeed;
