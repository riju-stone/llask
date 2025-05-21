import { useRef, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { motion } from "motion/react"
import { easeIn } from "motion"
import ButtonComponent from "../custom/button"
import ModelSelectionDropDown from "../model/Model"
import { SendHorizonal, File, Brain, Image, Earth, CommandIcon, CornerDownLeft, Package } from "lucide-react"

function SearchComponent({ searching, setSearching }: { searching: boolean, setSearching: (searching: boolean) => void })
{
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

    // Auto-resize the textarea on input
    const handleInput = () =>
    {
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
            setContainerHeight(`${newHeight}px`);

            // Directly set the style on the container for immediate effect
            if (searchContainer.current) {
                (searchContainer.current as HTMLElement).style.height = `${newHeight}px`;
            }
        }
    }

    const handleSearch = () =>
    {
        setSearching(!searching);
    }

    // Ensure textarea is properly sized when component mounts or searching state changes
    useEffect(() =>
    {
        if (textareaRef.current) {
            // Add a slight delay to ensure DOM is ready
            setTimeout(() =>
            {
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
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
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
                        <ButtonComponent logo={<Earth />} click={() => { }} />
                        <ButtonComponent logo={<Brain />} click={() => { }} />
                        <ButtonComponent logo={<File />} click={() => { }} />
                        <ButtonComponent logo={<Image />} click={() => { }} />
                    </div>
                    <div className={styles.modelSelectionWrapper}>
                        <ModelSelectionDropDown />
                        <ButtonComponent logo={<Package />} click={() => { }} />
                    </div>
                    <ButtonComponent logo={<SendHorizonal />} click={handleSearch}
                        label={<><CommandIcon /> + <CornerDownLeft /></>} />
                </div>
            </div>
        </motion.div>
    )
}

export default SearchComponent
