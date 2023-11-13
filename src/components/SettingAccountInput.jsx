import styles from "styles/SettingAccountInput.module.scss"

const SettingAccountInput =({
    label, 
    value, 
    placeholder, 
    errMassage, 
    onChange } )=> {

    return(
        <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
                <label>{label}</label>
                <div className={styles.aWrapper}>
                    <div className={styles.forA}>@</div>
                    <input type="text" value={value} placeholder={placeholder}  onChange={(e) => onChange?.(e.target.value)} />
                </div>
            </div>
            <div className={styles.errMassage}>{errMassage}</div>
        </div>
    )
}

export default SettingAccountInput