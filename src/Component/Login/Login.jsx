import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../Store/LoginStore';
import { ToastContainer } from 'react-toastify';
import { Msgerror, Msgsuccessfull } from '../Toast/Toast';
function Login() {
    const {setisLoged} = useLogin();

    const [forminfo,setForminfo] = useState({
        username:'',
        password:'',
    });

    const navigate = useNavigate();

    const handleChange = (event)=>{
        setForminfo({
            ...forminfo,
            [event.target.name] : event.target.value
        })
    }

    const handleSave = () => {
        if(forminfo.username.length <=0 || forminfo.password <=0 ){
            Msgerror("please enter the information given below");
        }else{
            localStorage.setItem('userinfo', JSON.stringify(forminfo));
            Msgsuccessfull("Login Successfully!!");
        }
    };

    const handleLogin = ()=>{
        handleSave();
        setisLoged(true);   
        // code to navigate the user
        setTimeout(() => {
            const userRole = JSON.parse(localStorage.getItem('userinfo'));
            if(userRole.role !== "admin"){
                navigate('/',{replace:true})
            }
            else {
                navigate('/admin',{replace:true})
            }
        },2000);

        setForminfo({
            username:'',
            password:''
        })
    }


  return (
    <div className='w-full h-screen justify-center flex items-center p-5'>
      <div className='flex flex-col gap-3 w-96 h-96 '>
        <h1 className='text-2xl font-semibold text-center my-2 text-emerald-400 '>Login Form</h1>
        <label htmlFor="" className='text-lg font-semibold'>
            Username <br/>
        </label>
        <input type="text" placeholder='username' name='username' className='w-full border py-1 px-2 outline-none rounded' onChange={handleChange} value={forminfo.username}/>
        
        <label htmlFor="" className='text-lg font-semibold'>
            Password <br/>
        </label>
        <input type="text" placeholder='password' name='password' className='w-full border py-1 px-2 outline-none rounded' onChange={handleChange} value={forminfo.password}/>
        <label htmlFor="" className='text-lg font-semibold'>
            Role
        </label>
        <div className='flex gap-2'>
            <input type="Radio"  name='role' value="admin" className='border' onChange={handleChange} id="admin"/>
            <label htmlFor='admin'>Admin</label>
        
            <input type="Radio" name='role' value="employee" className='border' onChange={handleChange}  id='employee'/>
            <label htmlFor='employee'>Employee</label>
        </div>

        <button className='mt-4 bg-emerald-400 py-2 px6 rounded-xl cursor-pointer text-lg font-semibold hover:bg-emerald-600 transition-all' onClick={handleLogin}>LoginIn</button>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Login;
