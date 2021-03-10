import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Web3 from 'web3'
import { EXPENSE_TRACKER_ABI, EXPENSE_TRACKER_ADDRESS } from '../contract/ExpenseTrackerContract';

export const web3Loading = createAsyncThunk(
    'Web3Loading',
    async() => {
        try {
            if (Web3.givenProvider) {
                const web3 = new Web3(Web3.givenProvider)
                await Web3.givenProvider.enable();

                const contract = new web3.eth.Contract(EXPENSE_TRACKER_ABI, EXPENSE_TRACKER_ADDRESS)
                console.log('contract in web3loading: ', contract)

                const accounts = await web3.eth.getAccounts()
                console.log('accounts in web3loading: ', accounts)
                console.log('contract methods: ', contract.methods)

                let transactionCount = await contract.methods.transactionCount().call();
                console.log("transaction count = ", transactionCount);

                let transactions = []
                for (var i = 0; i < transactionCount; i++) {
                    const { amount, transactionDescription, transactionOwner } = await contract.methods.transaction(i).call();
                    // console.log('transaction obj: ', amount, transactionDescription, transactionOwner)

                    let transaction = {
                        id: i,
                        amount: parseInt(amount),
                        text: transactionDescription,
                        transactionOwner
                    }
                    transactions.push(transaction)
                }
                return {
                    web3: web3,
                    contract: contract,
                    accounts: accounts,
                    transactions: transactions
                }
            }
            else {
                console.log('Error In Loading Web3')
            }
        } catch (error) {
            console.log('Error In Loading', error)
        }
    }
)

export const AddTransactionAsync = createAsyncThunk(
    'AddTransaction',
    async(transaction, thunkAPI) => {
        console.log('getting state by thunkapi in add trx: ', thunkAPI.getState())
        console.log('getting transaction in add trx: ', transaction)

        const state = thunkAPI.getState().SliceReducer
        const contract = state.contract
        const accounts = state.accounts

        console.log('transaction after getting state: ', transaction)
        const receipt = await contract.methods.addTransaction(transaction.text, transaction.amount).send({from: accounts[0]})

        console.log('receipt: ', receipt)
        return transaction
    }
)
export const Slice = createSlice({
    name: 'expenseSlice',
    initialState: {
        
        web3: null,
        contract: null,
        accounts: null,
        transactions: [],
        loadingWeb3Error: '',
        loadedWeb3: false,
        transactionProgress: false,
        trxErrorMessage: ''
    },
    reducers: {},
    extraReducers: {
        [web3Loading.fulfilled]: (state, action) => {
            console.log("In fullfil = ", state);
            console.log("In fullfil = ", action);
            state.web3 = action.payload.web3;
            state.contract = action.payload.contract;
            state.accounts = action.payload.accounts;
            state.transactions = action.payload.transactions;
        },
        [AddTransactionAsync.pending]: (state) => {
            console.log('transaction in pending')
            state.transactionProgress = true
        },
        [AddTransactionAsync.fulfilled]: (state, action) => {
            state.transactions.push(action.payload)
            console.log('fulfilled: transaction state: ', state)
            console.log('fulfilled: transaction action: ', action)
            state.transactionProgress = false
        },
        [AddTransactionAsync.rejected]: (state, action) => {
            console.log('transaction rejected state: ', state)
            console.log('transaction rejected action: ', action)
            state.transactionProgress = false
            state.trxErrorMessage = action.error.message
        }
    }
})

export const {} = Slice.actions
export const SliceReducer = Slice.reducer
