'use client'

import { useState } from "react"
import Link from "next/link"
import styles from "./CSS/burgermenu.module.css"

interface BurgerProps {
    onLogout: () => void
}


export default function BurgerMenu({onLogout}: BurgerProps) {

    const [open, setOpen] = useState<boolean>(false)

    const handleLogoutClick = (): void => {
        setOpen(false);
        onLogout();
    }


    return (
        <>
            <div className={styles.buttonBurger}>
                <button onClick={() => setOpen(!open)}>//</button>
            </div>

            <div className={`${styles.burgerMenu} ${open ? styles.open : ""}`}>   
                <Link href="/Account">Il tuo profilo</Link>
                <button onClick={handleLogoutClick}>Esci</button>
            </div>
        </>
    )
}