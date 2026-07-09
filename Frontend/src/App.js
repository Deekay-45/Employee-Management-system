import './App.css';
import axios from 'axios'
import { useState, useEffect } from "react"
import Employee from './Employee'
import FormPost from './FormPost';

function App() {
    const [emp, setEmp] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = () => {
        axios.get('http://127.0.0.1:8000/all')
            .then(res => setEmp(res.data))
            .catch(err => console.log('Fetch employees error', err));
    }

    useEffect(() => {
        fetchEmployees();
    }, [])

    function handleDelete(id) {
        console.log(id)
        axios.delete(`http://127.0.0.1:8000/delete-emp/${id}`)
            .then(res => {
                console.log("Deleted", res.data)
                fetchEmployees();
            })
            .catch(err => console.log(err))
    }

    function handleEdit(employee) {
        setSelectedEmployee(employee);
    }

    function handleUpdate(employee) {
        axios.put(`http://127.0.0.1:8000/update-emp/${employee.id}`, {
            id: employee.id,
            name: employee.names,
            age: employee.age,
            desig: employee.desig,
            exp: employee.exp
        })
            .then(res => {
                console.log('Updated', res.data)
                setSelectedEmployee(null);
                fetchEmployees();
            })
            .catch(err => console.log(err));
    }

    function cancelEdit() {
        setSelectedEmployee(null);
    }

    return (
        <>
            <div children="App">
                <div><h1>Employee Managment Application</h1></div>
                <FormPost
                    selectedEmployee={selectedEmployee}
                    onCreated={fetchEmployees}
                    onUpdated={handleUpdate}
                    onCancel={cancelEdit}
                />
                <Employee employe={emp} handleDelete={handleDelete} handleEdit={handleEdit} />
            </div>

        </>
    );
}

export default App;
