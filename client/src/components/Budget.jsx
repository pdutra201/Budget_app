import React, { useState, useEffect} from 'react'
import { useFormik } from 'formik'

function Budget({budget, totalIncome}){
    const [allowance, setAllowance] = useState((budget.percentage/100)*totalIncome)

    return (
        <div>
            <h5>Budget ID: {budget.id}</h5>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ marginRight: '10px' }}>Percentage: {budget.percentage}%</div>
                <div>Allowance: {allowance}</div>
       
            </div>
        </div>
        
    )
}

export default Budget