import React from 'react'

import styles from "./styles.module.scss"

function ButtonComponent({ logo, click, label }: { logo: React.ReactNode, click: React.MouseEventHandler, label?: React.ReactNode }) {
    return (
        <button className={styles.customButton} onClick={click}>
            {label && <span className={styles.buttonText}>{label}</span>}            
            {logo}
        </button>
    )
}

export default ButtonComponent;