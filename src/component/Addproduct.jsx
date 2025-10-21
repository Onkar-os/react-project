import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Addproduct() {
    const navigate=useNavigate()
    const[formData,setformData]=useState({
        pname:" ",
        price:"",
        category:"",
        stock:"",
        orderDate: "",
        image:"",
        description:""
    })


    function handleChange(e){
        setformData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()

        await axios.post("http://localhost:3000",formData).then((res)=>{
          alert("product added sucesfullly")
        })
    }
    function submithandler(){
        navigate('/allproducts')
    }
  return (
    <>
       
    <div className="container mt-5">

      <h2 className="text-center mb-4">Add Product</h2>
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
  <select
    name="stock"
    value={formData.stock}
    onChange={handleChange}
    className="form-control"
    required
  >
    <option value="">-- Select Availability --</option>
    <option value="true">In Stock</option>
    <option value="false">Out of Stock</option>
  </select>
</div>
        <div className="mb-3">
          <label className="form-label">orderdate</label>
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter order date "
            required
          />
        </div>


        <div className="mb-3">
          <label className="form-label">description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
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

        <button type="submit" className="btn btn-primary w-100" onClick={submithandler}>
          Add Product
        </button>
      </form>
    </div>
    </>
  )
}

export default Addproduct
