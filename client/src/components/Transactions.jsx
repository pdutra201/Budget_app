import React,  { useState, useEffect} from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Transactions({ user }) {

    if ( user ){

        const formik = useFormik({
            initialValues:  {
                amount: "",
                description: "",
                date: new Date(),
                user_id: user.id,
    
            }
        })


        return (
            <div className="container"> 
            <form onSubmit={formik.handleSubmit}>
                <h3>Add Transaction</h3><br/>
                <div className="form-group">
                <label>Amount</label>
                <input
                    type = "float"
                    id = "amount"
                    placeholder="0.00"
                    className="input-field"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                />
                </div><br/>
                <div className="form-group">
                <label>Description</label>
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
                <div className="form-group">
                <label>Date</label>
                <DatePicker
                id="date"
                className="datepicker"
                selected={formik.values.date}
                onChange={(date) => formik.setFieldValue("date", date)}
                />
                </div>
                
                <br />
                <button type="submit">Submit</button>
            

            </form><br/>
            <h2>Transactions</h2>
            <ul>
              {user.transactions.map((transaction) => (
                <li key={transaction.id}>
                  <strong>Description:</strong> {transaction.description}<br />
                  <strong>Price:</strong> {transaction.amount}<br />
                  <strong>Date:</strong> {transaction.date}<br />
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