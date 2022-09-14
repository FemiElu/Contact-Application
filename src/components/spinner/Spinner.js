import React from 'react'; 
import loading from '../../assets/img/images.png'

const Spinner = () => {
  return (
    <div>
        <img src={loading} alt='spinner' className='db-block m-auto' style={{width:"200px"}}/>
        <h2 className='fw-bold'>loading...</h2>
    </div>
  )
}

export default Spinner