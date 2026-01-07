import { useState } from "react"
import Cookies from "js-cookie"

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
            setSearchResult([])
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Errore nell'aggiunta";
            setError(errorMessage || "Errore nell'aggiunta")
        }
    }




    return (
        // Tutto da rivedere
        
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Aggiungi Gioco alla Collezione</h2>

                {/* Barra di ricerca */}
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Cerca un gioco..."
                        className="flex-grow p-2 border rounded-l-md"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Cerca...' : 'Cerca'}
                    </button>
                </div>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                {/* Risultati della ricerca */}
                <div className="max-h-60 overflow-y-auto border rounded-md mb-4">
                    {searchResult.length > 0 ? (
                        <ul>
                            {searchResult.map((game) => (
                                <li key={game.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                                    <span>{game.name}</span>
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
                        search.trim() !== '' && !loading && !error && <p className="p-2 text-gray-500">Nessun risultato.</p>
                    )}
                </div>

                {/* Bottone Chiudi */}
                <button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-800 p-2 rounded-md w-full hover:bg-gray-400"
                >
                    Chiudi
                </button>
            </div>
        </div>
    )
}