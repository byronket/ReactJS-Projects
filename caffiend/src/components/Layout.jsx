import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"



export default function Layout(props){
    const { children } = props

    const [showModal, setShowModal] = useState(false)

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEND</h1>
                <p>For Coffee Inthusiests</p>
            </div>
            <button onClick={() => {setShowModal(true)}}>
                <p>Sign up for free</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Caffiend </span>was made by <a href="https://github.com/byronket" target="_blank">Byron Keturakis</a><br /> using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a></p>
        </footer>
    )

    return(
        <>
            {showModal && (<Modal handleCloseModal={() => {setShowModal(false)}}>
                <Authentication />
            </Modal>)}
            {header}
            <main>
                { children }
            </main>
            {footer}
        </>
    )
}