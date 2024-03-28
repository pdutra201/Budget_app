import { useFormik } from "formik";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TransactionForm({ onSubmit }) {
    const [cats, setCats] = useState([])

    useEffect(()=>{
        fetch('/api/categories')
            .then(resp => resp.json())
            .then(data => setCats(data))
    }, [])

    const formik = useFormik({
        initialValues: {
            amount: "",
            description: "",
            date: new Date(),
            categories: [],
        },
        onSubmit: (values) => {
            onSubmit(values);
            formik.resetForm();
        },
    });


    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        const newCategories = checked
            ? [...formik.values.categories, value]
            : formik.values.categories.filter((cat) => cat !== value);
        formik.setFieldValue("categories", newCategories);
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
                <div >
                    <label>Categories </label>
                    <br/>
                    <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    {cats.map((category) => (
                        <div key={category.name} >
                            <input
                                type="checkbox"
                                id={category.name}
                                value={category.name}
                                checked={formik.values.categories.includes(category.name)}
                                onChange={handleCategoryChange}
                            />
                            <label htmlFor={category.name}>{category.name}</label>
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