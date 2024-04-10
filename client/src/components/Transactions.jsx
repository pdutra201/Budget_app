
import { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import EditableTransaction from "./EditableTransaction";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'

function Transactions({ user, getTransactions, trans }) {
    
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
            body: JSON.stringify({ ...values, user_id: user.id })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
            })
            .then(data => {
                
                const categoryRequests = values.categories.map(category => {
                    (console.log(category))
                    return fetch(`/api/categories/${category}`, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            'trans_id': data.id
                        })
                    })
                    .then(resp => {
                        if (resp.ok) {
                            return resp.json()
                        }
                    });
                });
        
                return Promise.all(categoryRequests);
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
                    <TransactionForm onSubmit={handleAddTransaction} />
                    <br/>
                    <h2 style={{fontWeight: 'bold', color:'black'}}>Transactions</h2>
                    <ul>
                        {trans.map((transaction) => (
                            <li key={transaction.id}>
                                {editId == transaction.id ? (
                                    <div>
                                        <TransactionForm
                                        transaction={transaction}
                                        onSubmit={handleUpdate}
                                        

                                    />
                                    <button style={{background: 'Red', color: 'white'}} onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                    
                                ) : (
                                    <>
                                        <strong>Description:</strong> {transaction.description}<br/>
                                        <strong>Price:</strong> {transaction.amount}<br/>
                                        <strong>Date:</strong> {transaction.date}<br/>
                                        <ul>Categories:
                                            {transaction.categories.map( cat => {
                                                return <li style={{marginLeft:"10px"}} key={cat.id}>{cat.name}</li>
                                            })} 
                                        </ul>                            
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



