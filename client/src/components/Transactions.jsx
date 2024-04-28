
import { useState, useEffect, useContext } from "react";
import TransactionForm from "./TransactionForm";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'
import { UserContext } from "../context/UserContext";

function Transactions() {
    
    const { user, getTransactions, trans, setUser} = useContext(UserContext)

    //set state to edit or not
    const [editId, setEditId] = useState(null);

    //request transactions on page load and when user changes
    useEffect(() => {
        if (user) {
            getTransactions();
        }
    }, [user]);


    //send POST request to add new transaction then a PATCH request to assign the transaction to a category
    const handleAddTransaction = (values) => {
        
        fetch("/api/transactions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...values})
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
            })
            .then(() => {getTransactions()})
    };
 

    //send DELETE request to delete transaction
    const handleDelete = (trans_id) => {
        fetch(`/api/transactions/${trans_id}`, {
            method: 'DELETE'
        })
            .then(resp => {
                if (resp.ok) {
                    getTransactions()
                }
            })
    }

    //toggles if transaction is editable or not
    const handleEdit = (transaction_id) => {
        setEditId(transaction_id);
    }


    //send PUT request to update transaction values after update
    const handleUpdate = (values) => {
        console.log(values)
        fetch(`/api/transactions/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(resp => {
                if (resp.ok) {
                    getTransactions();
                    setEditId(null);
                }
            })
    }

    //make transaction no longer editable without making changes
    const handleCancelEdit = () => {
        setEditId(null);
    }
    

    return (
        <div>
            {user ? (
                <div className="container">
                    <TransactionForm onSubmit={handleAddTransaction} user={user} setUser={setUser}/>
                    <br/>
                    <h2 style={{fontWeight: 'bold', color:'black'}}>Transactions</h2>
                    <ul>
                        {trans.map((transaction) => (
                            <li key={transaction.id}>
                                {editId == transaction.id ? (
                                    <div>
                                        <TransactionForm
                                        user = {user}
                                        transaction={transaction}
                                        onSubmit={handleUpdate}
                                        setUser={setUser}
                                        

                                    />
                                    <button style={{background: 'Red', color: 'white'}} onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                    
                                ) : (
                                    <>
                                        <strong>Description:</strong> {transaction.description}<br/>
                                        <strong>Price:</strong> {transaction.amount}<br/>
                                        <strong>Date:</strong> {transaction.date}<br/>
                                        <strong>Category: {transaction.budget.category.name}</strong><br/>                            
                                        <button style={{background:'orange', color:'white'}} onClick={() => handleEdit(transaction.id)}>Edit</button>
                                        <button style={{background: 'Red', color: 'white'}} onClick={() => handleDelete(transaction.id)}>Delete</button>
                                    </>
                                )}
                                <br/>
                                <div style={{ borderBottom: '2px solid #000', marginBottom: '20px' }}></div>
                            </li>
                            
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h3>Please login to continue</h3>
                </div>
            )}
            
            </div>
    );
}

export default Transactions;



