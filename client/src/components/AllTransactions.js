import React from 'react'
import { useSelector } from 'react-redux';

export const AllTransactions = () => {
    const transactions  = useSelector(state => state.SliceReducer.transactions);
    
    return (
        <>
        <h3>History</h3>
        <ul  className="list">
            {transactions.map( ({id,text,amount}) => (
                <li  key={id} className={` money ${(amount < 0)? 'minus':'plus'} `}>
                   <span> {text} </span>
                   <span> $ {amount} </span>
                </li>
            ))}
        </ul>
        </>
    )
}

{/* <ul className="list">
        {transactions.map((transaction,index) => (<Transaction key={index} transaction={transaction} />))}
      </ul> */}