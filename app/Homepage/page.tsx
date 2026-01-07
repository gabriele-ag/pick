'use client'

import { useState, useMemo } from "react";
import Navbar from "../components/navbar";

import { useData } from "../components/useData";

import styles from "./CSS/homepage.module.css"

interface Game {
    id: number;
    name: string;
    genre: string;
}

export default function Homepage() {

    const {data: collection} = useData()

    console.log(collection)

    const [selectedGenre, setSelectedGenre] = useState("Tutti")
    const [winner, setWinner] = useState<Game | null>(null)
    const [isPicking, setIsPicking] = useState(false)

    const genres = useMemo(() => {
        if (!collection || collection.length === 0) return ["Tutti"];
        const uniqueGenres = [...new Set(collection.map((curGame: Game) => curGame.genre))];
        return ["Tutti", ...uniqueGenres];
    }, [collection]);

    const handlePick = () => {

        if (collection.length === 0) return

        const pool = selectedGenre === "Tutti" ? collection : collection.filter((game: Game) => game.genre === selectedGenre);

        if (pool.length === 0) {
            alert("Nessun gioco trovato per questo genere!");
            return;
        }

        setIsPicking(true)
        setWinner(null)

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * pool.length)
            const selected = pool[randomIndex]
            console.log("Gioco estratto:", selected)
            setWinner(selected)
            setIsPicking(false)

        }, 1200)

    }



    return (
        <>
            <Navbar/>
            <h1>Lasciati sorprendere!</h1>
            <p>Ti senti indeciso? Pick è un app pensata per sceglierti il prossimo gioco dalla tua collezione. Aggiungi un gioco, scegli la categoria e poi premi sul pulsante!</p>

            <label htmlFor="genre-select">Quale genere scegli?</label>
            <select 
                id="genre-select"
                value={selectedGenre} 
                onChange={(e) => setSelectedGenre(e.target.value)}
            >
                {genres.map(genre => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>

            <button className={styles.buttonpick} onClick={handlePick}>{isPicking ? "Pick sta decidendo per te..." : "Scegli casualmente!"}</button>

            <div>
                {winner ? (
                    <div className={styles.divgame}>
                        <h3 className={styles.gametitle}>{winner.name}</h3>
                    </div>
                ) : (
                    !isPicking && <p>Clicca il tasto per estrarre un titolo dalla tua collezione</p>
                )}
            </div>
        </>
    )
}