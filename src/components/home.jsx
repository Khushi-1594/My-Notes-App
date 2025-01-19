import React, { useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import CreateGroup from "./createGroup"
import SideBar from "./sidebar"
import BackgroundImg from "../assets/bgimage.png"
import LockImg from "../assets/lock.png"
import "../App.css"

export default function Home(){
    const [modalState, setModalState]= useState(false);

    const [groups, setGroups] = useState(()=>{
        const savedGrps=localStorage.getItem("groups");
        return savedGrps ? JSON.parse(savedGrps) : [];
    });

    const openModal=()=> setModalState(true);
    const closeModal =()=> setModalState(false);

    // //when component mounts
    // useEffect(()=>{
    //     const savedGrps = JSON.parse(localStorage.getItem("groups")) || [];
    //     setGroups(savedGrps);
    // },[]);

    //when component updates
    useEffect(()=>{
        localStorage.setItem("groups", JSON.stringify(groups));
    },[groups]);
    
    const navigate= useNavigate();

    const addGroup=(newGroup)=>{
        setGroups([...groups, newGroup]);
    }

    const handleGroupClick=(groupName)=>{
        navigate(`/${groupName}`);
    }
    return(
        <div className="main-div" >
            <SideBar groups={groups} openModal={openModal} onGroupClick={handleGroupClick}/>

            <div className="main">
                <div className="content">
                    <div className="image"><img src={BackgroundImg} alt="illustration" className="illustration-image"/></div>
                    <h1 className="title">Pocket Notes</h1>
                    <p className="description">Send and receive messages without keeping your phone online. <br />
                    Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
                </div>
                <div className="footer-div">
                    <p className="footer-text"><img src={LockImg} alt="lock" className="lock-img"/> end-to-end encrypted</p>
                </div>
            </div>

            {modalState && (
                <CreateGroup closeModal={closeModal} addGroup={addGroup} existingGrps={groups} />
            )}
        </div>
    )
}