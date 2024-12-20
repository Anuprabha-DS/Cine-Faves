import React from 'react'

const Heading=(props) =>{
    return (
      <>
        <div className='col'> 
            <h1>{props.heading}</h1>
        </div>
        
        {/* <div className='col col-sm-4'>
            <input className='form-control' type="text" placeholder='Search'/>
        </div> */}
      </>
    )
  }

export default Heading