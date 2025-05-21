import React from 'react';

import { motion } from "motion/react"
import styles from "./styles.module.scss"
import { ChevronDown } from 'lucide-react';

function ModelSelectionDropDown() {
    return (
        <div className={styles.dropdownWrapper}>
            <div className={styles.modelName}>gemini-2.5-pro</div>
            <div className={styles.modelDropdown}></div>
        </div>
    )
}

export default ModelSelectionDropDown