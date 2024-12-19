import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/platillos">Platillos</Link></li>
                <li><Link href="/clientes">Clientes</Link></li>
                <li><Link href="/ordenes">Ordenes</Link></li>
                <li><Link href="/categorias">Categorias</Link></li>
                <li><Link href="/meseros">Meseros</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/register">Registro</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;