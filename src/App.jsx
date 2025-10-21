import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route,Routes } from "react-router-dom";
import Post from './component/Post';
import Comment from './component/comment';
import Album from './component/Album';
import Photos from './component/Photos';
import AddPost from './component/AddPost';
import Getallproducts from './component/Getallproducts';
import Addproduct from './component/Addproduct';
import GetWeather from './component/GetWeather';
import GetallBook from './component/GetallBook';
import EditProduct from './component/EditProduct';
import GetproductBycategory from './component/GetproductBycategory';
import Login from './component/Login';
import Register from './component/Register';


function App() {

  return (

    <>

<header style={{width:"1300px"}}>
    <nav class="navbar navbar-expand-lg  navbar bg-primary w-100" >
  <div class="container-fluid">
    <a class="navbar-brand" href="#">  🛒 MyStore</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="Home">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="allproducts">Getallproducts</Link>
        </li>
         <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="add">addproducts</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="weather">GetWeather</Link>
        </li>
        {/* <li class="nav-item">
          <Link class="nav-link" to="allbooks">getallbooks</Link>
        </li> */}
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category 
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link class="dropdown-item" to="/Electronics">Electronics</Link></li>
            <li><Link class="dropdown-item" to="/Fashion">Fashion</Link></li>
            <li><Link class="dropdown-item" to="/Clothing">Clothing</Link></li>
            <li><hr class="dropdown-divider"></hr></li>
            
            <li><Link class="dropdown-item" to="/Home Appliances">Home appliances</Link></li>
            <li><Link class="dropdown-item" to="/others">other products</Link></li>
          </ul>
        </li>
         <li class="nav-item">
          <Link class="nav-link" to="/login">Login</Link>
        </li>
           <li class="nav-item">
          <Link class="nav-link" to="/register">Register</Link>
        </li>
        {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></hr></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
       
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
</header>

    <Routes>
      <Route path='allproducts' element={<Getallproducts></Getallproducts>}></Route>
      <Route path='add' element={<Addproduct></Addproduct>}></Route>
      <Route path='weather' element={<GetWeather></GetWeather>}></Route>
      {/* <Route path="allbooks" element={<GetallBook></GetallBook>}></Route> */}
      <Route path='editproduct/:id' element={<EditProduct></EditProduct>}></Route>
      <Route path='/:category' element={<GetproductBycategory></GetproductBycategory>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
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

      <footer>
        <div className='bg-primary' style={{height:'100px'}}>
        <p>© 2025 MY STORE </p>
        </div>
      </footer>
    </>
  )
}

export default App
