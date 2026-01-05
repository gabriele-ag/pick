'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Cookies from "js-cookie"


export default function Navbar() {
    
    const [isLogged, setIsLogged] = useState(false);
    const pathname = usePathname()

    useEffect(() => {
        const token = Cookies.get('token') || localStorage.getItem('token');
        setIsLogged(!!token);
    }, [pathname]);

    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.removeItem('token');
        window.location.href = '/Login';
    };

    if(!isLogged) return null

    return (
    <header className="p-4 border-b">
        <h1>Pick</h1>
        <nav className="flex gap-4">
            <Link href="/Account">Il tuo profilo</Link>
        </nav>
    <button onClick={handleLogout}>Esci</button>
    </header>
    )
}