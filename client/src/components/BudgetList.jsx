import React, { useState, useEffect} from 'react'
import Budget from './Budget';
import BudgetForm from './BudgetForm'
import '../App.css'


function BudgetList({ user, trans, budgets, getBudgets }){

    useEffect(() => {
        if(user) {
            getBudgets();
        }
    }, [trans])

    
    const onFormSubmit = (values) => {
        console.log(values)
        fetch('/api/budget', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...values, user_id: user.id})
        })
            .then(resp => {
                if(resp.ok){
                    getBudgets()
                }
            })
    }

    const budgetList = budgets.map((budget) => {
        return <Budget key = {budget.id} budget={budget} totalIncome={user.income}/>
    })

    return (
        <div className='container'>
            {user ? (
                <>
                    <h3>Budget List</h3>
                    <BudgetForm onFormSubmit={onFormSubmit} getBudgets={getBudgets}/>
                    {budgetList}
                </>
                
                

            ) : (
                <h3>Please login to continue</h3>
            )}
        </div>
    )
}

export default BudgetList