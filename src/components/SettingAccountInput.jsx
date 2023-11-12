import styles from "styles/SettingAccountInput.module.scss"

const SettingAccountInput =({
    label, 
    value, 
    placeholder, 
    errMassage, 
    onChange } )=> {
<<<<<<< HEAD

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
=======
    

    return(
        <div className={styles.inputContainer}>
            <div className={styles.inputContainer}>
                <label>{label}</label>
                <input type="text" value={value} placeholder={placeholder}  onChange={(e) => onChange?.(e.target.value)} />
            </div>
            <div className={styles.errMassage}> {errMassage}</div>
>>>>>>> 82d3d1e (add error hint)
        </div>
    )
}

export default SettingAccountInput