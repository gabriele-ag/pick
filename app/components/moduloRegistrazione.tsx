import styles from "./CSS/moduloregistrazione.module.css"

export default function Registrazione() {
    return (
        <>
        <div>
            <h1>Crea Account</h1>
            <div>
                <form action="">
                    <input className={styles.inputRegister} type="text" />
                    <input className={styles.inputRegister} type="text" />
                    <input className={styles.inputRegister} type="text" />

                    <button>Registrati ora</button>
                </form>
            </div>

            <div>
                <h4>Requisiti per registrazione</h4>
                <ul>
                    <li>L'username deve avere un minimo di 2 caratteri ed almeno una lettera</li>
                    <li>La password deve avere un minimo di 8 caratteri</li>
                </ul>
            </div>
        </div>
        </>
    )
}