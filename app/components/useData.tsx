import { useState, useEffect } from "react"

import { Game } from "../api/gameslist/model/games"
import { User } from "../api/gameslist/model/user"

interface ApiResponse {
    gamesdata: Game[],
    userdata: User[]
}

export function useData() {

    const [gamesList, setGamesList] = useState<Game[]>([])
    const [usersList, setUsersList] = useState<User[]>([])

    async function fetchData(): Promise<ApiResponse | null> {
        try {

            const apiUrl = '/api/gameslist'
            const response = await fetch(apiUrl)
            if(!response.ok) {
                throw new Error('Errore nel recupero dei giochi')
            }

            const data: ApiResponse = await response.json()
                   
            setGamesList(data.gamesdata)
            setUsersList(data.userdata)
            return data
        } catch (error) {
            console.error('Errore nel recupero dei giochi:', error)
            return null
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {fetchData, gamesList, usersList}
}