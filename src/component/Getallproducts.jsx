import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './External.css'
import { Navigate, useNavigate } from 'react-router-dom'

function Getallproducts() {
  const apiurl = "http://localhost:3000"
  const [data, setData] = useState([])
  const navigate=useNavigate()
  

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await axios.get(apiurl)
      console.log(res.data.allProducts)
      setData(res.data.allProducts)
    } catch (err) {
      console.error(err)
    }
  }

  async function Handledelete(obj) {
    await axios.delete(`${apiurl}/${obj._id}`).then((res)=>{
      alert("record deleted successfully")
    })
    setData(data.filter((e)=>e._id!==obj._id))
    
  }

  return (
    <div className="container mt-4 ">
      <div className="row bg-Dark" >
        {data.map((e, index) => (
          <div className="col-md-4 mb-4 " key={index}>
            <div className="card h-100 shadow-sm ">
              <img
                src={e.image || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={e.name}
              />
              <div className="card-body text-center ">
                <h5 className="card-title text-center fw-semibold text-dark">
                    {e.pname}
                  </h5>
                <h5 className="card-title">₹{e.price}</h5>
                <p className="card-text">{e.description}</p>
                <a href="#" className="btn btn-danger" onClick={()=>navigate(`/editproduct/${e._id}`)}> Edit </a>&nbsp;&nbsp;
               <a href="#" className="btn btn-primary" onClick={()=>{if(window.confirm("are u suree u want to delete record"))Handledelete(e)}}> Delete </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Getallproducts
