import React from 'react'
import './Loader.css'
import CubeLoader from '../../assests/gif/CubeLoader.gif'
import logo from '../../assests/images/Small DH logo 1.svg'
function Loader() {

  return (
    // <div classname="loaderContainer">
    //   <img className='loaderImg' src={CubeLoader} alt='' />
    // </div>
    <h1 className='wavy'>
  <img className='logoImg' src={logo} alt='' />
    <span >D</span>
    <span >a</span>
    <span >t</span>
    <span >a</span>
    <span >H</span>
    <span >u</span>
    <span >b</span>
    {/*<span>.</span>
    <span>.</span>
    <span>.</span> */}
   </h1>
  
       


  )
}

export default Loader