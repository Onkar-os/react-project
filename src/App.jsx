import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./component/Home";
import Addtocart from "./component/Addtocart";
import GetproductBycategory from "./component/GetproductBycategory";
import Login from "./component/Login";
import Register from "./component/Register";
import ProductDetails from "./component/ProductDetails";
import Checkout from "./component/Checkout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/allproducts");
  };

  const primaryColor = "#FF9900"; 
  const darkBg = "#0F1111";

  return (
    <>
      {/* Navbar */}
      <header style={{ width: "100%", position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
        <nav className="navbar navbar-expand-lg w-100" style={{ backgroundColor: darkBg }}>
          <div className="container-fluid">
            <Link className="navbar-brand text-white fs-4 fw-bold" to="/allproducts">
              <span style={{ color: primaryColor }}>🛒</span> MyStore
            </Link>
            <div className="d-flex align-items-center">
              <ul className="navbar-nav flex-row me-auto mb-2 mb-lg-0">
                <li className="nav-item me-3"> 
                  <Link className="nav-link active text-white" to="/allproducts">Home</Link>
                </li>
                <li className="nav-item dropdown me-3">
                  <a className="nav-link dropdown-toggle text-white" href="#" data-bs-toggle="dropdown">
                    Category
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark" style={{ backgroundColor: '#222', border: `1px solid ${primaryColor}` }}>
                    <li><Link className="dropdown-item text-white" to="/Electronics">Electronics</Link></li>
                    <li><Link className="dropdown-item text-white" to="/Fashion">Fashion</Link></li>
                    <li><Link className="dropdown-item text-white" to="/Clothing">Clothing</Link></li>
                    <li><hr className="dropdown-divider" style={{ borderColor: '#555' }} /></li>
                    <li><Link className="dropdown-item text-white" to="/Home Appliances">Home Appliances</Link></li>
                    <li><Link className="dropdown-item text-white" to="/others">Other products</Link></li>
                  </ul>
                </li>
                {!isLoggedIn ? (
                  <>
                    <li className="nav-item me-3"><Link className="nav-link text-white" to="/login">Login</Link></li>
                    <li className="nav-item me-3"><Link className="nav-link text-white" to="/register">Register</Link></li>
                  </>
                ) : (
                  <li className="nav-item me-3">
                    <button className="btn btn-sm fw-bold" style={{ backgroundColor: primaryColor, color: 'black' }} onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                )}
                <li className="nav-item me-3">
                  <Link className="nav-link text-white" to="/cart">
                    <span style={{ color: primaryColor, fontSize: '1.2em' }}>🛒</span> Cart
                  </Link>
                </li>
              </ul>
              <form className="d-flex ms-3" role="search" onSubmit={handleSearchSubmit}>
                <input 
                  className="form-control me-2 form-control-sm" 
                  type="search" 
                  placeholder="Search products..." 
                  style={{ width: '180px', backgroundColor: '#333', color: 'white', border: `1px solid ${primaryColor}` }} 
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-sm fw-bold" type="submit" style={{ backgroundColor: primaryColor, color: 'black' }}>
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <div style={{ paddingTop: '56px', minHeight: 'calc(100vh - 120px)', backgroundColor: darkBg }}> 
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} isLoggedIn={isLoggedIn} />} />
          <Route path="/allproducts" element={<Home searchQuery={searchQuery} isLoggedIn={isLoggedIn} />} />
          <Route path="/:category" element={<GetproductBycategory searchQuery={searchQuery} isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Addtocart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout/:id" element={<Checkout />} />
        </Routes>
      </div>

      <footer style={{ backgroundColor: darkBg, color: primaryColor }} className="text-center py-3">
        © 2025 MY STORE
      </footer>
    </>
  );
}

export default App;
