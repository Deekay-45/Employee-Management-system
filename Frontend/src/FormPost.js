import React, { useState, useEffect } from 'react'
import './formpost.css'
import axios from 'axios';
function FormPost({ selectedEmployee, onCreated, onUpdated, onCancel }) {
    const [employee, setEmployee] = useState({
        id: 0,
        names: "",
        age: 0,
        desig: "",
        exp: 0
    });

    useEffect(() => {
        if (selectedEmployee) {
            setEmployee({
                id: selectedEmployee.id,
                names: selectedEmployee.name,
                age: selectedEmployee.age,
                desig: selectedEmployee.desig,
                exp: selectedEmployee.exp
            });
        } else {
            setEmployee({
                id: 0,
                names: '',
                age: 0,
                desig: '',
                exp: 0
            });
        }
    }, [selectedEmployee]);
    function handleIdChange(e) {
        setEmployee({
            ...employee,
            id: e.target.value
        });
    }
    function handleNameChange(e) {
        setEmployee({
            ...employee,
            names: e.target.value
        });
    }
    function handleAgeChange(e) {
        setEmployee({
            ...employee,
            age: e.target.value
        });
    }
    function handleDesigChange(e) {
        setEmployee({
            ...employee,
            desig: e.target.value
        });
    }
    function handleExpChange(e) {
        setEmployee({
            ...employee,
            exp: e.target.value
        });
    }
    function postData(e) {
        e.preventDefault();
        const payload = {
            id: employee.id,
            name: employee.names,
            age: employee.age,
            desig: employee.desig,
            exp: employee.exp
        };

        if (selectedEmployee) {
            axios.put(`http://127.0.0.1:8000/update-emp/${employee.id}`, payload)
                .then(res => {
                    console.log('Updated data', res)
                    if (onUpdated) onUpdated(employee);
                })
                .catch(err => console.log(err));
        } else {
            axios.post('http://127.0.0.1:8000/create-emp', payload)
                .then(res => {
                    console.log('Posting data', res)
                    if (onCreated) onCreated();
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <>
            <div className='form-style-2'>

                <form>


                    <label>
                        ID:
                        <input
                            className="input-field"
                            value={employee.id}
                            onChange={handleIdChange}
                            disabled={!!selectedEmployee}
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            className="input-field"
                            value={employee.names}
                            onChange={handleNameChange}
                        />
                    </label>
                    <label>
                        Age:
                        <input
                            className="input-field"
                            value={employee.age}
                            onChange={handleAgeChange}
                        />
                    </label>
                    <label>

                        Position:
                        <select className='select-field' value={employee.desig} onChange={handleDesigChange}>
                            <option value="SDE1">SDE1</option>
                            <option value="SDE2">SDE2</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Test Engineer">Test Engineer</option>
                        </select>
                    </label>
                    <label>
                        Exp:
                        <input
                            className="input-field"
                            value={employee.exp}
                            onChange={handleExpChange}
                        />
                    </label>
                    <button type="button" className='btn' onClick={postData}>{selectedEmployee ? 'Update' : 'Submit'}</button>
                    {selectedEmployee && (
                        <button type="button" className='btn' style={{ marginLeft: '8px' }} onClick={onCancel}>Cancel</button>
                    )}

                </form>
            </div>

        </>
    )
}

export default FormPost
