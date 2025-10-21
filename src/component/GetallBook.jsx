import axios from 'axios'
import React, { useEffect, useState } from 'react'

function GetallBook() {
    const apiurl="http://localhost:3000/"
    const[book,setBook]=useState([])

    useEffect(()=>{
        fetchbooks()
    },[])

    async function fetchbooks() {
        try {
       const res = await axios.get(apiurl)
    //   console.log(res.data.allbooks)
      setBook(res.data.allbooks)
    } catch (err) {
      console.error(err)
    }
    }
  return (
    <>
      <div className="container mt-4">
      <h2 className="text-center mb-4">📚 All Books</h2>

      <div className="row">
        {book && book.length > 0 ? (
          book.map((book, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Published:</strong> {book.published_year}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Price:</strong> ₹{book.price}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Stock:</strong> {book.stock}
                  </p>

                  <button className="btn btn-danger btn-sm me-2">Edit</button>
                  <button className="btn btn-primary btn-sm">Buy</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No books available</p>
        )}
      </div>
    </div>
      
    </>
  )
}

export default GetallBook
