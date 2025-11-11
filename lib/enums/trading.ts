
export const TradingType = {
  Buy: 'buy',
  Sell: 'sell',
};

export const TransactionType = {
  Bonus: 'Bonus',
  Swap: 'Swap',
  Deposit: 'Deposit',
  Withdraw: 'Withdraw',
  Sell: "Sell",
  Buy: "Buy",
}

export const OrderStatus = {
  Processing: 'PROCESSING',
  Pending: 'PENDING',
  Failed: 'FAILED',
  Completed: 'COMPLETED',
  Expired: 'EXPIRED',
  Confirmed: 'CONFIRMED',
};

export const OrderStatusByStep = {
  Processing: 3,
  Confirmed: 2,
  Completed: 5,
  Pending: 2,
  Expired: 1,
  Failed: 1,
};

export const KYCStatus = {
  None: 'None',
  Loading: 'Loading',
  Processing: 'Processing',
  Submitted: 'Submitted',
  Verified: 'Verified',
  Rejected: 'Rejected',
};

export const KYCStatusStyles = new Map<string, any>([
  [
    KYCStatus.Verified,
    {
      textColor: 'text-success-700',
      bgColor: 'bg-green-100/60',
    },
  ],
  [
    KYCStatus.Rejected,
    {
      textColor: 'text-danger-500',
      bgColor: 'bg-danger-100',
    },
  ],
  [
    KYCStatus.Processing,
    {
      textColor: 'text-orange-500',
      bgColor: 'bg-orange-100',
    },
  ],
  [
    KYCStatus.Loading,
    {
      textColor: 'text-gray-500',
      bgColor: 'bg-gray-100',
    },
  ],
  [
    KYCStatus.Submitted,
    {
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
  ],
  [
    KYCStatus.None,
    {
      textColor: 'text-orange-600',
      bgColor: 'bg-transparent',
    },
  ],
]);

export type IOrderType = typeof TradingType.Buy | typeof TradingType.Sell;

export const TaskStatus = {
  Init: "Init",
  Started: "Started",
  ReadyToClaim: "ReadyToClaim", 
  Finished: "Finished",
  Check: "Check",
};

export const TaskType = {
  Social: "Social",
  CHECKIN: "Checkin",
};

export const CheckinStatus = {
  Finished: "Finished",
  Init: "Init",
}

export const Google2FAStatus = {
  Active: "Active",
  Inactive: "Inactive",
}

export const BalanceType = {
  Balance: "Balance",
  Estimate: "Estimate",
  FreeBalance: "FreeBalance",
}