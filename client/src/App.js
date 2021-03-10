import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { web3Loading } from './store/Slice';
import { AddTransction } from './components/AddTransction'
import { Balance } from './components/Balance';
import { AllTransactions } from './components/AllTransactions';


function App() {
  const dispatch = useDispatch()

  const web3 = useSelector(state => {
    console.log('getting state in app:', state)
    return state.SliceReducer.web3
  })

  useEffect(() => {
    dispatch(web3Loading())
  }, [])
  return (
      <div>
        <div className="container">
          <Balance />
          <AddTransction />
          <AllTransactions />
        </div>
      </div>
  );
}

export default App;
