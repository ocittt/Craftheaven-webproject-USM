import "./App.css";
import Login from "./components/LogIn/Login";
import Signup from "./components/SignUp/Signup";
import Customerhome from "./components/Pages/Customerhome";
import Searchpage from "./components/Pages/Searchpage";
import Navbar from "./components/Pages/Navbar";
import Sellersignup from "./components/SellerSignUp/SellerSignup";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SellerLogin from "./components/SellerLogIn/SellerLogIn";
import SellerDashboard from "./components/SellerPages/SellerDashboard";
import SellerNavbarDashboard from "./components/SellerPages/SellerNavbarDashboard";
import SellerNavbar from "./components/SellerPages/SellerNavbar";
import AddProduct from "./components/SellerPages/AddProduct";
import MyProduct from "./components/SellerPages/MyProduct";
import EditProduct from "./components/SellerPages/EditProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/custDash">
            <Navbar />
            <Customerhome />
          </Route>
          <Route path="/search">
            <Navbar />
            <Searchpage />
          </Route>
          <Route path="/sellersignup" component={Sellersignup} />
          <Route path="/sellerlogin" component={SellerLogin} />
          <Route
            path="/sellernavbardashboard"
            component={SellerNavbarDashboard}
          />
          <Route path="/selleraddproduct">
            <SellerNavbar />
            <AddProduct />
          </Route>
          <Route path="/sellerdashboard">
            <SellerNavbar />
            <SellerDashboard />
          </Route>
          <Route path="/myproduct">
            <SellerNavbar />
            <MyProduct />
          </Route>
          <Route path="/editproduct/:id">
            <SellerNavbar />
            <EditProduct />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
