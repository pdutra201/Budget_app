
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
        console.log(values)
        fetch("/api/transactions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...values, user_id: user.id })
        })
            .then(resp => {
                if (resp.ok) {
                    getTransactions();
                }
            })
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
                    <h3>Please log in</h3>
                </div>
            )}
            
            </div>
    );
}

export default Transactions;



