import React from 'react'
import { AnimatePresence, motion } from "motion/react"
import styles from "./styles.module.scss"

type ButtonProps = {
    disabled?: boolean;
    defaultIcon: React.ReactNode;
    clickBehavior: React.MouseEventHandler;
    shortcut?: React.ReactNode | string;
    showLabelOnCLick: boolean;
    changeIconOnClick: boolean;
    buttonLabel?: string;
    activeIcon?: React.ReactNode;
}

function ButtonComponent({
    disabled,
    defaultIcon,
    clickBehavior,
    shortcut,
    showLabelOnCLick,
    changeIconOnClick,
    buttonLabel,
    activeIcon }: ButtonProps) {
    const [buttonActive, setButtonActive] = React.useState(false);

    const handleButtonClick: React.MouseEventHandler = (event) => {
        if (disabled) {
            event.preventDefault();
            return;
        }

        console.log("Button clicked, showing label:", buttonLabel);
        setButtonActive(!buttonActive);

        clickBehavior(event);
    };

    return (
        <motion.div
            layout
            className={styles.buttonWrapper}
            initial={false}
        >
            {shortcut && <div className={styles.buttonShortcutContainer}>{shortcut}</div>}
            <motion.button
                layout
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={styles.buttonContainer}
                onClick={handleButtonClick}
                disabled={disabled}>
                <AnimatePresence mode="wait">
                    {buttonLabel && showLabelOnCLick && buttonActive && (
                        <motion.div
                            key="label"
                            initial={{ opacity: 0, x: -10, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: "auto" }}
                            exit={{ opacity: 0, x: -10, width: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                            className={styles.buttonLabelContainer}>
                            {buttonLabel}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={styles.buttonIconContainer}>
                    {changeIconOnClick && buttonActive ? activeIcon : defaultIcon}
                </div>
            </motion.button>
        </motion.div>
    )
}

export default ButtonComponent;