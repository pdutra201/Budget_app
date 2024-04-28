import React, { useEffect, useContext} from 'react'
import Budget from './Budget';
import BudgetForm from './BudgetForm'
import '../App.css'
import { UserContext } from '../context/UserContext';


function BudgetList(){

    const {user, budgets, getBudgets, getCategories, categories} = useContext(UserContext)
    

    //on page load or on transaction change request budgets from db
    useEffect(() => {
        if(user) {
            getBudgets();
            getCategories();
        }
    }, [])

    

    //POST request to add new budget to db when form submit button is clicked
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

    //map through budget and send data to Budget component
    const budgetList = budgets.map((budget) => {
        return <Budget key = {budget.id} budget={budget} />
    })

    return (
        <div className='container'>
            {user ? (
                <>
                    <h3>Budget List</h3>
                    <BudgetForm onFormSubmit={onFormSubmit} categories={categories}/>
                    <br/>
                    <h2 style={{fontWeight: 'bold', color:'black'}}>Budgets</h2>
                    {budgetList}
                </>
                
                

            ) : (
                <h3>Please login to continue</h3>
            )}
        </div>
    )
}

export default BudgetList