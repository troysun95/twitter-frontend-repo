import clsx from 'clsx';
import styles from "styles/SwitchButtonPanel.module.scss"
import { useState } from 'react';
function SwitchButton ({title, isActive, id, handelClick}){
    return (
        <div className={clsx(styles.button, {[styles.active]: isActive})} onClick={() => handelClick(id)} id={id}>
        <span>{title}</span>
        </div>
    )
}

export default function SwitchButtonPanel(){
    //state
    const prevActive = [1, 0 ,0]
    const [isActive, setIsActive] = useState(prevActive)

    //handler
    const handelClick = (id)=>{
        if(id === 0){
            setIsActive([1, 0, 0])
            alert("GET tweets")
        }else if(id === 1){
            setIsActive([0, 1, 0])
            alert("GET reply")
        }else{
            setIsActive([0, 0, 1])
            alert("GET like")
        }
    }

    return(
        <div className={styles.buttonPanel}>
            <SwitchButton title="推文" isActive={isActive[0]} id={0} handelClick={handelClick}/>
            <SwitchButton title="回覆" isActive={isActive[1]} id={1} handelClick={handelClick}/>
            <SwitchButton title="喜歡的內容" isActive={isActive[2]} id={2} handelClick={handelClick}/>
        </div>
    )
}
