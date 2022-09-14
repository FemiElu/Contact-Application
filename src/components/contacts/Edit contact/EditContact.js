import React, { useState, useEffect } from 'react'; 
import Loading from '../../spinner/Spinner'
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import { ContactService } from '../../../services/ContactServices';
import ContactList from '../Contact list/ContactList';
 

const EditContact = () => {
    const navigate = useNavigate();
    let {contactId} = useParams(); 

const [state, setState] = useState({
    loading:false, 
    contact:{
        name:'', 
        photo:'',
        mobile:'',
        email:'',
        company:'',
        title:''
    }, 
    group:[],
    errorMessage:''
})

const fetchContact = async()=>{
    try {
        setState({...state, loading:true})
        const response = await ContactService.getContact(contactId);
        const groupResponse = await ContactService.getGroups();
         setState({...state, loading:false, contact:response.data, group:groupResponse.data})
        
}
catch (error){
setState({...state, errorMessage:error.message})
}
}

useEffect(()=>{
    fetchContact();
},[contactId])

const updateForm = (e) =>{
e.preventDefault(); 
setState((state)=>{
    return {...state, contact:{
        ...state.contact, 
        [e.target.name]:e.target.value
    }}
})

}

const submitForm= async(e) =>{
    e.preventDefault(); 

    try {
        let response = await ContactService.editContact(state.contact, contactId); 
        if(response){
            navigate('/contacts/list', {replace:true})
        }
    } catch (error) {
        setState({...state, errorMessage:error.message})
        navigate(`/contacts/edit/${contactId}`, {replace:false})
    }
}
const {contact,loading, errorMessage, group} = state
      return (
            <React.Fragment>
                {loading? <Loading/> : <React.Fragment>
                <React.Fragment>
         <section className='edit-contact'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <p className='text-primary h4 fw-bold'>Edit Contact</p>
                        <p className='fst-italic'>This is the place where you creacte a new contact.</p>
                    </div>
                </div>
                <div className='row align-items-center'>
                    <div className='col-md-4'>
                        <form onSubmit={submitForm}>
                            <div className='mb-2'>
                                <input type="text" 
                                    className='form-control'
                                    placeholder="Name"
                                    name='name'
                                    value={contact.name}
                                    onChange={updateForm}
                                    
                                    />
                            </div>
                            <div className='mb-2'>
                                <input type="text" 
                                    className='form-control'
                                    placeholder="Photo"
                                    name='photo'
                                    value={contact.photo}
                                    onChange={updateForm}
                                    />
                            </div>
                            <div className='mb-2'>
                                <input type="number"
                                     className='form-control' 
                                     placeholder="Mobile"
                                     name='mobile'
                                     value={contact.mobile}
                                     onChange={updateForm}
                                     />
                            </div>
                            <div className='mb-2'>
                                <input type="email" 
                                    className='form-control' 
                                    placeholder="Email"
                                    name='email'
                                    value={contact.email}
                                    onChange={updateForm}
                                    />
                            </div>
                            <div className='mb-2'>
                                <input type="text" 
                                    className='form-control' 
                                    placeholder="Company"
                                    name='company'
                                    value={contact.company}
                                    onChange={updateForm}
                                    />
                            </div>
                            <div className='mb-2'>
                                <input type="text" 
                                    className='form-control'
                                     placeholder="Title"
                                     name='title'
                                     value={contact.title}
                                     onChange={updateForm}
                                     />
                            </div>
                            <div className='mb-2'>
                                <select className='form-control'>
                                    <option value="">Select a Group</option>
                                    {
                                        group.length > 0 &&
                                        group.map((item)=>{
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })
                                    }
                                </select>
                                <div className='m-2'>
                                    <input type='submit' className="btn btn-success" value="Update"/>  
                                <Link to={'/contacts/list'} className="btn btn-dark ms-2">
                                    Cancel   
                                </Link> 
                                </div>                        
                            </div>
                        </form>
                    </div>
                    <div className='col-md-6'>
                        <img src={contact.photo} className='contact-img'/>
                    </div>
                </div>
            </div>
        </section>
        </React.Fragment>
                    
                    
                    </React.Fragment>}
            </React.Fragment>
  )
}

export default EditContact