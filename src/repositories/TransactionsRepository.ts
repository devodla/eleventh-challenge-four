import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionsFormated {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsFormated {
    const transactionsFormated = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return transactionsFormated;
  }

  public getBalance(): Balance {
    const incomeData = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcomeData = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const incomeSum = incomeData.reduce(
      (sum: number, data: Transaction) => sum + data.value,
      0,
    );

    const outcomeSum = outcomeData.reduce(
      (sum: number, data: Transaction) => sum + data.value,
      0,
    );

    return {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
