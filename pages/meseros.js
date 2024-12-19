import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

const Meseros = () => {
    const [meseros, setMeseros] = useState([]);
    const [mesero, setMesero] = useState({ name: '', price: '', category: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchMeseros();
    }, []);

    const fetchMeseros = async () => {
        const req = await fetch('http://localhost:9999/api/1.0/waiter/active', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const resp = await req.json();
        setMeseros(resp.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMesero({ ...mesero, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateMesero(mesero);
        } else {
            createMesero(mesero);
        }
    };

    const createMesero = async (newMesero) => {
        await fetch('http://localhost:9999/api/1.0/waiter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newMesero),
        });
        await fetchMeseros();
        setMesero({ name: '', dni: '', address: '', email: '', phone: '' });
    };

    const updateMesero = async (updatedMesero) => {
        await fetch(`http://localhost:9999/api/1.0/waiter/${updatedMesero._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedMesero),
        });
        await fetchMeseros();
        setMesero({ name: '', dni: '', address: '', email: '', phone: '' });
        setIsEditing(false);
    };

    const editMesero = (mesero) => {
        setMesero(mesero);
        setIsEditing(true);
    };

    const deleteMesero = async (id) => {
        await fetch(`http://localhost:9999/api/1.0/waiter/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        await fetchMeseros();
    };

    return (
        <div>
            <Navbar />
            <h2>Administrar Meseros</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="name" value={mesero.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    DNI:
                    <input type="text" name="dni" value={mesero.dni} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Direccion:
                    <input type="text" name="address" value={mesero.address} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Correo:
                    <input type="text" name="email" value={mesero.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Telefono:
                    <input type="text" name="phone" value={mesero.phone} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">{isEditing ? 'Update' : 'Add'} Mesero</button>
            </form>

            <ul>
                {meseros.map((mesero) => (
                    <li key={mesero._id}>
                        {mesero.name} - {mesero.price} - {mesero.category}
                        <button onClick={() => editMesero(mesero)}>Edit</button>
                        <button onClick={() => deleteMesero(mesero._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Meseros;
