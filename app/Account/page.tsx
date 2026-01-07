'use client'

import { useState, useEffect, useCallback } from "react"
import { useData } from "../components/useData"
import ModaleAggiungiGioco from "../components/moduloAggiungiGioco"
import Navbar from "../components/navbar"

import styles from "./CSS/account.module.css"

type Game = {
    id: string;
    name: string;
    genre: string;
    img: string | null;
    stato: 'Completato' | 'In pausa' | 'Da iniziare';
}

export default function Account() {

    const [collection, setCollection] = useState<Game[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {fetchData} = useData()
    
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    const loadUserGames = useCallback(async () => {
        const games = await fetchData()
        if (games) setCollection(games)
    }, [fetchData]);


    useEffect(() => {
        loadUserGames()
    }, [loadUserGames])


    const handleRemoveGame = async (gameId: string) => {
        const token = localStorage.getItem('token')

        try {
            const response = await fetch(`${apiUrl}/api/collection/${gameId}`, {
                method: 'DELETE',
                headers: {'Authorization': `Bearer ${token}`}
            })

            if (response.ok) {
                setCollection(collection.filter(curGame => curGame.id !== gameId))
            }
        } catch (err) {
            console.error("Errore nell'eliminazione del gioco", err)
        }
    }

    const toggleStatus = async (gameId: string, currentStatus: string) => {
        const token = localStorage.getItem('token')
        const newStatus = currentStatus === 'Completato' ? 'Da iniziare' : 'Completato'

        try {
            const response = await fetch(`${apiUrl}/api/collezione/${gameId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({stato: newStatus})
            })

            if (response.ok) {
                setCollection(collection.map(curGame => curGame.id === gameId ? {...curGame, stato: newStatus as 'Completato' | 'In pausa' | 'Da iniziare'} : curGame))
            }
        } catch (err) {
            console.error("Errore nell'aggiornare lo status del gioco", err)
        }
    }

    return (
        <>
        {/* // Tutto da rivedere! */}

        <section className={styles.container}>

            <Navbar/>
            
            <h1>La mia Collezione</h1>

            <button 
                onClick={() => setIsModalOpen(true)}
                className={styles.addBtn}
            >
                + Aggiungi nuovo gioco
            </button>
            
            <div className={styles.gameDivCollection}>
                {collection.length === 0 ? (
                    <p>La tua collezione è vuota. Aggiungi qualche gioco!</p>
                ) : (
                    collection.map((curGame) => (
                        <div key={curGame.id} className={styles.gameCard}>

                            <h3>{curGame.name}</h3>
                            <p>{curGame.genre}</p>
                            <p>Stato: <strong>{curGame.stato}</strong></p>
                               
                            <button 
                                    onClick={() => handleRemoveGame(curGame.id)}
                                    className={styles.deleteBtn}
                                >
                                    Rimuovi
                            </button>
                            </div>                       
                    ))
                )}
            </div>

            <ModaleAggiungiGioco 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGameAdded={loadUserGames}
            />
        </section>
        </>
    )
}