import styles from "styles/EditUserProfileModal.module.scss"
import { ReactComponent as SaveBtn } from "icons/saveBtn.svg"
import { useState } from "react";
import { ReactComponent as DeleteActive } from "icons/deleteActive.svg";
import clsx from 'clsx'
import {EditUserProfile} from "api/twitter"


export default function EditUserProfileModal({user, handleModalClose, isOpen}){
    const [name, setName] =useState(user.name);
    const [introduction, setIntroductio]= useState(user.introduction)
    const[isError, setIsError] = useState(false)
    // const [avatar, setAvatar]= useState(user.avatar)
    // const [cover, setCover] = useState(user.cover)
    //更新檔案後...
    // setAvatar(avatar)
    // setCover(cover)
    console.log(user.name)

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
                // cover,
                // avatar,
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
                 <div className={styles.userProfile} onClick={handleModalClose}><DeleteActive/></div>
            </div>
            <div className={styles.userProfileWrapper}>
                <div className={styles.coverWrapper} >
                    {/* <UpdateIcon onClick={handleUpdateCover}/>
                    <DeleteIcon onClick={handleDelteCover}/> */}
                    <div className={styles.updateCover}>
                        <img src={user.cover} alt="cover" />  
                    </div>
                </div>
                <div className={styles.avatarWrapper}>
                    {/* <UpdateIcon onClick={handleUpdateAvatar}/> */}
                    <div className={styles.updateavatar}>
                        <img src={user.avatar} alt="avatar"/>
                    </div>
                </div>
                <div className={styles.nameWrapper}>
                    <label>名稱</label>
                    <input type="text" className={styles.name} value={name}  onChange={handleNameCheck}/>
                    <div className={styles.nameCount}>{name.length}/50</div>
                </div>
                <div className={styles.introductionWrapper}>
                    <label>自我介紹</label>
                    <span>{user.name}</span>
                    <input type="textarea"  className={styles.introduction} value={introduction}  onChange={handleIntroductionCheck}/>
                    <div className={styles.introductionCount}>{introduction.length}/160</div>
                </div>
                <div className={styles.tweetBtn} onClick={handleSave}><SaveBtn/></div>
            </div>
        </div>
    )
}