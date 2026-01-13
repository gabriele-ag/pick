'use client'

import { useState } from "react"
import styles from "./CSS/moduloregistrazione.module.css"

export default function Registrazione({onClose}: {onClose: () => void}) {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [status, setStatus] = useState({type: "", msg: ""})

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setStatus({type: "loading", msg: "Creazione account in corso..."})

        const hasLetter = /[a-zA-Z]/.test(formData.username)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Controllo su lunghezza e validità username, password e email

        if (!emailRegex.test(formData.email)) {
            setStatus({type: "error", msg: "L'email non è valida"})
            return
        }

        if (formData.username.length < 4 || !hasLetter) {
            setStatus({type: "error", msg: "L'username deve avere almeno 4 caratteri e una lettera"})
            return
        }

        if (formData.password.length < 8) {
            setStatus({type: "error", msg: "La password deve essere di almeno 8 caratteri"})
            return
        }

        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            



            if (response.ok) {
                setStatus({type: "Success", msg: "Account creato! Ora puoi accedere a Pick"})
                setTimeout(onClose, 2000)
            } else {
                const err = await response.json()
                setStatus({type: "error", msg: err.message || "Errore nella creazione dell'account"})
            }

        } catch (err) {
            setStatus({type: "error", msg: "Errore di connessione al server"})
        }
    }

    return (
        <>
        <div className={`${styles.moduleDiv} ${styles.fadeOut}`}>
            <h1 className={styles.title}>Crea Account</h1>
            <button className={styles.cancelButton} onClick={onClose}>X</button>
            <div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input className={styles.inputRegister} type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                    <input className={styles.inputRegister} type="text" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required/>
                    <input className={styles.inputRegister} type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />

                    <button className={styles.registerButton} type="submit">Registrati</button>
                </form>
            </div>

            {status.msg && (
                <p className={styles.statusMsg}>{status.msg}</p>
            )}
            

            <div className={styles.requiredDiv}>
                <h4 className={styles.requiredTitle}>Requisiti per registrazione</h4>
                <ul>
                    <li>L'username deve avere un minimo di 4 caratteri ed almeno una lettera</li>
                    <li>La password deve avere un minimo di 8 caratteri</li>
                </ul>
            </div>

        </div>
        </>
    )
}