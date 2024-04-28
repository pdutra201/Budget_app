import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../context/UserContext";

function TransactionForm({ onSubmit }) {

    const {user, setUser} = useContext(UserContext)
    
    // checks if user is logged in and updates any changes made elsewhere
    useEffect(()=>{
        fetch('/api/checksession')
            .then(resp => resp.json())
            .then(data => setUser(data))
    }, [])

    const formSchema = Yup.object({
        amount: Yup.number().min(1, "Amount must be greater than 0").required("Amount is required"),
        budget_id: Yup.number().required("Category is required")
    })
    //set formik values 
    const formik = useFormik({
        initialValues: {
            amount: 0.0,
            description: "",
            date: new Date(),
            budget_id: "",
        },
        validationSchema: formSchema,
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
                    {formik.touched.amount && formik.errors.amount ? (<div className="error" style={{ color: 'red', fontSize: 'small' }}>{formik.errors.amount}</div>): null}
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
                    {formik.touched.budget_id && formik.errors.budget_id ? (<div className="error" style={{ color: 'red', fontSize: 'small' }}>{formik.errors.budget_id}</div>): null}
                </div>
                
                <button type="submit">Submit</button>
                
            </div>
        </form>
    );
}

export default TransactionForm;