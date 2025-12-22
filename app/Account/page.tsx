
import styles from "./account.module.css"

export default function Account() {
    return (
        <>
        <section className={styles.headerApp}>
            <nav className={styles.navAccount}>
                <p>Pick</p>
                <div className={styles.divButton}>
                    <button className={styles.button}>Aggiungi gioco</button>
                    <button className={styles.button}>Account</button>
                </div>
            </nav>
        </section>

        <section>
            {/* Sezione dedicata alla collezione utente */}
            {/* Può rimuovere o spuntare la casella su completato, messo in pausa e eliminare il gioco dalla collezione */}
        </section>
        </>
    )
}