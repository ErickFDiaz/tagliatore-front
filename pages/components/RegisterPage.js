import React, { useState } from 'react';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleDniChange = (e) => {
        setDni(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleRegisterClick = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log('Register button clicked');
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        // Add your registration logic here
        await fetch("http://localhost:9999/api/1.0/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email,
                dni: dni,
                address: address,
                phone: phone,
                name: username
            }),
          });
    };

    return (
        <div>
            <h2>Registro</h2>
            <form>
                <label>
                    Usuario:
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </label>
                <label>
                    DNI:
                    <input type="text" name="dni" value={dni} onChange={handleDniChange} />
                </label>
                <label>
                    Correo:
                    <input type="text" name="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    Direccion:
                    <input type="text" name="address" value={address} onChange={handleAddressChange} />
                </label>
                <label>
                    Telefono:
                    <input type="text" name="phone" value={phone} onChange={handlePhoneChange} />
                </label>
                <br />
                <label>
                    Contrasena:
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <label>
                    Confirmar Contrasena:
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </label>
                <br />
                <button type="submit" onClick={handleRegisterClick}>Registrar</button>
            </form>
        </div>
    );
};

export default RegisterPage;
