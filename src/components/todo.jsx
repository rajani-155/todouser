import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FaCheck, FaTimes } from 'react-icons/fa';

function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDeadline, setNewDeadline] = useState("");

    // Fetch tasks from database
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/todos', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTodoList(response.data.data); 
        } catch (error) {
            console.error('Error fetching todos:', error);
           
        }
    };

    // Function to toggle the editable state for a specific row
    const toggleEditable = (id) => {
        const rowData = todoList.find((data) => data._id === id);
        if (rowData) {
            setEditableId(id);
            setEditedTask(rowData.title);
            setEditedStatus(rowData.status);
            setEditedDeadline(rowData.deadline ? new Date(rowData.deadline).toISOString().slice(0, 16) : "");
        } else {
            setEditableId(null);
            setEditedTask("");
            setEditedStatus("");
            setEditedDeadline("");
        }
    };

    // Function to add task to the database
    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask || !newStatus || !newDeadline) {
            alert("All fields must be filled out.");
            return;
        }
        const formattedDeadline = new Date(newDeadline).toISOString();

        try {
            const response = await axios.post('http://localhost:4000/api/todo', {
                title: newTask,
                content: newStatus, 
                status: newStatus,
                deadline: formattedDeadline
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response);
            fetchTodos();
            setNewTask("");
            setNewStatus("");
            setNewDeadline("");
        } catch (error) {
            console.error('Error adding todo:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
            
        }
    };

    // Function to save edited data to the database
    const saveEditedTask = async (id) => {
        const editedData = {
            title: editedTask, 
            content: editedStatus, 
            status: editedStatus,
            deadline: editedDeadline,
        };
    
        if (!editedTask || !editedStatus || !editedDeadline) {
            alert("All fields must be filled out.");
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:4000/api/todo/${id}`, editedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data); 
            // Update 
        const index = todoList.findIndex((task) => task._id === id);
        if (index !== -1) {
            todoList[index] = { ...todoList[index], ...editedData };
            setTodoList([...todoList]);
        }   
            
            setEditableId(null);
            setEditedTask(''); 
            setEditedStatus(''); 
            setEditedDeadline(''); 
    
            
        } catch (error) {
            console.error('Error updating todo:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
        }
    };
    
    // Delete task 
    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/todo/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response);
            fetchTodos(); 
        } catch (error) {
            console.error('Error deleting todo:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            }
           
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7">
                    <h2 className="text-center">Todo List</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered mt-4">
                            <thead className="table-primary">
                                <tr>
                                    <th>Task</th>
                                    <th>Status</th>
                                    <th>Deadline</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todoList.length > 0 ? (
                                    todoList.map((data) => (
                                        <tr key={data._id}>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedTask}
                                                        onChange={(e) => setEditedTask(e.target.value)}
                                                    />
                                                ) : (
                                                    data.title
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedStatus}
                                                        onChange={(e) => setEditedStatus(e.target.value)}
                                                    />
                                                ) : (
                                                    data.status
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="datetime-local"
                                                        className="form-control"
                                                        value={editedDeadline}
                                                        onChange={(e) => setEditedDeadline(e.target.value)}
                                                    />
                                                ) : (
                                                    data.deadline ? new Date(data.deadline).toLocaleString() : ''
                                                )}
                                            </td>
                                            <td>
                                            {editableId === data._id ? (
                                                <div>
                                                   <button className="btn btn-sm btn-light-blue" onClick={() => saveEditedTask(data._id)}>
                                                        <FaCheck />
                                                    </button>
                                                    <button className="btn btn-sm ml-1" onClick={() => setEditableId(null)}>
                                                        <FaTimes />
                                                    </button>           
                                                </div>
                                            ) : (
                                                <div>
                                                    <button className="btn btn-sm" onClick={() => toggleEditable(data._id)}>
                                                        <AiOutlineEdit />
                                                    </button>
                                                    <button className="btn btn-sm ml-1" onClick={() => deleteTask(data._id)}>
                                                        <AiOutlineDelete />
                                                    </button>
                                                </div>
                                            )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No tasks found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-5 mt-4">
                    <h2 className="text-center">Add Task</h2>
                    <form className="bg-light p-4" onSubmit={addTask}>
                        <div className="mb-3">
                            <label>Task</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Task"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Status</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Status"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Deadline</label>
                            <input
                                className="form-control"
                                type="datetime-local"
                                value={newDeadline}
                                onChange={(e) => setNewDeadline(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success btn-sm">
                            Add Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Todo;
