import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

function GetproductBycategory() {
    const [formData,setformData]=useState([])

    const {category}=useParams()
      const navigate=useNavigate()
    const apiurl="http://localhost:3000"

    useEffect(()=>{
          fetchproducts()
    })

    async function fetchproducts() {
         try {
      const res = await axios.get(`${apiurl}/getcategory/${category}`);
      setformData(res.data.p);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    }
    function login(){
      navigate("/login")
    }
  return (
    <>
          <div className="container py-5">
      <h2 className="text-center mb-5 text-primary fw-bold text-uppercase">
        {category} Products
      </h2>

      {formData.length === 0 ? (
        <div className="text-center text-muted fs-5">No products found.</div>
      ) : (
        <div className="row g-4">
          {formData.map((e, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"
              key={index}
            >
              <div className="card product-card shadow-sm border-0 w-100 rounded-4 overflow-hidden">
                <div className="image-container">
                  <img
                    src={e.image}
                    className="card-img-top product-image"
                    alt={e.pname}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center fw-semibold text-dark">
                    {e.pname}
                  </h5>
                  <p className="card-text text-muted small text-center">
                    {e.description.length > 60
                      ? e.description.substring(0, 60) + "..."
                      : e.description}
                  </p>
                  <div className="mt-auto text-center">
                    <h6 className="fw-bold text-success mb-3">
                     ₹{e.price.toLocaleString()}
                    </h6>
                    <button className="btn btn-primary rounded-pill px-4" onClick={login}>
                      Buy Now
                    </button>
                     <button className="btn btn-secondary rounded-pill px-4" onClick={login}>
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default GetproductBycategory
