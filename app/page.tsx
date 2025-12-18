'use client'

import { useRef, useState} from "react";
import Link from "next/link";

import { useRouter } from 'next/navigation'

type LoginError = {
  general?: string,
  email?: string,
  password?: string
}

export default function FirstPageLogin() {

    const emailRef= useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<LoginError>({})
    
    const router = useRouter()
    
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL


    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      setError({})

      const emailValue = emailRef.current?.value
      const passwordValue = passwordRef.current?.value

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
          router.push('/account')
        } else {
          setError({ general: result.message || 'Credenziali non valide'})
        }
      } catch (error) {
        setError({general: "Il server non risponde"})
      }
    }



  return (
    <>
    <div>
      <h1>pick</h1>
      <div>
        <form onSubmit={handleLogin}>
          {error.general && <p>{error.general}</p>}

          <label htmlFor="">Email</label>
          <input type="text" id="email" ref={emailRef} />

          {error.email && <p>{error.email}</p>}

          <label htmlFor="">Password</label>
          <input type="password" id="password" ref={passwordRef} />
  
          {error.password && <p>{error.password}</p>}

          <button type="submit">Accedi</button>
        </form>

        <Link href="">Nuovo utente? Registrati ora!</Link>
      </div>
    </div>
    </>
  );
}
