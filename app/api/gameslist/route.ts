import { NextResponse } from "next/server";

import { Game } from "./model/games";
import { User } from "./model/user";

import gamesList from "../../../data/gamesList.json"
import userList from "../../../data/usersList.json"


const games: Game[] = gamesList as Game[]
const users: User[] = userList as User[]

export function GET() {
    const data = {
        gamesdata: games,
        userdata: users
    }
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const newGameData: Game = await request.json()

        if (!newGameData.name) {
            return NextResponse.json({message: "Il nome del gioco è obbligatorio"}, {status: 400})
        }

        if (!newGameData.genre) {
            return NextResponse.json({message: "Il genere del gioco è obbligatorio"}, {status: 400})
        }

        const newGameId = games.length > 0 ? Math.max(...games.map(curGame => curGame.id)) + 1 : 1

        const newGame: Game = {
            ...newGameData,
            id: newGameId
        }

        games.push(newGame)
        return NextResponse.json(newGame, { status: 201 })

    } catch(error) {
        console.error("Errore nel POST:", error)
        return NextResponse.json({message: "Errore interno dal server."}, {status: 500})
    }
}

export function PUT() {

}

export function DELETE() {

}