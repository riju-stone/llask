import { useRef } from "react"
import styles from "./styles.module.scss"
import { motion } from "motion/react"
import { easeIn } from "motion"
import ButtonComponent from "../custom/button"
import ModelSelectionDropDown from "../model/Model"
import { SendHorizonal, File, Brain, Image, Earth, CommandIcon, CornerDownLeft, Package } from "lucide-react"

const searchBarAnim = {
    initial: {
        height: "0",
        opacity: 0,
        padding: "0",
    },
    show: {
        height: "6rem",
        opacity: 1,
        padding: "0",
        transition: {
            duration: 0.5,
            ease: [0.83, 0, 0.17, 1],
            opacity: {
                duration: 0.2
            }
        },
    },
    search: {
        height: "6rem",
        opacity: 1,
        padding: "2px",
        transition: {
            duration: 0.2,
            ease: easeIn
        },
    }
}

function SearchComponent({ searching, setSearching }: { searching: boolean, setSearching: (searching: boolean) => void }) {
    const searchContainer = useRef(null)

    return (
        <motion.div
            ref={searchContainer}
            className={styles.searchWrapper}
            variants={searchBarAnim} initial="initial" animate={searching ? "search" : "show"}>
            <div className={styles.searchContainer}>            <div className={styles.searchInputContainer}>
                <textarea placeholder="Ask Anything..." className={styles.searchInput} />
            </div>
                <div className={styles.searchActionContainer}>
                    <div className={styles.searchActionButtonContainer}>
                        <ButtonComponent logo={<Earth />} click={() => { }} />
                        <ButtonComponent logo={<Brain />} click={() => { }} />
                        <ButtonComponent logo={<File />} click={() => { }} />
                        <ButtonComponent logo={<Image />} click={() => { }} />
                    </div>
                    <div className={styles.modelSelectionWrapper}>
                        <ModelSelectionDropDown />
                        <ButtonComponent logo={<Package />} click={() => { }} />
                    </div>
                    <ButtonComponent logo={<SendHorizonal />} click={() => setSearching(!searching)}
                        label={<><CommandIcon /> + <CornerDownLeft /></>} />
                </div>
            </div>

        </motion.div>
    )
}

export default SearchComponent
