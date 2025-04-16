import React, {useState } from 'react'
import './Scroll.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import {useSelector} from 'react-redux';
function Task({parentMethod}) {
  // function which convert the name
  const handleName = (name)=>{
    let newName = name?name.charAt(0).toUpperCase() + name.slice(1).toLowerCase():'';
    return newName;
  }

  const divColor = ["#059669","#9D159D","#164E63","#F80551","#059669"];
  const logedUser = JSON.parse(localStorage.getItem('userinfo')) || "";
  const capitalName = handleName(logedUser.username);
  const allResponse = useSelector((state)=>state.task);
  const individualData = allResponse.filter((item)=>item.workUser === capitalName);
  const acceptedWork = new Array(individualData.length);
  const [acceptTesk,setacceptTask] = useState(
    acceptedWork.fill(false)
  );

  
  const handleAccept =(index,indexId)=>{ 
    let updateState = [...acceptTesk];
    updateState[index] = true;
    setacceptTask(updateState);

    //accept task
    // Fetch data from localStorage
    const allTasks = JSON.parse(localStorage.getItem('taskData')) || [];

    // Find and update the specific task
    const updatedTasks = allTasks.map((task) => {
        if (task.id === indexId) {
            return { ...task,active:true}; // Update status
        }
        return task; // Keep other tasks unchanged
    });

    // Save updated data back to localStorage
    localStorage.setItem('taskData', JSON.stringify(updatedTasks));
    parentMethod(countTaskStatuses()) 
  }

  // const handleComplete = (indexId)=>{
  //   const fetchData = allResponse.find((data)=>data.id === indexId);
  //   const updatedData = {...fetchData,completed:true}
  //   // // here the updated data to localstorage
  //   const previousData = allResponse.map((item)=>(
  //     item.id === indexId ? updatedData : item
  //   ))
  //   // save to localstorage
  //   localStorage.setItem('taskData', JSON.stringify(previousData));
  // }

  // const handleFail = (indexId)=>{
  //   const fetchData = allResponse.find((data)=>data.id === indexId);
  //   const updatedData = {...fetchData,failed:true}
  //   // // here the updated data to localstorage
  //   const previousData = allResponse.map((item)=>(
  //     item.id === indexId ? updatedData : item
  //   ))
  //   // save to localstorage
  //   localStorage.setItem('taskData', JSON.stringify(previousData));
  // }
  const handleComplete = (indexId) => {
    // Fetch data from localStorage
    const allTasks = JSON.parse(localStorage.getItem('taskData')) || [];

    // Find and update the specific task
    const updatedTasks = allTasks.map((task) => {
        if (task.id === indexId) {
            return { ...task, completed: true, failed: false, active:false }; // Update status
        }
        return task; // Keep other tasks unchanged
    });

    // Save updated data back to localStorage
    localStorage.setItem('taskData', JSON.stringify(updatedTasks));
    parentMethod(countTaskStatuses()) // Recount statuses after update
  };

  const handleFail = (taskId) => {
    // Fetch data from localStorage
    const allTasks = JSON.parse(localStorage.getItem('taskData')) || [];

    // Find and update the specific task
    const updatedTasks = allTasks.map((task) => {
        if (task.id === taskId) {
            return { ...task, failed: true, completed: false ,active:false}; // Update status
        }
        return task; // Keep other tasks unchanged
    });

    // Save updated data back to localStorage
    localStorage.setItem('taskData', JSON.stringify(updatedTasks));
    parentMethod(countTaskStatuses()) // Recount statuses after update
  };

  const countTaskStatuses = () => {
    // Fetch data from localStorage
    const allTasks = JSON.parse(localStorage.getItem('taskData')) || [];
    const individualData = allTasks.filter((item)=>item.workUser === capitalName);

    // Count based on conditions
    const completedTasks = individualData.filter((task) => task.completed === true).length;
    const failedTasks = individualData.filter((task) => task.failed === true).length;
    const activeTasks = individualData.filter((task) => task.active === true).length;
    const newTask = individualData.filter((task)=> task.newTask === true).length;
    
    // Return counts (optional if needed)
    return {
        completedTasks,
        failedTasks,
        activeTasks,
        newTask
    };
  };


    return (
      <Swiper 
        className='w-full mt-6'
        spaceBetween={20}
        slidesPerView={1} // Number of slides visible at once
        navigation // Enables navigation buttons
        pagination={{ clickable: true }} // Enables pagination dots
        autoplay={{ delay: 3000 }} 
        breakpoints={{
          640:{
            slidesPerView:2,
          },
          768: {
            slidesPerView: 2, // For medium screens (tablet)
          },
          1024: {
            slidesPerView: 2, // For large screens (desktop)
          },
          1280: {
            slidesPerView: 3, // For extra-large screens
          },
        }}>
        {/* Box 1 */}
        {
          individualData.map((item,index)=>{
            return <SwiperSlide key={index}>
            <div className='scrollBox overflowY-auto p-5 rounded-2xl flex flex-col justify-around h-70 cursor-grab' style={{backgroundColor : `${divColor[index]}`}}>
              {/* Date Div */}
              <div className='flex items-center gap-2 justify-between'>
                <span className='bg-amber-400 text-black font-semibold text-sm lg:text-lg px-3 lg:px-4 py-0.5 rounded'>{item.category}</span>
                <span className='text-sm lg:text-lg font-semibold'>{item.date}</span>
              </div>
              {/* Detail Div */}
              <div className='flex flex-col gap-2 mt-2'>
                <h1 className='text-lg lg:text-2xl font-semibold'>{item.title}</h1>
                <p className="text-xs sm:text-sm lg:text-base mt-1">{item.description}</p>
                {
                acceptTesk[index] !==true ?<button className='bg-blue-400 text-white font-semibold text-sm lg:text-lg px-6 lg:px-8 py-2 rounded mt-2 hover:bg-blue-500 transition-all duration-200' onClick={()=>handleAccept(index,item.id)}>Accept Task</button>:<div className='flex justify-between items-center'>
                  <button className='bg-emerald-500 py-1 px-2 rounded border-none' onClick={()=>handleComplete(item.id)}>Mark as Complete</button>
                  <button className='bg-red-600 py-1 px-2 rounded border-none' onClick={()=>handleFail(item.id)}>Mark as Failded</button>
                </div>
              }
              </div>
            </div>
          </SwiperSlide>
          })
        }
      </Swiper>
    )
}

export default Task
