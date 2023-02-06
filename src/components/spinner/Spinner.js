import React from 'react'; 
import spinner from '../../assets/200w.gif'

const Spinner = () => {
  return (
    <>
    <section className='h2'>
        <img src={spinner} alt="loading"  className="d-block m-auto"/>
    </section>
    </>
  )
}

export default Spinner