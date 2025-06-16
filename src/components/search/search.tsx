import { useRef, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { motion } from "motion/react"
import ButtonComponent from "../custom/button"
import { SendHorizonal, Brain, Earth, CommandIcon, CornerDownLeft, Package, Hash, CircleStop, PackageOpen } from "lucide-react"
import { useResizeAppWindow } from "../../hooks/resize"
import debounce from "../../utils/debounce"

type SearchComponentProps = {
    mode: string;
    setMode: (mode: string) => void;
    currModel?: string;
}

function SearchComponent({ mode, setMode, currModel }: SearchComponentProps) {
    const searchContainer = useRef(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [containerHeight, setContainerHeight] = useState("5rem")

    const handleInput = debounce(() => {
        if (textareaRef.current) {
            // Reset height to calculate properly
            textareaRef.current.style.height = "auto";

            // Calculate the new height based on content
            const scrollHeight = textareaRef.current.scrollHeight;

            // Set textarea height directly to avoid scroll
            textareaRef.current.style.height = `${scrollHeight}px`;

            // Update container height - accounting for padding and action container
            const actionContainerHeight = 16; // 2.5rem in pixels
            const padding = 32; // Additional padding for container

            // Calculate new container height with constraints
            const minHeight = 80; // 5rem
            const maxHeight = 160; // 10rem
            const newHeight = Math.min(Math.max(scrollHeight + actionContainerHeight + padding, minHeight), maxHeight);

            // Important: Update both state and directly set the style
            setContainerHeight(`${newHeight}px`)

            // Sett a fixed window height when im search mode
            // This is a workaround to ensure the app window resizes correctly
            // when the search bar expands
            if (mode === "search" || mode === "model") {
                useResizeAppWindow((510 + newHeight) - 90);
            } else if (mode === "off") {
                useResizeAppWindow(newHeight + 15);
            }

            // Directly set the style on the container for immediate effect
            if (searchContainer.current) {
                (searchContainer.current as HTMLElement).style.height = `${newHeight}px`;
            }
        }
    }, 100)

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

    // Ensure textarea is properly sized when component mounts or mode state changes
    useEffect(() => {
        if (textareaRef.current) {
            // Add a slight delay to ensure DOM is ready
            setTimeout(() => {
                handleInput();
            }, 10);
        }
    }, [mode]);

    return (
        <motion.div
            ref={searchContainer}
            className={`${styles.searchWrapper} ${mode == "search" ? styles.searchWrapperActive : styles.searchWrapperInActive}`}
            style={{ height: mode == "search" ? containerHeight : "6rem" }}
            variants={{
                initial: { height: "6rem", opacity: 0 },
                show: {
                    opacity: 1,
                    height: "6rem",
                    transition: {
                        duration: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                        opacity: { duration: 0.15 }
                    }
                },
                search: {
                    height: containerHeight,
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
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        aria-multiline="true"
                        autoFocus
                        onInput={handleInput}
                        onChange={handleInput}
                        rows={1}
                    />
                </div>
                <div className={styles.searchActionContainer}>
                    <div className={styles.searchActionButtonContainer}>
                        <ButtonComponent
                            defaultIcon={<Earth />} buttonLabel="Web Search" clickBehavior={() => { }}
                            showLabelOnCLick={true} changeIconOnClick={false} disabled={false}
                        />
                        <ButtonComponent
                            defaultIcon={<Brain />} buttonLabel="Deep Think" clickBehavior={() => { }}
                            showLabelOnCLick={true} changeIconOnClick={false} disabled={false}
                        />
                    </div>
                    <div className={styles.modelNameContainer}>
                        <div className={styles.modelName}>{currModel}</div>
                    </div>
                    <div className={styles.actionsContainer}>
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
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default SearchComponent
