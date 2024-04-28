import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import '../App.css'
import { UserContext } from '../context/UserContext';



function BudgetForm({ onFormSubmit }){

    const {categories} = useContext(UserContext)

    const formSchema = Yup.object ({
        percentage: Yup.number().required("Percentage is required").max(100, "Percent must not exceed 100").min(1, "Percent must be greater than 1"),
        category: Yup.number().required("Category must be selected")
    })
    
    // define formik Form values
    const formik = useFormik({
        initialValues: {
            percentage: 0,
            category: "",
        },
        validationSchema: formSchema,
        onSubmit:(values) => {
            onFormSubmit(values)
            formik.resetForm()
        }
    }, [])

    

    
    return(
            <form onSubmit={formik.handleSubmit}>
                <h4>Add New Budget</h4><br/>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                        <div className="form-group" style={{ marginRight: '10px' }}>
                            <label>Percent </label><br/>
                               <input
                                 type="number"
                                 id="percentage"
                                 placeholder="0.00"
                                 className="input-field"
                                 value={formik.values.amount}
                                 onChange={formik.handleChange}
                             />
                             {formik.touched.percentage && formik.errors.percentage ? (<div className="error" style={{ color: 'red', fontSize: 'small' }}>{formik.errors.percentage}</div>): null}
                        </div><br/>
                        <div className="form-group" style={{ marginRight: '10px' }}>
                                <label>Category </label><br/>
                                <select 
                                    name="category"
                                    onChange={formik.handleChange}
                                    value={formik.values.category}
                                >
                                <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.category && formik.errors.category ? (<div className="error" style={{ color: 'red', fontSize: 'small' }}>{formik.errors.category}</div>): null}
                         </div><br/>
                         <button type="submit">Submit</button>
                     </div>
                 </form>
    )
    }

    export default BudgetForm