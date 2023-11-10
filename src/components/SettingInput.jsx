import styles from "styles/SettingInput.module.scss"

const SettingInput =({
    label, 
    value, 
    placeholder, 
    errMassage, 
    onChange } )=> {

    return(
        <div className={styles.inputContainer}>
            <div className={styles.inputContainer}>
                <label>{label}</label>
                <input type="text" value={value} placeholder={placeholder}  onChange={(e) => onChange?.(e.target.value)} />
            </div>
            <div className={styles.errMassage}>{errMassage}</div>
        </div>
    )
}

export default SettingInput