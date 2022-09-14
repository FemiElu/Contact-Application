import React,{ useState, useEffect } from 'react'; 
import { Link, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactServices';
import Spinner from '../../spinner/Spinner';
const ContactList = () => {


    const [query, setQuery] = useState({

    })


    const {contactId} = useParams(); 

    const [state, setState] = useState({
        loading:false, 
        contacts:[],
        filteredContacts:[],
        errorMessage:''
    }); 

    const searchContacts=(e)=>{
        setQuery({
            ...query, text:e.target.value
        })
        let theContacts = state.contacts.filter((contact)=>{
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setState((state)=>{
            return {...state, filteredContacts:theContacts}
        })
    }

    const fetchContacts = async() =>{
        setState({...state, loading:true}); 
        try {
            const response = await ContactService.getAllContacts();
        setState((state)=>{
            return {...state, loading:false, contacts:response.data, filteredContacts:response.data}
        })
        } catch (error) {
            setState({...state, loading:false, errorMessage:error.message})
        }
    }

    useEffect(()=>{
        fetchContacts();
    },[])

    const onClickDelete =async (contactId) =>{
        try {
            const response = await ContactService.deleteContact(contactId); 
        
            if(response) {
                setState((state)=>{
                    return {...state, loading:true}
                })
                let response = await ContactService.getAllContacts(); 
                setState({...state, loading:false, contacts:response.data, filteredContacts:response.data})
            }
        } catch (error) {
            setState({...state, loading:false, error:error.message})
        }
    }

    const {loading, contacts, error, filteredContacts} = state; 

  return (
    <React.Fragment>
        <section className='contact-search p-3'>
            <div className='container'>
                <div className='row'>
                <div className='col'>
                    <p className='h3'>Contact Manager 
                    <Link to={'/contacts/add'}>
                    <span className='btn btn-success ms-3'>
                        <i className='fa fa-plus-circle me-2'/>New
                        </span> </Link></p> 
                        <p className='fst-italic'>This is where we list all the contacts for everyone to see</p>
                </div>
                </div>
                <div className='row'>

                    <div className='col-md-6'>
                    <form className='row'>
                        <div className='col'>
                        <div className='mb-2'>
                        <input type='text'
                             className='form-control'
                             placeholder='Search Name'
                             name='text'
                             value={query.text}
                             onChange={searchContacts}
                             />
                        </div>
                        </div>
                        <div className='col'>
                        <div className='mb-2'>
                        <input type='submit' className='btn btn-outline-success' value='Search'/>
                        </div> 
                        </div>            
                    </form>
                    </div>
                </div>
            </div>
        </section>
{
    loading? <Spinner/>: <>
    <section className='contact-list'>
    <div className='container'>
        <div className='row'>
            {
               filteredContacts.length > 0 &&  filteredContacts.map((contact)=>{
                    return (
                        <div className='col-md-6' key={contact.id}>
                        <div className='card my-2'>
                            <div className='card-body'>
                                <div className='row align-items-center d-flex justify-content-around'>
                                    <div className='col-md-4'>
                                        <img src={contact.photo} alt='first' className='contact-img'/>
                                            </div>
                                            <div className='col-md-7'>
                                            <ul className='list-group'>
                                                <li className='list-group-item list-group-item-action'>
                                                    Name: <span className='fw-bold'>{contact.name}</span>
                                                </li>
                                                <li className='list-group-item list-group-item-action'>
                                                    Mobile: <span className='fw-bold'>{contact.mobile}</span>
                                                </li>
                                                <li className='list-group-item list-group-item-action'>
                                                    Email: <span className='fw-bold'>{contact.email}</span>
                                                </li>
                                                
                                            </ul>
                                            </div>
        
                                            <div className='col-md-1 d-flex flex-column align-items-center'>
                                           <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'>
                                            <i className='fa fa-eye'/>
                                           </Link>
                                           <Link to={`/contacts/edit/${contact.id}`} className='btn btn-success my-1'>
                                            <i className='fa fa-pen'/>
                                           </Link>
                                           <button className='btn btn-danger my-1' onClick={()=>onClickDelete(contact.id)}>
                                            <i className='fa fa-trash'/>
                                           </button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        
                    )
                })
            }
           

                    
                </div>
            </div>

        </section>
    </>
}

    </React.Fragment>
  )
}

export default ContactList