'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Cookies from "js-cookie"

import styles from "./CSS/navbar.module.css"


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
    <header className={styles.header}>
        <img src="logo.png" alt="logo" className={styles.logo} />

        <nav className={styles.navbar}>
            <Link href="/Account">Il tuo profilo</Link>
            <button className={styles.button} onClick={handleLogout}>Esci</button>
        </nav>
    </header>
    )
}