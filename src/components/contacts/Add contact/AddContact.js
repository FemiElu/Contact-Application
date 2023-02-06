// import React, {useState, useEffect} from 'react'; 
// import { Link, Navigate, useNavigate } from 'react-router-dom'; 
// import { ContactService } from '../../../services/ContactServices';

// const AddContact = () => {

//     //get input in forms
//     //get groups and display in the select input
//     //create request
//     //navigate back to list on successful request
    

//     const navigate = useNavigate(); 

//     const [state, setState] = useState({
//         loading:false, 
//         contacts:{
//             name:'', 
//             photo:'', 
//             mobile:'', 
//             email:'', 
//             company:'', 
//             title:'',
//         }, 
//         groups:{}, 
//         errorMessage:''
//     })

//     const updateInput = (e)=>{
//         setState((state)=>{
//             return {...state, contacts:{
//                 ...state.contacts, 
//                 [e.target.name]:e.target.value
//             }}
//         })
//     }

//     const fetchGroups = async() =>{
//                 try {
//                     setState({...state, loading:true})
//                     const response = await ContactService.getGroups(); 
//                     setState({...state, loading:false, groups:response.data})
//                 } catch (error) {
//                     setState({...state, loading:false, errorMessage:error.message})
//                 }        
//     }

//     useEffect(()=>{
//         fetchGroups(); 
//     },[])

//     const submitForm = async(e) =>{
//         e.preventDefault();
        
//         try {
//             const response = await ContactService.createContacts(state.contacts); 
//             if(response) {
//                 navigate('/contacts/list', {replace:true})
//             }
//         } catch (error) {
//             setState({...state, loading:false, errorMessage:error.message})
//             navigate('/contacts/add', {replace:false})
//         }        
//     }
    
//     const { loading, contacts, groups, errorMessage } = state
//   return (
//     <div>
//         <section className='add-contact'>
//             <div className='container'>
//                 <div className='row'>
//                     <div className='col'>
//                         <p className='text-success h4 fw-bold'>Create Contact</p>
//                         <p className='fst-italic'>This is the place where you creacte a new contact.</p>
//                     </div>
//                 </div>
//                 <div className='row'>
//                     <div className='col-md-4'>
//                         <form onSubmit={submitForm}>
//                             <div className='mb-2'>
//                                 <input type="text"
//                                      className='form-control'
//                                      placeholder="Name"
//                                      name='name'
//                                      value={contacts.name}
//                                      onChange={updateInput}
//                                      />
//                             </div>
//                             <div className='mb-2'>
//                                 <input type="text"
//                                      className='form-control' 
//                                      placeholder="Photo"
//                                      name='photo'
//                                      value={contacts.photo}
//                                      onChange={updateInput}
//                                      />
//                             </div>
//                             <div className='mb-2'>
//                                 <input type="number" 
//                                      className='form-control'
//                                      placeholder="Mobile"
//                                      name='mobile'
//                                      value={contacts.mobile}
//                                     onChange={updateInput}
//                                      />
//                             </div>
//                             <div className='mb-2'>
//                                 <input type="email" 
//                                     className='form-control'
//                                     placeholder="Email"
//                                     name='email'
//                                     value={contacts.email}
//                                     onChange={updateInput}
//                                     />
//                             </div>
//                             <div className='mb-2'>
//                                 <input type="text"
//                                  className='form-control'
//                                  placeholder="Company"
//                                  name='company'
//                                  value={contacts.company}
//                                  onChange={updateInput}
//                                  />
//                             </div>
//                             <div className='mb-2'>
//                                 <input type="text" 
//                                     className='form-control'
//                                     placeholder="Title"
//                                     name='title'
//                                     value={contacts.title}
//                                     onChange={updateInput}
//                                     />
//                             </div>
//                             <div className='mb-2'>
//                                 <select className='form-control'>
//                                     <option value="items">Select a Group</option>
//                                    {
//                                     groups.length > 0 && 
//                                     groups.map((group)=>{
//                                         return <option key={group.id} value={group.id}>{group.name}</option>
//                                     })
//                                    }
//                                 </select>
//                                 <div className='m-2'>
//                                     <input type='submit' className="btn btn-success" value="Create"/>  
//                                 <Link to={'/contacts/list'} className="btn btn-dark ms-2">
//                                     Cancel    
//                                 </Link> 
//                                 </div>                        
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     </div>
//   )
// }

