import { useEffect, useRef, useState } from "react";
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

  const [aboutIsVisible, setAboutIsVisible] = useState(false);
  const [packagesIsVisible, setPackagesIsVisible] = useState(false);
  const [featuredIsVisible, setFeaturedIsVisible] = useState(false);
  const [compareIsVisible, setCompareIsVisible] = useState(false);

  const aboutSectionRef = useRef(null);
  const packagesSectionRef = useRef(null);
  const featuredSectionRef = useRef(null);
  const compareSectionRef = useRef(null);

  usePageTitle("Home");

  useEffect(() => {
    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        setAboutIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    if (aboutSectionRef.current) {
      aboutObserver.observe(aboutSectionRef.current);
    }

    const packagesObserver = new IntersectionObserver(
      ([entry]) => {
        setPackagesIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    if (packagesSectionRef.current) {
      packagesObserver.observe(packagesSectionRef.current);
    }

    const featuredObserver = new IntersectionObserver(
      ([entry]) => {
        setFeaturedIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    if (featuredSectionRef.current) {
      featuredObserver.observe(featuredSectionRef.current);
    }

    const compareObserver = new IntersectionObserver(
      ([entry]) => {
        setCompareIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    if (compareSectionRef.current) {
      compareObserver.observe(compareSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        aboutObserver.unobserve(aboutSectionRef.current);
      }
      if (packagesSectionRef.current) {
        packagesObserver.unobserve(packagesSectionRef.current);
      }
      if (featuredSectionRef.current) {
        featuredObserver.unobserve(featuredSectionRef.current);
      }
      if (compareSectionRef.current) {
        compareObserver.unobserve(compareSectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <Layout>
        <main className="align-bottom">
          <Banner  />
          <Featured ref={featuredSectionRef} className={featuredIsVisible ? 'visible animate-in-view' : ''} />
          <AboutUs ref={aboutSectionRef} className={aboutIsVisible ? 'visible' : ''} />
          <HomePackages ref={packagesSectionRef} className={packagesIsVisible ? 'visible animate-in-view' : ''} />
          <ComparePrice  ref={compareSectionRef} className={compareIsVisible ? 'visible animate-in-view' : ''} />
          <Services />
          <GetQuote />
        </main>
      </Layout>
    </>
  );
};

export default Home;



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