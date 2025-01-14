import React, { useState, useEffect } from 'react';
import './App.css'
import Tours from './components/Tours';
import Loading from './components/Loading';
import SingleTour from './components/SingleTour';
/* eslint-disable react/prop-types */

const url='https://www.course-api.com/react-tours-project';

function App() {

const [isLoading,setIsLoading]=useState(true);
const [tours,setTours]=useState([]);

const removeTour = (id)=>{
const newTours=tours.filter((tour)=> tour.id!==id);
setTours(newTours);
}

const fetchTours = async ()=>{
  setIsLoading(true);
  try{
    const response=await fetch(url);
    const tours = await response.json()
    setTours(tours);
    // console.log(tours);
  }
  catch (error){
    console.log(error);
  }
  setIsLoading(false);
}

useEffect(()=>{
  fetchTours();
},[]);

if(isLoading){
  return (<main>
    <Loading/>
  </main>
  )}

if(tours.legth===0){
  return<main>
    <div className="title">
      <h2>No Tours Left</h2>
      <button type='button' 
      className='btn'
      onClick={fetchTours}>
        Refresh
      </button>
    </div>
  </main>
}

return (
     <main>
      <Tours tours={tours} removeTour={removeTour}/>
     </main>
  )
}

export default App
