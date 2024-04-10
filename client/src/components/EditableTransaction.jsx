import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";


function EditableTransaction({ transaction, onUpdate, onCancel }) {
    console.log(transaction)
    // state to save new transaction values | on submit sends data to PUT request to make changes in db
    const formik = useFormik({
        initalValues: {
            amount: transaction.amount,
            description: transaction.description,
            date: transaction.date,
            categories: transaction.categories
        },
        onSubmit: (values) => {
            onUpdate(values);
            formik.resetForm()
        }

    })
    
    // const [values, setValues] = useState(
    //     amount: transaction.amount,
    //     description: transaction.description,
    //     date: transaction.date,
    // });
    // const handleUpdate = (e) => {
    //     e.preventDefault()
    //     onUpdate(values);
    // };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                <div className="form-group" style={{ marginRight: '10px' }}>
                    <label>Amount </label><br/>
                    <input
                        type="number"
                        id="amount"
                        placeholder="{transaction.amount}"
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
                        placeholder={transaction.description}
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
                        className={transaction.date}
                        selected={formik.values.date}
                        onChange={formik.handleChange}
                    />
                </div>
                <br/>
                {/* replicate categories selection from inital submit 
                    which can be toggled to be updated when the form is sent
                    for each on selected I want to send a put to cetegories to update transaction value or remove it
                     */}
                </div>
                <button type="submit">Update</button>
                <button style={{background: 'Red', color: 'white'}} onClick={onCancel}>Cancel</button>
            
        </form>
    );
}




export default EditableTransaction;