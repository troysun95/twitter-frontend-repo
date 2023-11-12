import styles from "styles/TweetModal.module.scss"
import { ReactComponent as SaveBtn } from "icons/saveBtn.svg"
import { useState } from "react";
import { ReactComponent as DeleteActive } from "icons/deleteActive.svg";
import clsx from 'clsx'
import {EditUserProfile} from "api/twitter"


export default function EditUserProfileModal({user, onClick, isOpen}){
    const [name, setName] =useState("");
    const [introduction, setIntroductio]= useState("")
    const[isError, setIsError] = useState(false)
    const [avatar, setAvatar]= useState(user.avatar)
    const [cover, setCover] = useState(user.cover)
    
    function handleNameCheck(e){
        const input = e.target.value
        if(input.trim().length > 0 && input.length < 51){
            setIsError(false)
        }else{
            setIsError(true)
        }
        setName(input)
    }

    function handleIntroductionCheck(e){
        const input = e.target.value
        if(input.trim().length > 0 && input.length < 161){
        if(input.length >50){
            setIsError(false)
        }else{
            setIsError(true)
        }
        setIntroductio(input)
        }
    }
    

    const handleSave = async() => {
        if(!isError){
            const  res = await EditUserProfile(user.id, {
                name,
                cover,
                avatar,
                introduction,
            });
            if(res.data.status === "success"){
                
                console.log('儲存成功')
            }
            }else{
                console.log('儲存失敗')
                return
            }
        }
        
    return(
        <div className={clsx(styles.userProfileContainer, { [styles.open]: isOpen })}>
            <div className={styles.header}>
                 <div className={styles.userProfile} onClick={onClick}><DeleteActive/></div>
            </div>
            <div className={styles.userProfileWrapper}>
                <div className={styles.cover} >
                    <UpdateIcon onClick={handleUpdateCover}/>
                    <DeleteIcon onClick={handleDelteCover}/>
                    <div className={styles.updateCover}>
                        <img src={cover} alt="cover" />  
                    </div>
                </div>
                <div className={styles.avatar}>
                    <UpdateIcon onClick={handleUpdateAvatar}/>
                    <div className={styles.avatar}>
                        <img src={avatar} alt="avatar"/>
                    </div>
                </div>
                <input type="textarea"  value={name}  onChange={handleNameCheck}/>
                <div className={styles.nameCount}>{name.length}/50</div>
                <input type="textarea"  value={introduction}  onChange={handleIntroductionCheck}/>
                <div className={styles.introductionCount}>{introduction.length}/160</div>
                <div className={styles.tweetBtn} onClick={handleSave}><SaveBtn/></div>
            </div>
        </div>
    )
}