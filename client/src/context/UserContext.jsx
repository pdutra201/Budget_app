import React, {createContext, useState, useEffect } from 'react';


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // Create State for each model request
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [budgets, setBudgets] = useState([])
    const [categories, setCategories] = useState([])
    const [trans, setTrans] = useState([])



    //clear error message from client
    const clearError = () => setError(null)


    //GET request categories from db and set state
    const getCategories = () => {
        fetch("/api/categories")
        .then(resp => {
          if (!resp.ok) {
            throw new Error('Failed to fecth categories')
          }
          return resp.json()
        })
        .then(data => {
          setCategories(data)
        })
      }

      // GET request transactions from db and set state
      const getTransactions = () => {
        fetch("/api/transactions")
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Failed to fetch transactions')
                }
                return resp.json()
            })
            .then(data => {
                setTrans(data)
            })
    }

    //GET request budget from db and set state
    const getBudgets = () => {
        fetch("/api/budget")
          .then(resp => {
            if (!resp.ok) {
              throw new Error('Failed to fetch transactions')
            }
            return resp.json()
          })
          .then(data => {
            setBudgets(data)
        })
      }

      //check if user is logged in set error is not and clear error is successful
      const isLoggedIn = data => {
    
        if (data.error){
          setError(data.error)
        }
        else{
          setUser(data)
          clearError()
        }
      }

      return(
        <UserContext.Provider value={{
            user, setUser,
            error, setError, clearError,
            budgets, setBudgets,
            categories, setCategories,
            trans, setTrans,
            getCategories, getTransactions, getBudgets, isLoggedIn
        }}>
            {children}
        </UserContext.Provider>
      )
}