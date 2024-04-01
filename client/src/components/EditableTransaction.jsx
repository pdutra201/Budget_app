import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditableTransaction({ transaction, onUpdate, onCancel }) {

    // state to save new transaction values | on submit sends data to PUT request to make changes in db
    const [values, setValues] = useState({
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
    });
    const handleUpdate = (e) => {
        e.preventDefault()
        onUpdate(values);
    };

    return (
        <form>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                <div className="form-group" style={{ marginRight: '10px' }}>
                    <label>Amount </label><br/>
                    <input
                        type="number"
                        id="amount"
                        placeholder="0.00"
                        className="input-field"
                        value={values.amount}
                        onChange={(e) => setValues({ ...values, amount: e.target.value })}
                    />
                </div><br/>
                <div className="form-group" style={{ marginRight: '10px' }}>
                    <label>Description </label><br/>
                    <input
                        type="text"
                        id="description"
                        placeholder=""
                        className="input-field"
                        value={values.description}
                        onChange={(e) => setValues({ ...values, description: e.target.value })}
                    />
                </div>
                <br/>
                <div className="form-group" style={{ marginRight: '10px' }}>
                    <label>Date </label><br/>
                    <DatePicker
                        id="date"
                        className="datepicker"
                        selected={values.date}
                        onChange={(date) => {console.log(date), setValues({ ...values, date })}}
                    />
                </div>
                <br/>
                </div>
                <button onClick={handleUpdate}>Update</button>
                <button style={{background: 'Red', color: 'white'}} onClick={onCancel}>Cancel</button>
            
        </form>
    );
}

export default EditableTransaction;