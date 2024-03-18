import React, { useState, useEffect} from 'react'
import { useFormik } from 'formik'


function Budget({ user, trans, budgets }){

    const formik = useFormik({
        
    })


    return (
        <div>
            {user ? (
                <h3>Budget List</h3>

            ) : (
                <h3>Please login to continue</h3>
            )}
        </div>
    )
}

export default Budget