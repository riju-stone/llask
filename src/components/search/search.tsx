import { useRef } from "react"
import styles from "./styles.module.scss"
import { AnimatePresence, motion } from "motion/react"
import ButtonComponent from "../custom/button"
import { SendHorizonal, Brain, Earth, CommandIcon, CornerDownLeft, Package, Hash, CircleStop, PackageOpen } from "lucide-react"

import { useAppStore } from "../../store/app"
import { useResizeAppWindow } from "../../hooks/resizeAppWindow"

const searchComponentAnim = {
    searchWrapper: {
        initial: { height: "160px" },
        expand: { height: "115px" },
        collapse: { height: "160px" },
        transition: { duration: 0.75, type: "spring" }
    },
    searchTextBox: {
        initial: { height: "10px" },
        expand: { height: "50px" },
        collapse: { height: "90px" },
        transition: { duration: 0.75, type: "spring" }
    }
}

function SearchComponent() {
    const { mode, setMode, currentModel, webSearch, deepThink, setWebSearch, setDeepThink } = useAppStore();

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSearch = () => {
        if (mode === "search") {
            setMode("off");
            useResizeAppWindow(600, 120);
        } else {
            setMode("search");
            useResizeAppWindow(600, 500);
        }
    }

    const handleModelSelection = () => {
        if (mode === "search" || mode === "off") {
            setMode("model");
            useResizeAppWindow(600, 500);
        } else if (mode === "model") {
            setMode("off");
            useResizeAppWindow(600, 120);
        }
    }
    return (
        <motion.div className={`${styles.searchWrapper}`}
            variants={searchComponentAnim.searchWrapper}
            initial="initial"
            animate={mode === "search" || mode === "model" ? "expand" : "collapse"}>
            <div className={styles.searchContainer}>
                <motion.div className={styles.searchInputContainer}
                    variants={searchComponentAnim.searchTextBox}
                    initial="initial"
                    animate={mode === "search" || mode === "model" ? "expand" : "collapse"}>
                    <textarea
                        ref={textareaRef}
                        placeholder="Ask Anything..."
                        className={styles.searchInput}
                        autoComplete="true"
                        autoCorrect="true"
                        spellCheck={true}
                        aria-multiline="true"
                        autoFocus
                        rows={1}
                    />
                </motion.div>
                <div className={styles.searchActionContainer}>
                    <div className={styles.searchActionButtonContainer}>
                        <ButtonComponent
                            defaultIcon={<Earth />}
                            buttonLabel="Web Search"
                            clickBehavior={() => setWebSearch(!webSearch)}
                            isActive={webSearch}
                            showLabelOnCLick={true}
                            changeIconOnClick={false}
                            disabled={false}
                        />
                        <ButtonComponent
                            defaultIcon={<Brain />}
                            buttonLabel="Deep Think"
                            clickBehavior={() => setDeepThink(!deepThink)}
                            isActive={deepThink}
                            showLabelOnCLick={true}
                            changeIconOnClick={false}
                            disabled={false}
                        />
                    </div>
                    <div className={styles.modelNameContainer}>
                        <div className={styles.modelName}>{currentModel}</div>
                    </div>
                    <div className={styles.actionsContainer}>
                        <AnimatePresence>
                            <ButtonComponent
                                defaultIcon={<Package />}
                                changeIconOnClick={true}
                                activeIcon={mode !== "model" ? <Package /> : <PackageOpen />}
                                shortcut={<><CommandIcon /> + <Hash /></>}
                                clickBehavior={handleModelSelection}
                                showLabelOnCLick={false}
                                disabled={false}
                            />
                            <ButtonComponent
                                defaultIcon={<SendHorizonal />}
                                changeIconOnClick={true}
                                activeIcon={mode === "search" ? <CircleStop /> : <SendHorizonal />}
                                showLabelOnCLick={false}
                                clickBehavior={handleSearch}
                                shortcut={<><CommandIcon /> + <CornerDownLeft /></>}
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default SearchComponent
