import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TransactionForm({ onSubmit }) {
    const formik = useFormik({
        initialValues: {
            amount: "",
            description: "",
            date: new Date(),
        },
        onSubmit: (values) => {
            onSubmit(values);
            formik.resetForm();
        },
    });

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
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default TransactionForm;