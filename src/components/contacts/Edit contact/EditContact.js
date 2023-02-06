// import React, { useState, useEffect } from 'react'; 
// import Loading from '../../spinner/Spinner'
// import { Link, useParams, useNavigate } from 'react-router-dom'; 
// import { ContactService } from '../../../services/ContactServices';
// import ContactList from '../Contact list/ContactList';
 

// const EditContact = () => {
//     const navigate = useNavigate();
//     let {contactId} = useParams(); 

// const [state, setState] = useState({
//     loading:false, 
//     contact:{
//         name:'', 
//         photo:'',
//         mobile:'',
//         email:'',
//         company:'',
//         title:''
//     }, 
//     group:[],
//     errorMessage:''
// })

// const fetchContact = async()=>{
//     try {
//         setState({...state, loading:true})
//         const response = await ContactService.getContact(contactId);
//         const groupResponse = await ContactService.getGroups();
//          setState({...state, loading:false, contact:response.data, group:groupResponse.data})
        
// }
// catch (error){
// setState({...state, errorMessage:error.message})
// }
// }

// useEffect(()=>{
//     fetchContact();
// },[contactId])

// const updateForm = (e) =>{
// e.preventDefault(); 
// setState((state)=>{
//     return {...state, contact:{
//         ...state.contact, 
//         [e.target.name]:e.target.value
//     }}
// })

// }

// const submitForm= async(e) =>{
//     e.preventDefault(); 

//     try {
//         let response = await ContactService.editContact(state.contact, contactId); 
//         if(response){
//             navigate('/contacts/list', {replace:true})
//         }
//     } catch (error) {
//         setState({...state, errorMessage:error.message})
//         navigate(`/contacts/edit/${contactId}`, {replace:false})
//     }
// }
// const {contact,loading, errorMessage, group} = state


// //bind the form to the state
// //display the details in the form
// //make the form editable
// //update the form using put
// //navigate back to list upon completion

//       return (
//                 <React.Fragment>
//          <section className='edit-contact'>
//             <div className='container'>
//                 <div className='row'>
//                     <div className='col'>
//                         <p className='text-primary h4 fw-bold'>Edit Contact</p>
//                         <p className='fst-italic'>This is the place where you creacte a new contact.</p>
//                     </div>
//                 </div>
//                 <div className='row align-items-center'>
//                     <div className='col-md-4'>
//                         <form onSubmit={submitForm}>
//                             <div className='mb-2'>
//                                 <input type="text" 
//                                     className='form-control'
//                                     placeholder="Name" 
//                                     name='name'
//                                     value={contact.name} 
//                                     onChange={updateForm} 
//                                     />
//                             </div>
//                             <div className='mb-2'>
//                                 <input type="text" 
//                                     className='form-control'
//                                     placeholder="Photo"
//                                     name="photo"
//                                     value={contact.photo}
//                                     onChange={updateForm}
//                                     />
//                             </div>
//                             <div className='mb-2'>
//                                 <input type="number"
//                                      className='form-control' 
//                                      placeholder="Mobile"
//                                      name='mobile'
//                                      value={contact.mobile}
//                                      onChange={updateForm}
//                                      />
//                             </div>
//                             <div className='mb-2'>
//                                 <input type="email" 
//                                     className='form-control' 
//                                     placeholder="Email"
//                                     name='email'
//                                     value={contact.value}
//                                     onChange={updateForm}
//                                     />
//                             </div>
//                             <div className='mb-2'>
//                                 <input type="text" 
//                                     className='form-control' 
//                                     placeholder="Company"
//                                     name='company'
//                                     value={contact.company}
//                                     onChange={updateForm}
//                                     />
//                             </div>
//                             <div className='mb-2'>
//                                 <input type="text" 
//                                     className='form-control'
//                                      placeholder="Title"
//                                     name='title'
//                                     value={contact.title}
//                                     onChange={updateForm}
//                                      />
//                             </div>
//                             <div className='mb-2'>
//                                 <select className='form-control'>
//                                     <option value="">Select a Group</option>
//                                     {
//                                         group.length > 0 &&
//                                         group.map((group)=>{
//                                             return <option key={group.id}>{group.name}</option>
//                                         })
//                                     }
//                                 </select>
//                                 <div className='m-2'>
//                                     <input type='submit' className="btn btn-success" value="Update"/>  
//                                 <Link to={'/contacts/list'} className="btn btn-dark ms-2">
//                                     Cancel   
//                                 </Link> 
//                                 </div>                        
//                             </div>
//                         </form>
//                     </div>
//                     <div className='col-md-6'>
//                         <img src="" className='contact-img'/>
//                     </div>
//                 </div>
//             </div>
//         </section>
//         </React.Fragment>
                    
