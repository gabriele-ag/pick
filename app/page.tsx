'use client'

import Link from "next/link"

import "./globals.css"

export default function Home() {
  return (
    <>
    <h1>Pick</h1>
    <p>Indeciso su cosa giocare? Lascia fare a Pick!</p>
    <div className="div-login">
      <Link href="/Login">Accedi</Link>
      <Link href="/registrati">Registrati ora!</Link>
    </div>
    </>
  )
}