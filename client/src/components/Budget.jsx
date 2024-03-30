import React, { useState, useEffect} from 'react'
import { useFormik } from 'formik'

function Budget({budget, totalIncome}){
    
    
    const [transactions, setTransactions] = useState([])
    const [allowance, setAllowance] = useState((budget.percentage/100)*totalIncome)
    const [showTransactions, setShowTransactions] = useState([false])


    useEffect (() => {
        fetch(`/api/budget/${budget.id}/transactions`)
            .then(resp => resp.json())
            .then(data => {
                setTransactions(data)
                console.log(data)
                const totalSpent = data.reduce((total, transaction) => total + transaction.amount, 0)
                setAllowance( (budget.percentage/100)*totalIncome - totalSpent)
            })
    }, [budget, totalIncome])

    const cats = budget.categories.map((cat) => {
        return <li key={cat.id}>{cat.name}</li>
    })

    const transactionItems = transactions.map((transaction) => {
        return <li key={transaction.id}>{transaction.description}: ${transaction.amount}</li>
    })

    const toggleTransactions = () => {
        setShowTransactions(!showTransactions)
    }

    return (
        <div>
            <h5>Budget ID: {budget.id}</h5>
            <>{cats}</>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ marginRight: '10px' }}>Percentage: {budget.percentage}%</div>
                <div>Allowance Remaining: {allowance}</div>
            
            </div><br/>
            <p style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }} onClick={toggleTransactions}>{showTransactions ? 'hide' : 'show'} transactions</p>
            <div>
                {showTransactions && (
                    <div>
                        <h6>Transactions:</h6>
                        <ul>{transactionItems}</ul>
                    </div>
                )}
            </div>
            <div style={{ borderBottom: '2px solid #000', marginBottom: '20px' }}></div>
        </div >
        
    )
}

export default Budget