//   )
// }

// export default EditContact



import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactServices';
import Spinner from '../../spinner/Spinner'; 
const EditContact = () => {

    const {contactId} = useParams(); 
    const navigate = useNavigate()

  const [state, setState] = useState({
    loading:false,
    contact:{
        name:'',
        photo:'', 
        mobile:'', 
        email:'', 
        company:'', 
        title:'', 
        groupId:''

    },
    group:[],
    errorMsg:''
  }); 

const getContacts = async()=>{
    try {
        setState({...state, loading:true})
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups(response.data)
        console.log(groupResponse.data)
        setState({...state, loading:false, contact:response.data, group:groupResponse.data})
    } catch (error) {
       setState({...state, loading:false, error:error.message}); 
    }
}

useEffect(()=>{
    getContacts(); 
},[contactId])

  const handleForm = (e) =>{
    setState({
        ...state, 
        contact:{
            ...state.contact, 
            [e.target.name]:e.target.value
        }
    })
  }

  const handleSubmit =async(e) =>{
    e.preventDefault(); 
     try {
        setState({...state, loading:true}); 
        let response = await ContactService.updateContact(state.contact, contactId); 
        if(response) {
           navigate('/contacts/list', {replace:true}); 
        }
     } catch (error) {
        setState({...state, loading:false, errorMsg:error.message})
        navigate(`/contacts/edit/${contactId}`, {replace:false}) 
    }    
  }

const {loading, contact, group, error} = state; 
  return (
    <>
    {
        loading? <Spinner/>:
        <>
        <div>
        <p className='h3'>This is where you edit your contact</p>
    </div>
    <section className='container'>
        <div className='row align-items-center'>
            <div className='col-md-4'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <input type="text" 
                                required={true}
                                className="form-control" 
                                placeholder="Name" 
                                name="name"
                                value={contact.name}
                                onChange={handleForm}
                                />
                    </div>
                    <div className="mb-2">
                        <input type="text"
                               className="form-control" 
                               placeholder="PhotoUrl" 
                               
                               />
                    </div>
                    <div className="mb-2">
                        <input type="number"
                               className="form-control"
                               placeholder="Mobile" 
                               name='mobile'
                               value={contact.mobile} 
                               onChange={handleForm}   
                               />
                    </div>
                    <div className="mb-2">
                        <input type="email"
                               className="form-control" 
                               placeholder="email"
                               name='email'
                               value={contact.email} 
                               onChange={handleForm} 
                               />
                    </div>
                    <div className="mb-2">
                        <input type="text" 
                               className="form-control"
                               placeholder="Company" 
                               name='company'
                               value={contact.company} 
                               onChange={handleForm}
                               />
                    </div>
                    <div className="mb-2">
                        <input type="text" 
                               className="form-control" 
                               placeholder="Title"
                               name='title'
                               value={contact.title} 
                               onChange={handleForm} 
                               />
                    </div>
                    <div className="mb-2">
                        <select 
                           className="form-control"
                           name='groupId'
                           value={contact.groupId}
                           onChange={handleForm}    
                           >
                            <option value="">Select a Group</option>
                            {
                                group.length > 0 && group.map((item)=>{
                                   return <option key={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-2">
                        <input type="submit" className="btn btn-success" value="Edit" />
                        <Link to ={'/contacts/list'} className="m-2">
                        <input type="submit" className="btn btn-dark" value="Cancel" />
                        </Link>
                    </div>

                </form>

            </div>
            <div className='col-md-6'>
                <img src={contact.photo} alt="dummy_img" className='contact-img' />
            </div>
        </div>
        
    </section>
        </>
    }
    
    </>
  )
}

export default EditContact























