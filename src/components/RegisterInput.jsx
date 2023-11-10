import styles from "styles/RegisterInput.module.scss"

const RegisterInput =({
    label, 
    value, 
    placeholder, 
    defaultValue, 
    errMassage, 
    onChange } )=> {

    return(
        <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
                <label>{label}</label>
                <input type="text" value={value} placeholder={placeholder} defaultValue={defaultValue} onChange={(e) => onChange?.(e.target.value)} />
            </div>
            <div className={styles.errMassage}>{errMassage}</div>
        </div>
    )
}

export default RegisterInput