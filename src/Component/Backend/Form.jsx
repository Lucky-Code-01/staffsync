import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../ReduxStore/WorkSlice';
import { nanoid } from "nanoid";
import './Responsive.css'
function Form() {
    // disptach here
    const disptch = useDispatch();
    const [taskCount, settaskCount] = useState([]);
    const workStore = useSelector((state) => state.task);
    const [inpData, setinpData] = useState({
        title: '',
        date: '',
        workUser: '',
        category: '',
        description: ''
    })

    const handleInput = (event) => {
        setinpData({
            ...inpData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = () => {
        let updateData = {
            ...inpData,
            active: false,
            newTask: true,
            completed: false,
            failed: false,
            id: nanoid()
        }
        disptch(addTask(updateData));
        setinpData({
            title: '',
            date: '',
            workUser: '',
            category: '',
            description: '',
        })
    }

    const getUserTaskSummary = () => {
        // Fetch data from localStorage
        const allTasks = JSON.parse(localStorage.getItem('taskData')) || [];
        // Create a map to group user data
        const userSummaryMap = allTasks.reduce((acc, task) => {
            const username = task.workUser || "Unknown"; // Handle missing username

            // Initialize user data if not present
            if (!acc[username]) {
                acc[username] = {
                    username, // Store the username
                    completed: 0,
                    failed: 0,
                    active: 0,
                    newTask: 0
                };
            }

            // Update counts based on task properties
            if (task.completed) acc[username].completed += 1;
            if (task.failed) acc[username].failed += 1;
            if (task.active) acc[username].active += 1;
            if (task.newTask) acc[username].newTask += 1;

            return acc;
        }, {});

        // Convert the map to an array of objects
        const userSummaryArray = Object.values(userSummaryMap);
        // Return the array of user summaries
        return userSummaryArray;
    };

    useEffect(() => {
        settaskCount(getUserTaskSummary());
    }, [workStore])

    return (
        <div className="con w-full flex flex-col gap-6 px-4">
            {/* Form Box */}
            <div className="w-full flex flex-col md:flex-row items-start gap-4 justify-between">
                {/* Input Div */}
                <div className="flex flex-col gap-3 w-full md:w-1/2">
                    <label htmlFor="" className="text-sm md:text-lg font-semibold w-full">
                        Task Title<br />
                        <input
                            type="text"
                            placeholder="Make a UI design"
                            className="w-full px-3 py-2 border rounded"
                            onChange={handleInput}
                            value={inpData.title}
                            name='title'
                        />
                    </label>
                    <label htmlFor="" className="text-sm md:text-lg font-semibold">
                        Date<br />
                        <input
                            type="date"
                            className="w-full px-3 py-2 border inpdate rounded"
                            onChange={handleInput}
                            value={inpData.date}
                            name='date'
                        />
                    </label>
                    <label htmlFor="" className="text-sm md:text-lg font-semibold">
                        Assign to<br />
                        <input
                            type="text"
                            placeholder="Employee name"
                            className="w-full px-3 py-2 border rounded"
                            onChange={handleInput}
                            value={inpData.workUser}
                            name='workUser'
                        />
                    </label>
                    <label htmlFor="" className="text-sm md:text-lg font-semibold">
                        Category<br />
                        <input
                            type="text"
                            placeholder="Design, dev, etc."
                            className="w-full px-3 py-2 border rounded"
                            onChange={handleInput}
                            value={inpData.category}
                            name='category'
                        />
                    </label>
                </div>
                {/* Description Div */}
                <div className="flex flex-col gap-3 w-full md:w-1/3">
                    <label htmlFor="" className="text-sm md:text-lg font-semibold w-full">
                        Description<br />
                        <textarea
                            name="description"
                            id=""
                            rows={5}
                            cols={5}
                            className="border w-full p-2 rounded"
                            value={inpData.description}
                            onChange={handleInput}
                        ></textarea>
                    </label>
                    <button className="bg-emerald-500 text-white text-sm md:text-lg font-semibold px-6 py-2 cursor-pointer rounded hover:bg-emerald-600 transition-all" onClick={handleSubmit}>
                        Create Task
                    </button>
                </div>
            </div>

            {/* Employee Table */}
            <div className="w-full mt-10 px-4">
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="tableres min-w-full text-center text-xs md:text-sm font-semibold ">
                        <thead className="bg-red-300 text-white uppercase">
                            <tr>
                                <th className="p-2 md:p-3">Employee Name</th>
                                <th className="p-2 md:p-3">New Task</th>
                                <th className="p-2 md:p-3">Active Task</th>
                                <th className="p-2 md:p-3">Completed</th>
                                <th className="p-2 md:p-3">Failed</th>
                            </tr>
                        </thead>
                        <tbody className="bg-black text-white">
                            {
                                taskCount.map((item, index) => (
                                    <tr className="border-b border-gray-700" key={index}>
                                        <td className="p-2 md:p-3">{item.username}</td>
                                        <td className="p-2 md:p-3 text-cyan-300">{item.newTask}</td>
                                        <td className="p-2 md:p-3 text-yellow-400">{item.active}</td>
                                        <td className="p-2 md:p-3 text-blue-400">{item.completed}</td>
                                        <td className="p-2 md:p-3 text-red-500">{item.failed}</td>
                                    </tr>
                                ))

                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Form
