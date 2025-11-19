import { useState, useEffect } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Getallproducts from './component/Home';
import Addtocart from './component/Addtocart';
import GetproductBycategory from './component/GetproductBycategory';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import ProductDetails from './component/ProductDetails';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

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
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <Link className="nav-link active text-white" to="/allproducts">Home</Link>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" data-bs-toggle="dropdown">
                    Category
                  </a>

                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/Electronics">Electronics</Link></li>
                    <li><Link className="dropdown-item" to="/Fashion">Fashion</Link></li>
                    <li><Link className="dropdown-item" to="/Clothing">Clothing</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/Home Appliances">Home Appliances</Link></li>
                    <li><Link className="dropdown-item" to="/others">Other products</Link></li>
                  </ul>
                </li>

                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/login">Login</Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/register">Register</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <Link className="nav-link text-white" to="/cart">Cart</Link>
                </li>

              </ul>

              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" />
                <button className="btn btn-outline-light">Search</button>
              </form>

            </div>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path='allproducts' element={<Home />} />
        <Route path='/:category' element={<GetproductBycategory />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/register' element={<Register />} />
        <Route path="/cart" element={<Addtocart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>

      <footer className='bg-primary' style={{ height: '100px' }}>
        <p>© 2025 MY STORE</p>
      </footer>
    </>
  )
}

export default App;
