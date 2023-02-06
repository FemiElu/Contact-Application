// import React from 'react'; 
// import Navbar from './components/navbar/Navbar';
// import { Routes, Route, Navigate } from 'react-router-dom'; 
// import AddContact from './components/contacts/Add contact/AddContact';
// import ContactList from './components/contacts/Contact list/ContactList';
// import ViewContact from './components/contacts/View contact/ViewContact';
// import EditContact from './components/contacts/Edit contact/EditContact';


// const App = () => {
//   return (
//     <div className='app'>
      
//       <Navbar/>
//       <Routes>
//         <Route path={'/'}  element = {<Navigate to={'/contacts/list'}/>}/>
//         <Route path={'/contacts/list'} element={<ContactList/>}/>
//         <Route path={'/contacts/add'} element={<AddContact/>}/>
//         <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
//         <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default App


import React from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom'; 
import ContactList from './components/contacts/Contact list/ContactList';
import AddContact from './components/contacts/Add contact/AddContact'; 
import EditContact from './components/contacts/Edit contact/EditContact'; 
import ViewContact from './components/contacts/View contact/ViewContact'; 
import Navbar from './components/navbar/Navbar';

const App = () => {
  return (
    <>

    <Navbar/>
    
    <Routes>
      <Route path='/' element= {<Navigate to = {'contacts/list'}/>}/>
      <Route path={'/contacts/edit/:contactId'} element= {<EditContact/>}/>
      <Route path='/contacts/add' element= {<AddContact/>}/>
      <Route path='contacts/list' element= {<ContactList/>}/>
      <Route path= '/contacts/view/:contactId' element= {<ViewContact/>}/>
    </Routes>
    </>
  )
}

export default App