import React from 'react'

import styles from "./styles.module.scss"

function ButtonComponent({ logo, click, label }: { logo: React.ReactNode, click: React.MouseEventHandler, label?: React.ReactNode }) {
    return (
        <div className={styles.buttonWrapper}>
            {label && <span className={styles.buttonText}>{label}</span>}
            <button className={styles.customButton} onClick={click}>
                {logo}
            </button>
        </div>

    )
}

export default ButtonComponent;