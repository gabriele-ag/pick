import { useState } from "react"
import Cookies from "js-cookie"

import styles from "./CSS/moduloaggiungigioco.module.css"

// Da rivedere

type Game = {
    id: string;
    name: string;
    genre: string;
}

type modalProps = {
    isOpen: boolean;
    onClose: () => void;
    onGameAdded: () => void;
}

export default function ModaleAggiungiGioco({isOpen, onClose, onGameAdded}: modalProps) {

    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [alertGameAdded, setAlertGameAdded] = useState(false)

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    if(!isOpen) return null;

    const handleSearch = async () => {
        if(search.trim() === '') {
            setSearchResult([]);
            return
        }

        setLoading(true)
        setError(null)

        try {

            const token = localStorage.getItem('token') || Cookies.get('token');
            if (!token) {
                setError("Non autenticato. Effetua il login");
                setLoading(false)
                return
            }

            const response = await fetch(`${apiUrl}/api?name=${encodeURIComponent(search)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Errore durante la ricerca dei giochi')
            }

            const result = await response.json()
            setSearchResult(result.data || [])
        } catch(err) {
            const errorMessage = err instanceof Error ? err.message : "Errore nella ricerca";
            setError(errorMessage || "Errore nella ricerca")
        } finally {
            setLoading(false)
        }
    }

    const handleAddGame = async (gameId: string) => {
        setError(null)
        setAlertGameAdded(true)

        try {
            const token = localStorage.getItem('token')

            if (!token) {
                setError("Non autenticato. Effettua il login")
                return
            }

            const response = await fetch(`${apiUrl}/api/collection`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ gameId: gameId })
            });

            if (!response.ok) {
                throw new Error('Errore durante l\'aggiunta del gioco alla collezione')
            }

            onGameAdded()
            setSearch('')
            setTimeout(() => {
                setAlertGameAdded(false)
            }, 3000)
            
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Errore nell'aggiunta";
            setError(errorMessage || "Errore nell'aggiunta")
        }
    }




    return (
        // Tutto da rivedere
        
        <div className={styles.divModule}>
            <div className={styles.divInsideStyle}>
                <h2 className={styles.titleModuleAddGame}>Aggiungi Gioco alla Collezione</h2>
                {/* Barra di ricerca */}
                <div className={styles.divInput}>
                    <input
                        type="text"
                        placeholder="Cerca un gioco..."
                        className={styles.inputSearch}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                    />
                    <button
                        onClick={handleSearch}
                        className={styles.buttonSearch}
                        disabled={loading}
                    >
                        {loading ? 'Cerca...' : 'Cerca'}
                    </button>
                </div>

                {error && <p className={styles.error}>{error}: gioco già aggiunto!</p>}

                {/* Risultati della ricerca */}
                <div className="max-h-60 overflow-y-auto border rounded-md mb-4">
                    {searchResult.length > 0 ? (
                        <ul>
                            {searchResult.map((game) => (
                                <li key={game.id} className={styles.gameResults}>
                                    <span className={styles.gameName}>{game.name}</span>
                                    <button
                                        onClick={() => handleAddGame(game.id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
                                    >
                                        Aggiungi
                                    </button>
                                    
                                </li>
                            ))}
                        
                        </ul>
                        
                    ) : (
                        search.trim() !== '' && !loading && !error && <p></p>
                    )}
                </div>

                {/* Bottone Chiudi */}
                <button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-800 p-2 rounded-md w-full hover:bg-gray-400"
                >
                    Chiudi
                </button>
                {alertGameAdded && (
                        <h2>Gioco aggiunto con successo!</h2>
                )}
            </div>
        </div>
    )
}