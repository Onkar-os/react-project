import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

function EditProduct() {
    const navigate=useNavigate()
     const[formData,setformData]=useState({
            pname:" ",
            price:"",
            category:"",
            stock:"",
            image:"",
            description:""
        })

    const apiurl="http://localhost:3000"
    const {id}=useParams()

    useEffect(()=>{
         fetchproducts()
    },[])

   async function fetchproducts(){
    await axios.get(`${apiurl}/${id}`).then((res)=>{
        setformData(res.data.p)
    })
   }

  async function handleSubmit(e){
    e.preventDefault()
      await axios.put(`${apiurl}/${id}`,formData).then((res)=>{
        navigate('/allproducts')
      })
   }
   function handleChange(e){
       setformData({...formData,[e.target.name]:e.target.value})
   }

  return (
   <div className="container mt-5">

      <h2 className="text-center mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="pname"
            value={formData.pname}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter category"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="text"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter stock quantity"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">description</label>
          <input
            type="text"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter image URL"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Edit Product
        </button>
      </form>
    </div>
  )
}

export default EditProduct
