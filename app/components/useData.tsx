'use client'

// customHook da rivedere

import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export function useData() {

    
    const [data, setData] = useState<any[] | null>([])
    
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL


    async function fetchData() {

        try {          
            const response = await fetch(`${apiUrl}/api`)
            if (!response.ok) {
                throw new Error('Errore nel recupero dei dati')
            }

            const result = await response.json()
            setData(result.data)
            console.log(result.data)
            return result.data
        } catch (error) {
            console.error('Errore nel recupero dei dati:', error)
            return []
        }
    }

    useEffect(() => {
            fetchData()
        }, [])

    return {fetchData, data}
}