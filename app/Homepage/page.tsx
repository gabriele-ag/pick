'use client'

import { useState, useMemo } from "react";
import Navbar from "../components/navbar";

import { useData } from "../components/useData";

import styles from "./CSS/homepage.module.css"

interface Game {
    id: number;
    name: string;
    genre: string;
    img: string;
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

            <div className={styles.hero}>
                <h1 className={styles.titleHero}>Lasciati sorprendere!</h1>
                <p className={styles.descrHero}>Ti senti indeciso? Pick è un app pensata per sceglierti il prossimo gioco dalla tua collezione. Aggiungi un gioco, scegli la categoria e poi premi sul pulsante!</p>
            </div>
            
            <section className={styles.sectionChoice}>
                <div className={styles.container}>

                    <div className={styles.divChoice}>
                        <label className={styles.labelChoice} htmlFor="genre-select">Scegli un genere!</label>
                        <select 
                            id="genre-select"
                            value={selectedGenre} 
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className={styles.selectGenre}
                        >
                            {genres.map(genre => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>

                        <button className={styles.buttonPick} onClick={handlePick}>{isPicking ? "Pick sta decidendo per te..." : "Scegli casualmente!"}</button>
                    </div>
                </div>
            </section>

                
                    {winner ? (
                        <div>
                            <div className={styles.divGame}>
                                <img className={styles.imgGame} src={winner.img} alt="image-game" />
                                <div className={styles.divGameInfo}>
                                    <h3 className={styles.gameTitle}>{winner.name}</h3>
                                    <p>Questa è la sezione di descrizione del gioco che verrà introdotta successivamente</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                
        </>
    )
}