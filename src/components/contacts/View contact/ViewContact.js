// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom'; 
// import { ContactService } from '../../../services/ContactServices';
// import Spinner from '../../spinner/Spinner';

// const ViewContact = () => {
//     const {contactId}= useParams();

//     let [state, setState] = useState({
//         loading:false, 
//         contact: {}, 
//         errorMessage:'',
//         group:{},
//     })

//     const getContact = async() =>{
//         setState({...state, loading:true})
        
//         try {
//             let response = await ContactService.getContact(contactId); 
//             let groupResponse = await ContactService.getGroup(response.data)
//             setState((state)=>{
//                 return {...state, loading:false, contact:response.data, group: groupResponse.data}
//             })
//         } catch (error) {
//             setState({...state, loading:false, errorMessage:error.message})
//         }
//     }

//     useEffect(()=>{
//         getContact()
//     },[contactId])
    
//     let { loading, contact, error, group} = state; 
//   return (
    
//     <div>
        
//         <section className='view-contact-intro'>
//             <div className='container'>
//                 <div className='row'>
//                     <div className='col'>
//                         <p className='h3 text-warning fw-bold'>View Contact</p>
//                         <p className='fst-italic'>This is the place you can view your contact</p>
//                     </div>
//                 </div>
//             </div>
//         </section>
//         {
//             loading? <Spinner/> : <>  

//             {
//                 Object.keys(contact).length > 0 && Object.keys(group).length > 0 && 
            
//             <section className='view-contact mt-3'>
//             <div className='container'>
//                 <div className='row align-items-center'>
//                     <div className='col-md-4'>
//                     <img src={contact.photo} className='contact-img' alt='contact-photo'/>
//                     </div>
//                     <div className='col-md-8'>
//                     <ul className='list-group'>
//                                         <li className='list-group-item list-group-item-action'>
//                                             Name: <span className='fw-bold'>{contact.name}</span>
//                                         </li>
//                                         <li className='list-group-item list-group-item-action'>
//                                             Mobile: <span className='fw-bold'>{contact.mobile}</span>
//                                         </li>
//                                         <li className='list-group-item list-group-item-action'>
//                                             Email: <span className='fw-bold'>{contact.email}</span>
//                                         </li>
//                                         <li className='list-group-item list-group-item-action'>
//                                             Title: <span className='fw-bold'>{contact.title}</span>
//                                         </li>
//                                         <li className='list-group-item list-group-item-action'>
//                                             Group: <span className='fw-bold'>{group.name}</span>
//                                         </li>
                                        
//                                     </ul>

//                     </div>
//                 </div>
//                 <div className='row'>
//                     <div className='col'>
//                         <Link to={'/contacts/list'} className='btn btn-warning'>
//                             Back
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
// }
            
//             </>
//         }
        
//     </div>
//   )
// }

// export default ViewContact



import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactServices';
import Spinner from '../../spinner/Spinner';
const ViewContact = () => {
    let { contactId} = useParams(); 

    let [state, setState] = useState({
        loading:false, 
        contact:{},
        errorMsg: '',
        group:{}
    }); 

    const fetchSingleContact = async()=>{
        try {
            setState({...state, loading:true})
            let response = await ContactService.getContact(contactId);
           let groupResponse = await ContactService.getGroup(response.data)
            setState({...state, loading:false, contact:response.data, group: groupResponse.data})
            console.log(state)
        } catch (error) {
           setState({...state, loading:false, errorMsg:error.message}) 
        }
    }

    useEffect(()=>{
        fetchSingleContact(); 
    },[])

const { loading, contact, errorMsg, group } = state; 
 const { photo, name, mobile, email, company, title } = contact; 
  return (
    <>
    <section className='view-contact intro'>
        <div className='container'>
            <div className="row">
                <div className="col">
                    <p className="h3 text-warning fw-bold"> View Contact</p>
                    <p className="fst-italic">This is the section where you can view all your contacts </p>
                </div>
            </div>

        </div>
    </section>
    {
        loading? <Spinner/>:
        <>
        {
            Object.keys(contact).length > 0 && 
            Object.keys(group).length > 0 &&
            <section className='view-contact'>
        <div className='container'>
            <div className='row align-items-center '>
                <div className='col-md-4'>
               <img src={photo} className="contact-img"/>
                </div>
                <div className='col-md-8'>
                 <ul className="list-group">
                 <li className="list-group-item list-group-item-action">
                    Name: <span className='fw-bold'>{name}</span>
                 </li>
                 <li className="list-group-item list-group-item-action">
                    Mobil: <span className='fw-bold'>{mobile}</span>
                 </li>
                 <li className="list-group-item list-group-item-action">
                    Email: <span className='fw-bold'>{email}</span>
                 </li>
                 <li className="list-group-item list-group-item-action">
                    Company: <span className='fw-bold'>{company}</span>
                 </li>
                 <li className="list-group-item list-group-item-action">
                    Title: <span className='fw-bold'>{title}</span>
                 </li>
                 <li className='list-group-item list-group-item-action'>
                    Group: <span className='fw-bold'>{group.name}</span>
                 </li>
                 </ul>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to={'/contacts/list'} className="btn btn-warning">Back </Link>
                </div>
            </div>

        </div> 
    </section> 
        }
        </>
    }
    
    </>
  )
}

export default ViewContact