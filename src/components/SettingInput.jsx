import styles from "styles/SettingInput.module.scss"

const SettingInput =({label, placeholder,defaultValue, errMassage, isError} )=> {

    return(
        <div className={styles.inputContainer}>
            <div className={styles.inputContainer}>
                <label>{label}</label>
                <input type="text" placeholder={placeholder} defaultValue={defaultValue} />
            </div>
            <div className={styles.errMassage}>{isError ?  errMassage : ''}</div>
        </div>
    )
}

export default SettingInput