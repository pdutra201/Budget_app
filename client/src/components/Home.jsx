import React, { useState, useEffect } from "react";

function Home({ user, clearError, isLoggedIn, trans }) {

    useEffect(() => {
        clearError()
      }, [])

    
    if(user) {

        const recentList = trans.slice(-3)
        
        
    
        return (
            <div >
                <h1>Welcome, {user.username}!</h1>
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