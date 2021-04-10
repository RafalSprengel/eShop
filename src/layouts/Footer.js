import React, { useState, useEffect } from 'react';
import '../styles/Footer.css'

const Footer = () => {
  const [visits, setVisits] = useState('');
  ;
  useEffect(() => {
    let delay = 5000; //in milliseconds
    if (!(window.localStorage.getItem('visit_time')) || (parseInt(window.localStorage.getItem('visit_time')) + delay) < Date.now()) { //when time expired
      console.log('wykonuje if');
      window.localStorage.setItem('visit_time', Date.now());
      const API = "https://annoying-racks.000webhostapp.com?setvisit=eShop"
      fetch(API)
        .then((response) => {
          if (response.ok) return response;
          else throw Error(response.statusText)
        })
        .catch((errors) => console.log(errors))
    }
    const API = "https://annoying-racks.000webhostapp.com?getvisits=eShop"
    fetch(API)
      .then((response) => {
        if (response.ok) return response;
        else throw Error(response.statusText)
      })
      .then(response => response.json())
      .then((data) => setVisits(data.visits))
      .catch((errors) => console.log(errors))
  }, []);
  return (
    <footer>
      Copyright © 2020 R.Sprengel, visits: {visits}
    </footer>
  )
}

export default Footer