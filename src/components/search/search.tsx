import { useRef, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { motion } from "motion/react"
import { easeIn } from "motion"
import ButtonComponent from "../custom/button"
import { SendHorizonal, File, Brain, Image, Earth, CommandIcon, CornerDownLeft, Package, Hash, CircleStop, PackageOpen } from "lucide-react"
import { useResizeAppWindow } from "../../hooks/resize"
import debounce from "../../utils/debounce"

function SearchComponent({ searching, setSearching }: { searching: boolean, setSearching: (searching: boolean) => void }) {
    const searchContainer = useRef(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [containerHeight, setContainerHeight] = useState("5rem")

    const searchBarAnim = {
        initial: {
            height: "0px",
            opacity: 0
        },
        show: {
            opacity: 1,
            height: `${containerHeight}`,
            transition: {
                duration: 0.5,
                ease: [0.83, 0, 0.17, 1],
                opacity: {
                    duration: 0.2
                }
            },
        },
        search: {
            height: `${containerHeight}`,
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: easeIn
            },
        }
    }

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

            // Sett a fixed window height when searching
            // This is a workaround to ensure the app window resizes correctly
            // when the search bar expands
            if (searching) {
                useResizeAppWindow((510 + newHeight) - 90);
            } else {
                useResizeAppWindow(newHeight + 15);
            }

            // Directly set the style on the container for immediate effect
            if (searchContainer.current) {
                (searchContainer.current as HTMLElement).style.height = `${newHeight}px`;
            }
        }
    }, 100)

    const handleSearch = () => {
        setSearching(!searching);
    }

    // Ensure textarea is properly sized when component mounts or searching state changes
    useEffect(() => {
        if (textareaRef.current) {
            // Add a slight delay to ensure DOM is ready
            setTimeout(() => {
                handleInput();
            }, 10);
        }
    }, [searching]);

    return (
        <motion.div
            ref={searchContainer}
            className={`${styles.searchWrapper} ${searching ? styles.searchWrapperActive : styles.searchWrapperInActive}`}
            style={{ height: searching ? containerHeight : "6rem" }}
            variants={searchBarAnim}
            initial="initial"
            animate={searching ? "search" : "show"}
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
                        <ButtonComponent
                            defaultIcon={<File />} clickBehavior={() => { }}
                            showLabelOnCLick={false} changeIconOnClick={false} disabled={false}
                        />
                        <ButtonComponent
                            defaultIcon={<Image />} clickBehavior={() => { }}
                            showLabelOnCLick={false} changeIconOnClick={false} disabled={false}
                        />
                    </div>
                    {/* <ModelSelectionDropDown /> */}
                    <ButtonComponent
                        defaultIcon={<Package />}
                        changeIconOnClick={true}
                        activeIcon={<PackageOpen />}
                        shortcut={<><CommandIcon /> + <Hash /></>}
                        clickBehavior={() => { }}
                        showLabelOnCLick={false}
                        disabled={false}
                    />
                    <ButtonComponent
                        defaultIcon={<SendHorizonal />}
                        changeIconOnClick={true}
                        activeIcon={<CircleStop />}
                        showLabelOnCLick={false}
                        clickBehavior={handleSearch}
                        shortcut={<><CommandIcon /> + <CornerDownLeft /></>}
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default SearchComponent
