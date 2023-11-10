import clsx from 'clsx';
import styles from "styles/SwitchButtonPanel.module.scss"
import { useState } from 'react';
import { useNavigate } from "react-router-dom"

function SwitchButton ({title, isActive, id, handelClick}){
    return (
        <div className={clsx(styles.button, {[styles.active]: isActive})} onClick={() => handelClick(id)} id={id}>
        <span>{title}</span>
        </div>
    )
}

export default function SwitchButtonPanel() {
    //state
    const prevActive = [0, 1 ]
    const [isActive, setIsActive] = useState(prevActive)
    const navigate = useNavigate('')

    //handler
    const handelClick = (id) => {
        if(id === 0){
            setIsActive([1, 0])
            // alert("GET follower")
            navigate('/user/follower')
        }else if(id === 1){
            setIsActive([0, 1])
            // alert("GET following")
            navigate('/user/following')

        }
    }

    return(
        <div className={styles.buttonPanel}>
            <SwitchButton title="追蹤者" isActive={isActive[0]} id={0} handelClick={handelClick}/>
            <SwitchButton title="正在追蹤" isActive={isActive[1]} id={1} handelClick={handelClick}/>
        </div>
    )
}
