import React, { useState } from 'react'
import Task from './Task'
import { useLogin } from '../../Store/LoginStore';
export default function Home() {
    const [taskMark,settaskMark] = useState({});
    const {isLoged} = useLogin();

    return (
        <>
            {
                isLoged !== false ? <div className='w-full min-h-full p-10'>
                    {/* cart view */}
                    <div className='w-full h-auto md:h-48 flex flex-wrap items-center md:flex-nowrap gap-4 md:gap-2  md:justify-around'>
                        <div className='w-full lg:w-78 md:w-52 h-auto md:h-38 bg-blue-400 rounded-2xl flex flex-col justify-center items-start p-4 md:pl-6'>
                            <h1 className='text-2xl md:text-4xl font-semibold'>{taskMark.newTask}</h1>
                            <p className='text-xl md:text-3xl font-semibold'>New Task</p>
                        </div>
                        <div className='w-full lg:w-78 md:w-52 h-auto md:h-38 bg-emerald-600 rounded-2xl flex flex-col justify-center items-start p-4 md:pl-6'>
                            <h1 className='text-2xl md:text-4xl font-semibold'>{taskMark.completedTasks}</h1>
                            <p className='text-xl md:text-3xl font-semibold'>Completed Task</p>
                        </div>
                        <div className='w-full lg:w-78 md:w-52 h-auto md:h-38 bg-yellow-500 rounded-2xl flex flex-col justify-center items-start p-4 md:pl-6'>
                            <h1 className='text-2xl md:text-4xl font-semibold'>{taskMark.activeTasks}</h1>
                            <p className='text-xl md:text-3xl font-semibold'>Accepted Task</p>
                        </div>
                        <div className='w-full lg:w-78 md:w-52 h-auto md:h-38 bg-pink-400 rounded-2xl flex flex-col justify-center items-start p-4 md:pl-6'>
                            <h1 className='text-2xl md:text-4xl font-semibold'>{taskMark.failedTasks}</h1>
                            <p className='text-xl md:text-3xl font-semibold'>Failed Task</p>
                        </div>
                    </div>
                    {/* appned task  */}
                    <Task parentMethod = {settaskMark}/>

                </div> : <h1 className='text-center text-3xl font-semibold'>Please Login To Continue!!!</h1>
            }
        </>
    )
}
