import React, { useState, useEffect} from 'react'
import { useFormik } from 'formik'
import '../App.css'



function BudgetForm({ onFormSubmit }){

    // define formik Form values
    const formik = useFormik({
        initialValues: {
            percentage: 100,
            category: "",
        },
        onSubmit:(values) => {
            onFormSubmit(values)
            formik.resetForm()
        }
    })

    
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
                        </div><br/>
                        <div className="form-group" style={{ marginRight: '10px' }}>
                                <label>Category </label><br/>
                                <input
                                    type="text"
                                    id="category"
                                    placeholder=""
                                    className="input-field"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                />
                         </div><br/>
                         <button type="submit">Submit</button>
                     </div>
                 </form>
    )
    }

    export default BudgetForm