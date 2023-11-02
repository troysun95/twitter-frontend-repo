import styles from 'styles/Input.module.scss'


export default function Input({placeholder, label, alarms }){
    return(
        <>
        <div className={styles.inputWrapper}>
            <label>{label}</label>
            <input type="text" placeholder={placeholder}/>
        </div>     
        <div className={styles.alarmsWrapper}>
            <div>{alarms}</div>
        </div>
        </>
        
        
    )
}

