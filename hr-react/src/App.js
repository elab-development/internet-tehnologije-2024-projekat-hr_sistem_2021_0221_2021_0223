import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeLogin from "./pages/HomeLogin";
import Navigation from "./components/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import MyBonuses from "./pages/MyBonuses";
import MyReviews from "./pages/MyReviews";
import MyContracts from "./pages/MyContracts";
import CreateEmployee from "./pages/CreateEmployee";
import Administration from "./pages/Administration";
import {Container} from "react-bootstrap";

function App() {
  return (
    <>
     <Navigation/>
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLogin/>}/>
                    <Route path="/about-us" element={<AboutUs />}/>
                    <Route path="/my-bonuses" element={<MyBonuses />}/>
                    <Route path="/my-reviews" element={<MyReviews />}/>
                    <Route path="/my-contracts" element={<MyContracts />}/>
                    <Route path="/create-employee" element={<CreateEmployee/>}/>
                    <Route path="/admin" element={<Administration />}/>

                </Routes>
            </BrowserRouter>
        </Container>
    </>
  );
}

export default App;
