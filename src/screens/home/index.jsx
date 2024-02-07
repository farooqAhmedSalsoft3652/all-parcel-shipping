import { useEffect, useState } from "react";
import usePageTitle from "@hooks/usePageTitle";
import { Layout } from "@components/Layout/layout";

import Banner from "./banner";
import Featured from "./featured";
import AboutUs from "./aboutUs";
import HomePackages from "./packages";
import ComparePrice from "./comparePrice";
import Services from "./services";
import GetQuote from "./getQuote";


import axios from "axios";
import useAuth from "@hooks/useAuth";
import { roles } from "@config/data";


const Home = () => {

  const featured_ads1 = [
    {
      avatar: "",
      fullname: "",
      charges: {
        id: "6",
        online_charges: "20.00",
        onsite_charges: "10.00",
      },
      id: "",
    },
    {
      avatar: "",
      fullname: "",
      charges: {
        id: "6",
        online_charges: "20.00",
        onsite_charges: "10.00",
      },
      id: "",
    }
  ];

  usePageTitle("Home");
  const { role } = useAuth();
  const [featuredAds, setFeaturedAds] = useState([]);
  // const [ads, setAds] = useState([]);


  useEffect(() =>{
       setFeaturedAds(featured_ads1);
  },[])
 
  // const loadAds = async () => {
  //   let response = axios.get('/home')
  //       .then(res => {
  //         console.log(res.data , "Date");
  //         setFeaturedAds(res.data.data.featured_ads);
  //         setAds(res.data.data.ads);
  //       })
  //       .catch(err => {
  //         console.log(err.response);
  //       });
  // }
 
  // useEffect(() => {
  //   loadAds();
  // }, []);

  return (
    <>
      <Layout>
        <main className="align-bottom">
          <Banner />
          <Featured />
          <AboutUs />
          <HomePackages />
          <ComparePrice />
          <Services />
          <GetQuote />
        </main>
      </Layout>
    </>
  );
};

export default Home;
