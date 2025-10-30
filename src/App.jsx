import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route,Routes } from "react-router-dom";
import ProtectedRoute from './component/ProtectedRoute'
import Getallproducts from './component/Home';
import Addproduct from './component/Addproduct';
import Addtocart from './component/Addtocart';
import EditProduct from './component/EditProduct';
import GetproductBycategory from './component/GetproductBycategory';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import ProductDetails from './component/ProductDetails';


function App() {

  return (

    <>

<header style={{ width: "100%", position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
    <div className="container-fluid">
      <a className="navbar-brand text-white" href="#">
        🛒 MyStore
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active text-white" to="/allproducts">
              Home
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link text-white" to="/allproducts">
              Getallproducts
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link text-white" to="/add">
              Addproducts
            </Link>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-white"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Category
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="/Electronics">
                  Electronics
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Fashion">
                  Fashion
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Clothing">
                  Clothing
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/Home Appliances">
                  Home appliances
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/others">
                  Other products
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/register">
              Register
            </Link>
          </li>
           <li className="nav-item">
            <Link className="nav-link text-white" to="/addtocart">
              Add to cart
            </Link>
          </li>
        </ul>

        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
</header>

    <Routes>
      {/* <Route path='allproducts' element={<Getallproducts></Getallproducts>}></Route> */}
      <Route path='allproducts' element={<Home></Home>}></Route>
      <Route path='add' element={
        <ProtectedRoute><Addproduct></Addproduct></ProtectedRoute>
        }></Route>
      {/* <Route path='weather' element={<GetWeather></GetWeather>}></Route> */}
      {/* <Route path="allbooks" element={<GetallBook></GetallBook>}></Route> */}
      {/* <Route path='editproduct/:id' element={<EditProduct></EditProduct>}></Route> */}
      <Route path='/:category' element={<GetproductBycategory></GetproductBycategory>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path="/addtocart/:id" element={<Addtocart></Addtocart>} />
      <Route path="/product/:id" element={<ProductDetails></ProductDetails>} />

    </Routes>


      {/* <Link to='comment'>getcomment</Link>&nbsp;&nbsp;
      <Link to='post'>getpost</Link>&nbsp;&nbsp;
      <Link to='album'>get album</Link>&nbsp;&nbsp;
      <Link to='photo'> get photo </Link>
      <Link to='add'>Add Post</Link>

      <Routes>

        <Route path='post' element={<Post></Post>}></Route>
        <Route path='comment' element={<Comment></Comment>}></Route>
        <Route path='album' element={<Album></Album>}></Route>
        <Route path='photo' element={<Photos></Photos>}></Route>
        <Route path='add' element={<AddPost></AddPost>} ></Route>

      </Routes> */}

      <footer style={{ width: "100%", position: "", bottom: 0, right: 0, zIndex: 1000}}>
        <div className='bg-primary' style={{height:'100px'}}>
        <p>© 2025 MY STORE </p>
        </div>
      </footer>
    </>
  )
}

export default App
