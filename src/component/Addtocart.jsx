import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function Addtocart() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

 

   async function addtocart(obj) {
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
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Addtocart;
