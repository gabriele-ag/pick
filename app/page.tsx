'use client'

import Link from "next/link"

import "./globals.css"

export default function Home() {
  return (
    <>
    <section className="firstpage">
      <div className="div-pick">
        <h1 className="title">Pick</h1>
        <p className="subtitle">Indeciso su cosa giocare? Lascia fare a Pick!</p>

        <div className="div-login">
          <Link className="login-button" href="/Login">Accedi</Link>
          <Link className="register-button" href="/registrati">Registrati ora!</Link>
        </div>
      </div>

    </section>
    </>
  )
}