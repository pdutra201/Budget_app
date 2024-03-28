
import { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import EditableTransaction from "./EditableTransaction";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'

function Transactions({ user, getTransactions, trans, setTrans }) {
    
    const [editId, setEditId] = useState(null);

    

    useEffect(() => {
        if (user) {
            getTransactions();
        }
    }, [user]);

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

    const handleEdit = (transaction_id) => {
        setEditId(transaction_id);
    }

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
                                    <EditableTransaction
                                        transaction={transaction}
                                        onUpdate={handleUpdate}
                                        onCancel={handleCancelEdit}
                                    />
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



