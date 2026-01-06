'use client'

import { useRef, useState} from "react";
import Link from "next/link";
import Cookies from "js-cookie";

import { useRouter } from 'next/navigation'

// Tipizzo errore al login
type LoginError = {
  general?: string,
  email?: string,
  password?: string
}

export default function FirstPageLogin() {

    // Ref per email e password
    const emailRef= useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    // Stati per gestione errori e successo login
    const [error, setError] = useState<LoginError>({})
    const [success, setSuccess] = useState<string | null>('')
    
    const router = useRouter()
    
    // API
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL


    // Gestisco il login e faccio chiamata API
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      setError({})
      
      const emailValue = emailRef.current?.value
      const passwordValue = passwordRef.current?.value

      // Se i valori di email e password non passano
      if (!emailValue) {
        return setError({email: "L'email è obbligatoria"})
      }
      if (!passwordValue) {
        return setError({password: "La password è obbligatoria"})
      }
      

      try {
        const response = await fetch(`${apiUrl}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({email: emailValue, password: passwordValue})
        })
        const result = await response.json()

        if (!response.ok) {
          setError({general: result.message || "Errore di accesso"})
        }

        if (response.ok) {
          localStorage.setItem('token', result.token)

          Cookies.set('token', result.token, {
            expires: 1,
            path: '/',
            sameSite: 'strict'
          })

          setSuccess("Login effettuato! Benvenuto su Pick!")
          setTimeout(() => {
            router.push('/Benvenuto')
          }, 2000)
        } else {
          setError({ general: result.message || 'Credenziali non valide'})
        }
      } catch (error) {
        setError({general: "Il server non risponde"})
      }
    }



  return (
    <>
    <div className="div-login">

      {/* Nome Web-App */}
      <img className="logo" src="logo.png" alt="logo" />


        <form className="form-login" onSubmit={handleLogin}>
          {error.general && <p>{error.general}</p>}


          <div className="div-form">

          <h2 className="title-login">Accedi al tuo account</h2>

            <div>
              {/* Email */}
              <input className="input-login" type="text" id="email" ref={emailRef} placeholder="E-Mail" />
              {error.email && <p className="error-login">{error.email}</p>}

          
            </div>

            <div>
                {/* Password */}
                <input className="input-login" type="password" id="password" ref={passwordRef} placeholder="Password" />
                {error.password && <p className="error-login">{error.password}</p>}
            </div>

            <button className="btn-login" type="submit">Accedi</button>

          </div>
        </form>

        {/* Nuovo utente ? */}
        <div className="new-user">
          <p>Nuovo utente?</p>
          <Link className="new-user-underline" href="">Registrati ora!</Link>
        </div>

        {/* Messaggio di login effettuato */}
        <h3>{success}</h3>

      </div>
    </>
  );
}
