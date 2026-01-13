import { useRef } from "react"
import styles from "./styles.module.scss"
import { AnimatePresence, motion } from "motion/react"
import ButtonComponent from "../custom/button"
import { SendHorizonal, Brain, Earth, CommandIcon, CornerDownLeft, Package, Hash, CircleStop, PackageOpen } from "lucide-react"

import { useAppStore } from "../../store/app"

function SearchComponent() {
    const { mode, setMode, currentModel, webSearch, deepThink, setWebSearch, setDeepThink } = useAppStore();

    const searchContainer = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSearch = () => {
        if (mode === "search") {
            setMode("off");
        } else {
            setMode("search");
        }
    }

    const handleModelSelection = () => {
        if (mode === "search" || mode === "off") {
            setMode("model");
        } else if (mode === "model") {
            setMode("off");
        }
    }
    return (
        <motion.div
            ref={searchContainer}
            className={`${styles.searchWrapper} ${mode == "search" ? styles.searchWrapperActive : styles.searchWrapperInActive}`}
            // style={{ height: mode == "search" ? `${containerHeight}px` : "6rem" }}
            variants={{
                initial: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        duration: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                        opacity: { duration: 0.15 }
                    }
                },
                search: {
                    opacity: 1,
                    transition: {
                        duration: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                        opacity: { duration: 0.15 }
                    }
                }
            }}
            initial="initial"
            animate={mode == "search" ? "search" : "show"}
        >
            <div className={styles.searchContainer}>
                <div className={styles.searchInputContainer}>
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
                </div>
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
