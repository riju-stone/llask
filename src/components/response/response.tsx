
import { motion } from 'motion/react'

import styles from './styles.module.scss'

const responseAnim = {
    initial: {
        opacity: 0,
        y: -400
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.83, 0, 0.17, 1],
            opacity: {
                duration: 0.35
            }
        }
    }
}

function ResponseComponent({ searching }: { searching: boolean }) {
    return (
        <motion.div
            className={styles.responseWrapper}
            variants={responseAnim}
            initial="initial"
            animate={searching ? "show" : "initial"}
        >
            <div className={styles.responseGeneratorContainer}></div>
        </motion.div>
    )
}

export default ResponseComponent
