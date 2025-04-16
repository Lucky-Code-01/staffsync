import React from 'react'
import hand from '../../Image/hand.png'
import {useNavigate} from 'react-router-dom'
import { useLogin } from '../Store/LoginStore';
function Navbar() {
    const {isLoged,setisLoged} = useLogin();
    const navigate = useNavigate();
    const userinfo = JSON.parse(localStorage.getItem('userinfo'));
    const login = ()=>{
        navigate('/login',{replace:true});
    }

    const logout = ()=>{
        localStorage.removeItem('userinfo');
        setisLoged(false);
        navigate('/',{replace:true});
    }

    return (
        <div className='w-full min-h-42 flex md:flex-row justify-between items-center p-10'>
            <div className='flex flex-col md:flex-row items-start'>
                <h1 className='text-3xl md:text-4xl font-semibold'>Hello <br /> {userinfo !== null ? userinfo.username:''}</h1>
                <img src={hand} alt="" width={80} height={80} className='md:w-24 md:h-24' />
            </div>
            <button className='outline-none border-none bg-red-800 px-4 md:px-8 cursor-pointer py-2 text-lg md:text-2xl' onClick={userinfo !== null ? logout : login}>{userinfo !== null ?'Logout':'Login'}</button>
        </div>
    )
}

export default Navbar
