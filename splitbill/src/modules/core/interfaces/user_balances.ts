interface IUserBalance {
	owes_users: {
		[userId: string]: number;
	};
}

interface IBalances {
	userBalances: {
		[userId: string]: IUserBalance;
	};
}

export type { IUserBalance, IBalances };