// export default AddContact


import React,{ useState, useEffect } from 'react'; 
import { ContactService } from '../../../services/ContactServices';

import { Link, useNavigate } from 'react-router-dom';


const AddContact = () => {
let navigate = useNavigate(); 

const [state, setState] = useState({
    loading:false, 
    contact: {
        name:'',
        photo:'',
        email:'',
        title:'', 
        company:'', 
        groupId:''
    },
    group:{},
    errorMsg:''
})

const handleSubmit = (e) =>{
    setState({
        ...state, contact:{
            ...state.contact, 
            [e.target.name]:e.target.value 
        }
    })
}
const getGroups = async() =>{
        try {
            setState({...state, loading:true})
            let response = await ContactService.getGroups(); 
            setState({...state, loading:false, group:response.data})
            console.log(group)
        } catch (error) {
            setState({...state, loading:false, errorMsg:error.message})
        }
}
useEffect(()=>{
  getGroups(); 
},[]); 


const sumbitForm = async(e) =>{
    e.preventDefault(); 
    
    try {
        let response = await ContactService.createContact(state.contact); 
        if(response) {
         navigate('/', {replace:true})
        }
    } catch (error) {
        setState({...state, error:error.message}); 
        navigate('/contacts/add')
    }

}
    




const { loading, contact, errorMsg, group } = state; 
 
  return (
   <>
   <div>
    <p className="h3">This is the point where you create your contact </p>
   </div>
   <div className='container'>
    <div className='row m-3'>
        <div className='col-md-4'>
         <form onSubmit={sumbitForm}>
            <div className='mb-2'>
                <input type="text" 
                className="form-control"
                 placeholder="Name"
                 name='name'
                 value={contact.name}
                 onChange={handleSubmit}
                 required={true}
                 />
            </div>
            <div className='mb-2'>
                <input type="text" 
                       className="form-control" 
                       placeholder="photo URL"
                       name='photo'
                       value={contact.photo}
                       onChange={handleSubmit}
                       required={true}
                       />
            </div>
            <div className='mb-2'>
                <input type="number"
                       className="form-control"
                       placeholder="mobile"
                       name="mobile"
                       value={contact.mobile}
                       onChange={handleSubmit}
                       required={true}
                       />
            </div>
            <div className='mb-2'>
                <input type="email" 
                       className="form-control"
                       placeholder="email"
                       name="email"
                       value={contact.email}
                       onChange={handleSubmit}
                       required={true}
                       />
            </div>
            <div className='mb-2'>
                <input type="text"
                       className="form-control"
                       placeholder="company"
                       name="company"
                       value={contact.company}
                       onChange={handleSubmit}
                       required={true}
                       />
            </div>
            <div className='mb-2'>
                <input type="text"
                       className="form-control" 
                       placeholder="title"
                       name="title"
                       value={contact.value} 
                       onChange={handleSubmit} 
                       required={true}
                       />
            </div>
            <select className='form-control'>
                <option value={""}>Select a group </option>
                {
                    group.length > 0 && 
                    group.map((item)=>{
                    return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                })}
                
            </select>
            <input type="submit" className="btn btn-success m-2" value="Create" onClick={sumbitForm}/>
            <Link to={'/contacts/list'} className="btn btn-dark m-2">Cancel</Link>
         </form>
        </div>
    </div>
   </div>
   </>
  )
}

export default AddContact