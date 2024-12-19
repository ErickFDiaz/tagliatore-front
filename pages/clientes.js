import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState({ name: '', price: '', category: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const req = await fetch('http://localhost:9999/api/1.0/client', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const resp = await req.json();
        setClientes(resp.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateCliente(cliente);
        } else {
            createCliente(cliente);
        }
    };

    const createCliente = async (newCliente) => {
        await fetch('http://localhost:9999/api/1.0/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newCliente),
        });
        await fetchClientes();
        setCliente({ name: '', dni: '', address: '', email: '', phone: '' });
    };

    const updateCliente = async (updatedCliente) => {
        await fetch(`http://localhost:9999/api/1.0/client/${updatedCliente._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedCliente),
        });
        await fetchClientes();
        setCliente({ name: '', dni: '', address: '', email: '', phone: '' });
        setIsEditing(false);
    };

    const editCliente = (cliente) => {
        setCliente(cliente);
        setIsEditing(true);
    };

    const deleteCliente = async (id) => {
        await fetch(`http://localhost:9999/api/1.0/client/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        await fetchClientes();
    };

    return (
        <div>
            <Navbar />
            <h2>Administrar Clientes</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="name" value={cliente.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    DNI:
                    <input type="text" name="dni" value={cliente.dni} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Direccion:
                    <input type="text" name="address" value={cliente.address} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Correo:
                    <input type="text" name="email" value={cliente.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Telefono:
                    <input type="text" name="phone" value={cliente.phone} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">{isEditing ? 'Update' : 'Add'} Cliente</button>
            </form>

            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente._id}>
                        {cliente.name} - {cliente.price} - {cliente.category}
                        <button onClick={() => editCliente(cliente)}>Edit</button>
                        <button onClick={() => deleteCliente(cliente._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Clientes;
