import React, { useState, useEffect} from 'react'
import { useFormik } from 'formik'
import Budget from './Budget';
import '../App.css'


function BudgetList({ user, trans, budgets, getBudgets }){

    useEffect(() => {
        if(user) {
            getBudgets();
        }
    }, [trans])

    
    const formik = useFormik({
        
    })

    const budgetList = budgets.map((budget) => {
        return <Budget key = {budget.id} budget={budget} totalIncome={user.income}/>
    })

    return (
        <div className='container'>
            {user ? (
                <>
                    <h3>Budget List</h3>

                    {budgetList}
                </>
                
                

            ) : (
                <h3>Please login to continue</h3>
            )}
        </div>
    )
}

export default BudgetList