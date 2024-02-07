import "bootstrap/dist/css/bootstrap.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-tabs/style/react-tabs.css';
import './assets/css/fonts.css'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import UserRouter from "./router";
import ScrollToTop from "@components/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter basename="/all-parcel-shipping">
        <ScrollToTop />
        <UserRouter />
      </BrowserRouter>
    </>
  );
}

export default App
