import { AnimatePresence, motion } from 'motion/react'

import styles from './styles.module.scss'
import { useAppStore } from "../../store/app"
import ModelSwitcher from '../model-switcher/model-switcher';

const responseComponentAnim = {
    responseGeneratorContainer: {
        initial: { height: "0px" },
        expand: { height: "100%" },
        exit: { height: "0px" },
        transition: { duration: 0.2, type: "spring" }
    },
    responseContent: {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
        transition: { duration: 0.2, type: "spring" }
    }
}

function ResponseComponent() {
    const { mode } = useAppStore();

    return (
        <AnimatePresence>
            {mode === "search" || mode === "model" ? (
                <motion.div
                    className={styles.responseWrapper}
                    variants={responseComponentAnim.responseGeneratorContainer}
                    initial="initial"
                    animate={mode === "search" || mode === "model" ? "expand" : "initial"}
                    exit="exit">
                    <AnimatePresence mode='wait'>
                        {mode == "search" && <motion.div key="search"
                            className={styles.responseGeneratorContainer}
                            variants={responseComponentAnim.responseContent}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {mode}
                        </motion.div>}
                        {mode == "model" && <motion.div key="model"
                            className={styles.responseGeneratorContainer}
                            variants={responseComponentAnim.responseContent}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <ModelSwitcher />
                        </motion.div>}
                    </AnimatePresence>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}

export default ResponseComponent
