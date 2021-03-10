import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTransactionAsync } from '../store/Slice'
import Loader from '../images/loader.gif'

export const AddTransction = () => {
    const dispatch = useDispatch()

    const [text,setText] = useState('');
    const [amount,setAmount] = useState(0);
    const [loader,setLoader] = useState(false);
    const [error,setError] = useState(false);

    const trxProgress = useSelector((state) => {
        return state.SliceReducer.transactionProgress
    })
    function getRandomId(){
        return Math.round((Math.random()*100000)+1);
    }

    function onSubmit(e){
        e.preventDefault();
        
        if(text === '' || amount === '0'){
            setError('Nothing added');
            return false;
        }

        const newTransaction = {
            id: getRandomId(),
            text: text,
            amount: +amount
        }
        setLoader(true);
        //calling async function
        dispatch(AddTransactionAsync(newTransaction));
        setText('');
        setAmount(0);
        setError('');
        setLoader(false);
    }

    return (
        <div>
            <h3>Add new transaction</h3>
        <form onSubmit = {onSubmit}>
            <div className="form-control">
                <label >Text</label>
                <input type="text" onChange={(e)=>setText(e.target.value)} value={text}  />
            </div>
            <div className="form-control">
                <label 
                    >Amount <br />
                    (negative - expense, positive - income)</label
                >
                <input 
                    type="number" 
                    style= {{
                        backgroundColor: (error?'red':'white')
                    }}
                    
                    onChange={(e)=>setAmount(e.target.value)}  value={amount} 
                />
            </div>
            {!loader && <button className="btn">Add transaction</button>}
            {/* {loader && <img src={Loader} alt="Loading"></img>} */}
            {
                trxProgress ?
                <div>
                    <img alt="progress" src={Loader} style={{ width: '50px' }} />
                </div> : null
            }
            
        </form>
        </div>
    )
}
