import React from 'react';

import { motion } from "motion/react"
import styles from "./styles.module.scss"
import { ChevronDown } from 'lucide-react';

function ModelSelectionDropDown()
{
    return (
        <div className={styles.dropdownWrapper}>
            <div className={styles.dropdownContainer}>
                <div className={styles.dropdownHeader}>
                    <div className={styles.dropdownTitle}>Model</div>
                    <div className={styles.dropdownIcon}><ChevronDown/></div>
                </div>
            </div>
        </div>
    )
}

export default ModelSelectionDropDown