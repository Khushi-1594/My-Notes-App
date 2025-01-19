import React, { useEffect, useState } from "react";
import SideBar from "./sidebar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../App.css"
import Enabledbtn from "../assets/enabled.png";
import Disabledbtn from "../assets/disabled.png";


export default function NotesPage(){
    const {groupName} = useParams();
    const navigate = useNavigate();
    const loaction = useLocation();
    const [notesText, setNotesText] = useState("");
    const [notes, setNotes] = useState([]);
    const [mobileView, setMobileView] = useState(window.innerWidth<=640);


    const [groups] = useState(()=>{
        const savedGrps = localStorage.getItem("groups");
        return savedGrps ? JSON.parse(savedGrps) : [];
    });

    const selectedGroup = groups.find((group)=> group.name === groupName);

    useEffect(()=>{
        const handleResize = () =>{
            setMobileView(window.innerWidth <=640);
        }
        window.addEventListener("resize", handleResize);
        return ()=> window.removeEventListener("resize", handleResize)
    },[])

    useEffect(()=>{
        if(!mobileView && location.pathname === "/"){
            navigate("/");
        }
    }, [mobileView, location.pathname, navigate])

    useEffect(() => {
        const savedNotes = localStorage.getItem(`notes-${groupName}`);
        if (savedNotes) {
            const parsedNotes = JSON.parse(savedNotes);
            setNotes(parsedNotes);
        } 
        else {
            setNotes([]);
        }
    }, [groupName]);

    const addNote = ()=>{
        if(notesText.trim()){
            const newNote={
                text: notesText,
                createdAt: new Date().toLocaleString(),
            }

            const updateNotes = [...notes, newNote];
            setNotes(updateNotes)
            localStorage.setItem(`notes-${groupName}`, JSON.stringify(updateNotes));
            setNotesText("");
        }
    }

    const handleKeyDown=(event)=>{
        if(event.key === "Enter" && !event.shiftKey){
            event.preventDefault();
            addNote();
        }
    }

    const handleGrpClick = (groupName)=>{
        navigate(`/${groupName}`)
    }

    return(
        <div className={`main-div ${mobileView ? "notes-view": ""}`}>
         {!mobileView && <SideBar groups={groups} onGroupClick={handleGrpClick} openModal={null} />}

            <div className="notes-main">
                {selectedGroup && (
                    <div className="group-header">
                        <span
                            className="group-icon large"
                            style={{ backgroundColor: selectedGroup.color }}>
                            {selectedGroup.name
                                .split(" ")
                                .slice(0, 2)
                                .map((word) => word[0]?.toUpperCase())
                                .join("")}
                        </span>
                        <h2 className="selected-group-name">{selectedGroup.name}</h2>
                    </div>
                )}

                <div className="note-container">
                    {notes.map((note, index)=>(
                        <div key={index} className="note">
                            <p>{note.text}</p>
                            <span className="timeStamp">{note.createdAt}</span>
                        </div>
                    ))}
                </div>

                <div className="notes-bottom-area">
                <div className="textarea-wrap">
                    <textarea placeholder="Enter your text here...." value={notesText} on onChange={(e)=> setNotesText(e.target.value)} onKeyDown={handleKeyDown} className="note-textarea" />
                    <button onClick={addNote} disabled={!notesText.trim()} className="addnote-btn">
                        <img src={notesText.trim() ? Enabledbtn : Disabledbtn} className="addbtn-img"></img>
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}