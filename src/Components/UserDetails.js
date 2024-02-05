import { Paper,Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/UserDetailsStyle.css'
import EditUser from './EditUser';
import Topnav from './Topnav';
import AddUser from './AddUser';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInstanceConfig/axiosInstance'
import {jwtDecode} from 'jwt-decode';


// npm install @mui/material @emotion/react @emotion/styled for table


function UserDetails() {

    const naviagte=useNavigate()

    const [userData,setData] = useState([]);
    const [userName,setName] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 3;
    const [isEditComponent,setIsEditComponent] = useState(false)
    const [isAddComponent,setIAddComponent] = useState(false)

 
    const [userRole, setUserRole] = useState('');
    const token = localStorage.getItem('jwtToken')
  
    useEffect(()=>{
        try {
            const decodedTokenRole = jwtDecode(token).role[0].authority;

            setUserRole(decodedTokenRole)
            console.log(decodedTokenRole)
        } catch (error) {
            console.log(error)
        }
     
    },[token])
  

    useEffect(()=>{
      result();
  
  },[currentPage,totalPages]);




  const result = async ()=>{

    try {
        const response = await axiosInstance.get(`/pagination/${currentPage}/${pageSize}`); 
      setData(response.data.content);
        setTotalPages(response.data.totalPages);
        console.log(response)
    } catch (error) {
        console.log(error);
        
    }

};


const getUserNmae = (userNane,e)=>{
    e.preventDefault();
    setName(userNane);
    setIsEditComponent(true)
}

const switchToAddCom = ()=>{
    setIAddComponent(true);
    naviagte('/addUser')
}


const deleteuserData = async (userName) =>{

    try {
        await axiosInstance.delete(`/deleteUser/${userName}`);
        alert(userName +' deleted successfuly')
        result();
    } catch (error) {
        alert('Not authorized of this operatin')
    }
    
}


  return (
    <div className='container-table'>
        <Topnav/>
      

        {isEditComponent ? (<EditUser userName={userName} displayUser={setIsEditComponent} reload ={result}/>):
        
        (<div className='switch-div'>
        
        {/* <Link className='back-arrow' to={'/admin'}>&#8592;</Link> */}
        <h3 className='title'>List of userData</h3>
        
        
        <div className='table-wrapper'>
        <button className='add-user' onClick={()=>switchToAddCom()}>Add User</button>
        <TableContainer className='user-table' >
            <Table>
                
                <TableHead>
                <TableRow className='table-header'>
                    <TableCell >Username</TableCell>
                    <TableCell>First name</TableCell>
                    <TableCell>Last name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
                </TableHead>
        
                <TableBody>
                {userData.map((row) => (
                    <TableRow key={row.userName}>
                    <TableCell>{row.userName}</TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell><img className='photo' src={`data:image/jpeg;base64,${row.photo}`}/></TableCell>
                 
                    <TableCell>
                        <Button variant="contained" color="primary" onClick={(e)=>getUserNmae(row.userName,e)}>
                        Edit
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Button variant="contained" color="secondary" onClick={()=>deleteuserData(row.userName)}>
                        Delete
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        
        {/* {console.log(userName)} */}
        
        
        
        </div>
        <div className='pagingButtonResult'>
                    <button className='leftResult' onClick={()=>setCurrentPage(currentPage - 1)} disabled={currentPage === 0}/>
                    <p>page: {currentPage + 1} of {totalPages}</p>
                    <button className='rightResult' onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}/>
        </div>
        </div>)
        }


    </div>
  )
}

export default UserDetails
