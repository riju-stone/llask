
import { AnimatePresence, motion } from 'motion/react'

import styles from './styles.module.scss'

type ResponseComponentProps = {
    mode: string,
    setModel?: (model: string) => void;
}

const responseAnim = {
    initial: {
        opacity: 0,
        y: -70
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.83, 0, 0.17, 1],
            opacity: {
                duration: 0.2,
                delay: 0.2
            }
        }
    }
}

function ResponseComponent({ mode }: ResponseComponentProps) {
    return (
        <motion.div
            className={styles.responseWrapper}
            variants={responseAnim}
            initial="initial"
            animate={mode == "off" ? "initial" : "show"}
        >
            <AnimatePresence mode='wait'>
                {mode == "search" && <motion.div key="search"
                    initial={{ opacity: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3, ease: [0.83, 0, 0.17, 1] }}
                    className={styles.responseGeneratorContainer}>{mode}</motion.div>}
                {mode == "model" && <motion.div key="model"
                    initial={{ opacity: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3, ease: [0.83, 0, 0.17, 1] }}
                    className={styles.responseChatContainer}>{mode}</motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}

export default ResponseComponent
