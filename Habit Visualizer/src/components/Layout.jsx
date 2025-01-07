import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useAuth } from "../context/AuthContext"



export default function Layout(props){
    const { children } = props

    const [showModal, setShowModal] = useState(false)

    const { globalUser, logout } = useAuth()

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">Habit Visualizer</h1>
                <p>See your progress</p>
            </div>
            {globalUser ? (
                <button onClick={logout}>
                    <p>Logout</p>
                </button>
            ) : (
                <button onClick={() => {setShowModal(true)}}>
                    <p>Sign up for free</p>
                    <i className="fa-solid fa-mug-hot"></i>
                </button>
            )}
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Habit Visualizer </span>was made by <a href="https://github.com/byronket" target="_blank">Byron Keturakis</a><br /> using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a></p>
        </footer>
    )

    function handleCloseModal(){
        setShowModal(false)
    }

    return(
        <>
            {showModal && (<Modal handleCloseModal={handleCloseModal}>
                <Authentication handleCloseModal={handleCloseModal}/>
            </Modal>)}
            {header}
            <main>
                { children }
            </main>
            {footer}
        </>
    )
}