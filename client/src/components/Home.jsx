import React, { useState, useEffect } from "react";
import {useFormik} from "formik";
import '../App.css'


function Home({ user, clearError, setUser, trans }) {
    const [canEdit, setCanEdit] = useState(false)

    useEffect(() => {
        clearError()
      }, [])

    
    const formik = useFormik({
        initialValues:{
            income: 0.00
        },
        onSubmit: (values) => {
            console.log(values)
            fetch(`/api/home/${user.id}`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(values)
            })
            .then(resp => resp.json())
            .then(data => {
                setUser(data)
                setCanEdit(false)
            })
            
        }
    })

    const handelEdit = () => {
        setCanEdit(true)
    }



    if(user) {

        const recentList = trans.slice(-3)
        
        return (
            <div className="container">
                <h1>Welcome, {user.username}!</h1>
                <>
                <h5>Monthly Income</h5>
                {canEdit ? (
                   
                   <div>
                        <form onSubmit={formik.handleSubmit}>
                            
                            <input
                                type="float"
                                id="income"
                                className="input-field"
                                onChange={formik.handleChange}
                            /> 
                            <button type="submit" >submit</button>
                        </form>
                    </div>
                    
                    
                ):(
                     
                    <div>
                        <strong>{user.income}</strong>
                        <button onClick={() => handelEdit()}>Edit</button>
                    </div>
                    
                    )}
                </>
                
                <ul style={{ border: '1x solid #ccc', borderRadius: '5px', padding: '20px', marginBottom: '40ox' }}>
                    <h3>Recently added Transactions</h3>
                    {recentList.map((transaction) => (
                        <li key={transaction.id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                            <strong>Description:</strong> {transaction.description}<br/>
                            <strong>Price:</strong> {transaction.amount}<br/>
                            <strong>Date:</strong> {transaction.date}<br/>
                        </li>
                        )
                     )}
                 </ul>
                

            </div>
            
        )
        
    }
    else {
        return <h1 style={{color:'black', margin:300}}>Welcome! Please login or signup to get started.</h1>
    }
}

export default Home;