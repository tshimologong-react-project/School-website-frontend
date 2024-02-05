import { Paper,Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/UserDetailsStyle.css'
import EditUser from './EditUser';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInstanceConfig/axiosInstance'
import {jwtDecode} from 'jwt-decode';
import deleteIcon from '../assets/icons8-delete-100.png'
import editIcon from '../assets/icons8-edit.svg'
import Sidebar from './Sidebar';
import menuIcon from '../assets/icons8-menu.svg'


// npm install @mui/material @emotion/react @emotion/styled for table


function UserDetails() {

    const naviagte=useNavigate()

    const [userData,setData] = useState([]);
    const [loginUser,setLoginUser] = useState([]);
    const [userName,setName] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 3;

    const [isEditComponent,setIsEditComponent] = useState(false)
    const [isAddComponent,setIAddComponent] = useState(false)

 
    const [role, setRole] = useState('');
    const [token_user, setToken_user] = useState('');
    const token = localStorage.getItem('jwtToken');

    const [slide_out,setSlide_out] = useState(true);
    const [count,setCount] = useState(null)

    const handletoggle = () =>{setSlide_out(!slide_out);}

    
    //check if local storage value exist
    const check_token = () =>{ if(token === null){return false}else{return true}}

    useEffect(()=>{
      const count_user= async () => {

        try {const response = await axios.get('http://localhost:8080/user/count');setCount(response.data);}
        catch (error) { console.error('Error during login:', error);}}

        count_user();
    },[count])


    useEffect(() => {

        const validate = () =>{
            try {
                const decodedToken = jwtDecode(token);
                if(check_token()){setRole(decodedToken.role[0].authority);setToken_user(decodedToken.sub)}
                
            } catch (error) {console.log(error) }
        }
        validate()
      }, [token]);




  
    const isTokenExpired = () => { const decodedToken = jwtDecode(token); const currentTime = Date.now() / 1000; 
        return decodedToken.exp < currentTime; };

    const result = async () => {
        try {
          const response = await axiosInstance.get(`/pagination/${currentPage}/${pageSize}`);
          setData(response.data.content);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            if (!token || isTokenExpired() || count===0) {
              naviagte('/login');
              localStorage.removeItem('jwtToken')
            } else if (token) {
              getLoginUser();
              await result();
            }
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, [currentPage, totalPages, token]);
      

    const getLoginUser = async ()=>{
    
        try { const response = await axiosInstance.get(`/findByUsername/${token_user}`);
          setLoginUser(response.data);}
        catch (error) { console.log(error); }

    };


    const getUserName = (user)=>{ setName(user);setIsEditComponent(true)}

    const switchToAddCom = ()=>{setIAddComponent(true);naviagte('/register')}


    const deleteuserData = async (userName) =>{

        try {await axiosInstance.delete(`/deleteUser/${userName}`);alert(userName +' deleted successfuly'); result();}
        catch (error) { alert('Not authorized of this operatin') }  
    }


  return (
    <div className='container-table'>

      <Sidebar toggle={slide_out}/>
  
    <div className='switch-div'>

            <div className='top-info'>
            
                    <Link className='_menue' onClick={()=>handletoggle()}>
                    <img src={menuIcon}/>
                    </Link>
                    <div className='_profile'>
                        <img src={`data:image/jpeg;base64,${loginUser.photo}`}/>
                        <p>{loginUser.userName}</p>
                    </div>
        
            </div>
       

        {isEditComponent ? (<EditUser userName={userName} displayUser={setIsEditComponent}reload_user ={getLoginUser}  reload_admin ={result} role={role}/>):
            (      <div className='switch-div'>
            <h3 className='title'>user details</h3>
            
            <div className='table-wrapper'>
            <h3 className='user-heading'>User</h3>
            {role.includes('ROLE_USER') ? (null):
            ( <button className='add-user' onClick={()=>switchToAddCom()}>Add User</button>)}
           
            <TableContainer className='user-table' >
                <Table>
                    
                    <TableHead>
                    <TableRow className='table-header'>
                        <TableCell ><h6>Full Name</h6></TableCell>
                        <TableCell><h6>User Name</h6></TableCell>
                        <TableCell><h6>Designation</h6></TableCell>
                        <TableCell><h6>Action</h6></TableCell>
                        
                    </TableRow>
                    </TableHead>

                        {role.includes('ROLE_USER') ?
                        (  <TableBody>
                       
                            <TableRow >
                            <TableCell>
                                <div className='container-table_profile'>
                                    <img className='photo' src={`data:image/jpeg;base64,${loginUser.photo}`}/>
                                    <p><span>{loginUser.firstName}</span> {loginUser.lastName}<span></span></p>
                                </div>
                                </TableCell>
                            <TableCell>{loginUser.userName}</TableCell>
                            <TableCell>{loginUser.designation}</TableCell>
                           
                            <TableCell >
                                <div className='action-link-button'>
                                <Link className='delete-link' onClick={()=>deleteuserData(loginUser.userName)}>
                                <img src={deleteIcon}/>
                                </Link>
        
                                <Link className='edit-link' onClick={()=>getUserName(loginUser.userName)} >
                                <img src={editIcon}/>
                                </Link>
                                </div>
        
        
                            </TableCell>
                            </TableRow>
                        
                           </TableBody>):

                        ( <TableBody>
                        {userData.map((row)=>(
                            <TableRow key={row.userName}>
                            <TableCell>
                                <div className='container-table_profile'>
                                    <img className='photo' src={`data:image/jpeg;base64,${row.photo}`}/>
                                    <p><span>{row.firstName}</span> {row.lastName}<span></span></p>
                                </div>
                                </TableCell>
                            <TableCell>{row.userName}</TableCell>
                            <TableCell>{row.designation}</TableCell>
                            <TableCell >
                                <div className='action-link-button'>
                                <Link className='delete-link' onClick={()=>deleteuserData(row.userName)}>
                                <img src={deleteIcon}/>
                                </Link>
        
                                <Link className='edit-link'onClick={()=>getUserName(row.userName)}>
                                <img src={editIcon}/>
                                </Link>
                                </div>
        
        
                            </TableCell>
                            </TableRow>
    
                        ))}
    
                        
                        </TableBody>)}
                  
                       
                  
            


                </Table>
            </TableContainer>
            
            
            </div>
            {role.includes('ROLE_USER') ?(''):(
            <div className='pagingButtonResult'>
            <button className='leftResult' onClick={()=>setCurrentPage(currentPage - 1)} disabled={currentPage === 0}/>
            <p>page: {currentPage + 1} of {totalPages}</p>
            <button className='rightResult' onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}/>
</div>
            )}

    
            </div>)
        }

  
    
    </div>
      

    </div>
  )
}

export default UserDetails
