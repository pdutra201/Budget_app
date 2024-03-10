import React,  { useState, useEffect} from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'


function Transactions({ user }) {
    const [trans, setTrans] = useState([])

    const getTransactions = () => {
        fetch("/api/transactions")
                .then(resp => {
                    if(!resp.ok){
                        throw new Error('Failed to fetch transactions')
                    }
                    return resp.json()
                })
                .then(data => {
                    setTrans(data)
                })
    }

    useEffect(() => {
        if ( user ){
            
            getTransactions()

            }
        }, []) 

    if(user){
        const formik = useFormik({
            initialValues:  {
                amount: "",
                description: "",
                date: new Date(),
                user_id: user.id,
    
            }
        })

        const handleDelete = (trans_id) => {
            fetch(`/api/transactions/${trans_id}`, {
                method: 'DELETE'
            })
            .then(resp => {
                if(resp.ok){
                    getTransactions()
                }
            })
            
        }

        const handleEdit = () => {

        }


        return (
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <h3>Add New Transaction</h3><br/>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <div className="form-group" style={{ marginRight: '10px' }}>
                        <label>Amount </label><br/>
                        <input
                            type = "float"
                            id = "amount"
                            placeholder="0.00"
                            className="input-field"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                        />
                        </div><br/>
                        <div className="form-group" style={{ marginRight: '10px' }}>
                        <label>Description </label><br/>
                        <input
                            type = "text"
                            id = "description"
                            placeholder=""
                            className="input-field"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        </div>
                        <br/>
                        <div className="form-group" style={{ marginRight: '10px' }}>
                        <label>Date </label><br/>
                        <DatePicker
                        id="date"
                        className="datepicker"
                        selected={formik.values.date}
                        onChange={(date) => formik.setFieldValue("date", date)}
                        />
                        </div>
                        
                        <br />
                        <button type="submit">Submit</button>
                    </div>

                </form>
            <br/>
            <h2 style={{fontWeight: 'bold', color:'black'}}>Transactions</h2>
            <ul>
              {trans.map((transaction) => (
                <li key={transaction.id}>
                <strong>Description:</strong> {transaction.description}<br />
                <strong>Price:</strong> {transaction.amount}<br />
                <strong>Date:</strong> {transaction.date}<br />
                <button style={{background:'orange', color:'white'}}onClick={handleEdit}>Edit</button>
                <button style={{background: 'Red', color: 'white'}}onClick={() => {
                    
                    handleDelete(transaction.id)}}>Delete</button>
              <br/>
              </li>
              ))}
            </ul>
          </div>)
    }
    else {
        return <p>Please log in to continue</p>
    }
}

export default Transactions