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
        <div className={styles.buttonWrapper}>
            {shortcut && <div className={styles.buttonShortcutContainer}>{shortcut}</div>}
            <AnimatePresence>
                <motion.button
                    transition={{ duration: 0.2 }}
                    className={styles.buttonContainer} onClick={handleButtonClick} disabled={disabled}>
                    {buttonLabel && showLabelOnCLick && buttonActive &&
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={styles.buttonLabelContainer}>{buttonLabel}
                        </motion.div>}

                    <div className={styles.buttonIconContainer}>
                        {changeIconOnClick && buttonActive ? activeIcon : defaultIcon}
                    </div>
                </motion.button>
            </AnimatePresence>
        </div>
    )
}

export default ButtonComponent;