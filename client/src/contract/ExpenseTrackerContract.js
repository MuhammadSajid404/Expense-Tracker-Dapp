export const EXPENSE_TRACKER_ADDRESS = "0x385a146a6cEf38E4f469949217deEB76c5d4668a";

export const EXPENSE_TRACKER_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "int64",
				"name": "amount",
				"type": "int64"
			}
		],
		"name": "addTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "balance",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHello",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transaction",
		"outputs": [
			{
				"internalType": "address",
				"name": "transactionOwner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "transactionDescription",
				"type": "string"
			},
			{
				"internalType": "int64",
				"name": "amount",
				"type": "int64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "transactionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]