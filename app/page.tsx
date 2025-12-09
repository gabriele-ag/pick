'use client'

import { useRef, useState, FormEvent } from "react";
import Link from "next/link";

import { useData } from "./components/useData";

interface User {
  username: string,
  password: string,
};

interface Errors {
  username: string,
  password: string,
  general: string
};

export default function FirstPageLogin() {

  const { usersList } = useData()

  const [errors, setErrors] = useState<Errors>({
    username: '',
    password: '',
    general: ''
  });

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleForm = () => {
      const newErrors: Errors = {
        username: '',
        password: '',
        general: ''
      }

      const enteredUsername = usernameRef.current ? usernameRef.current.value.trim() : ''
      const enteredPassword = passwordRef.current ? passwordRef.current.value : ''

      if (!enteredUsername) {
        newErrors.username = 'Inserisci il nome utente corretto'
      }

      if (!enteredPassword) {
        newErrors.password = 'Inserisci una password corretta'
      }

      if (Object.values(newErrors).some(error => error !== '')) {
        setErrors(newErrors)
        return
      }

      const userFound: User | undefined = usersList.find((curUsers) => curUsers.username === enteredUsername && curUsers.password === enteredPassword)

      if (userFound) {
        setErrors({
          username: '',
          password: '',
          general: ''
        })
        alert(`Accesso eseguito con successo! Benvenuto: ${userFound.username}`)
      } else {
        setErrors({
          username: '',
          password: '',
          general: 'Nome utente e password errati'
        })
      }   
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    handleForm()
  }


  return (
    <>
    <div>
      <h1>pick</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {errors.general && <p>{errors.general}</p>}
          <label htmlFor="">Username</label>
          <input type="text" id="username" ref={usernameRef} />
          {errors.username && <p>{errors.username}</p>}
          <label htmlFor="">Password</label>
          <input type="password" id="password" ref={passwordRef} />
          {errors.password && <p>{errors.password}</p>}

          <button type="submit">Accedi</button>
        </form>

        <Link href="">Nuovo utente? Registrati ora!</Link>
      </div>
    </div>
    </>
  );
}
