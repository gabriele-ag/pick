'use client'

import { useState, useEffect, useCallback } from "react"

export function useData() {

    
    const [data, setData] = useState([])
    
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL


    const fetchData = useCallback(async () => {

        try {
            const token = localStorage.getItem('token')

            const response = await fetch(`${apiUrl}/api/collection`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) {
                if (response.status === 401) {
                    console.error("Non autorizzato: Token mancante o scaduto")
                }
                throw new Error("Errore nel recupero dei dati")
            }

            const result = await response.json()
            const games = result.data || result

            setData(games)

            console.log(games)
            return games
        } catch (error) {
            console.error('Errore nel recupero dei dati:', error)
            return []
        }
    }, [apiUrl])

    useEffect(() => {
            fetchData()
        }, [fetchData])

    return {fetchData, data}
}