import React, { useState, useEffect, useContext} from 'react'
import { UserContext } from '../context/UserContext'


function Budget({budget, totalIncome }){

    const { getBudgets, user} = useContext(UserContext)
    
    //create state variables
    const [transactions, setTransactions] = useState([])
    const [allowance, setAllowance] = useState((budget.percentage/100)*user.income)
    const [showTransactions, setShowTransactions] = useState(false)


    //GET request for transactions associated to a budget id and calculate allowance | runs when budget or totalincome states are changed
    useEffect(() => {
        if(budget){
            fetch(`/api/budget/${budget.id}/transactions`)
            .then(resp => resp.json())
            .then(data => {
                if(data){
                    setTransactions(data)
                    const totalSpent = data.reduce((total, transaction) => total + transaction.amount, 0)
                    setAllowance( (budget.percentage/100)*user.income - totalSpent)
                }
            })
        }
}, [])


   

    //map transactions to appear on client page
    const transactionItems = transactions.map((transaction) => {
        return <li key={transaction.id}>{transaction.description}: ${transaction.amount}</li>
    })

    //toggle to determine if transactions are visible or not
    const toggleTransactions = () => {
        setShowTransactions(!showTransactions)
    }

    const handleDelete = () => {
        fetch(`/api/budget/${budget.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(() => { getBudgets()}
        )
    }

    
        if(!budget || !budget.category){
            return <div>Loading...</div>
        }
        return (
        <div>
            <h5>Category: {budget.category.name}</h5>
            
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ marginRight: '10px' }}>Percentage: {budget.percentage}%</div>
                <div>Allowance Remaining: ${allowance}</div>
            
            </div><br/>
            <p style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }} onClick={toggleTransactions}>{showTransactions ? 'hide' : 'show'} transactions</p>
            <div>
                {showTransactions && (
                    <div>
                        <h6>Transactions:</h6>
                        <ul>{transactionItems}</ul>
                    </div>
                )}
                <button onClick={handleDelete}>Delete</button>
            </div>
            <div style={{ borderBottom: '2px solid #000', marginBottom: '20px' }}></div>
        </div >
        
    )
}

export default Budget