import styles from "styles/SettingInput.module.scss"

const SettingInput =({label, placeholder,defaultValue})=> {
    return(
        <div className={styles.inputContainer}>
            <label>{label}</label>
            <input type="text" placeholder={placeholder} defaultValue={defaultValue} />
        </div>
    )
}

export default SettingInput