import { useFormik } from "formik";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TransactionForm({ onSubmit, user, setUser }) {

    
    // checks if user is logged in and updates any changes made elsewhere
    useEffect(()=>{
        fetch('/api/checksession')
            .then(resp => resp.json())
            .then(data => setUser(data))
    }, [])

    //set formik values 
    const formik = useFormik({
        initialValues: {
            amount: "",
            description: "",
            date: new Date(),
            budget_id: "",
        },
        onSubmit: (values) => {
            onSubmit(values);
            formik.resetForm();
        },
    });

    

    //when input field changes save new value before sending to formik
    const handleCategoryChange = (e) => {
        const { value } = e.target;
        formik.setFieldValue("budget_id", value)
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <h3>Add New Transaction</h3><br/>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                <div className="form-group" style={{ marginRight: '10px' }}>
                    <label>Amount </label><br/>
                    <input
                        type="number"
                        id="amount"
                        placeholder="0.00"
                        className="input-field"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                    />
                </div><br/>
                <div className="form-group" style={{ marginRight: '10px' }}>
                    <label>Description </label><br/>
                    <input
                        type="text"
                        id="description"
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
                        onChange={(date) => formik.setFieldValue("date", date.toISOString())}
                    />
                </div>
                <br/>
                <div style={{margin: '10px'}} >
                    <label> Budget Categories </label>
                    <br/>
                    <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    {user.budgets.map((budget) => (
                        <div key={budget.category.name} >
                            <input
                                type="radio"
                                id={budget.id}
                                value={budget.id}
                                checked={formik.values.budget_id == budget.id}
                                onChange={handleCategoryChange}
                            />
                            <label htmlFor={budget.category.name}>{budget.category.name}</label>
                        </div>
                    ))}
                    </div>
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default TransactionForm;