import React, {useRef, useState} from "react";
import "../App.css"

export default function CreateGroup({closeModal, addGroup, existingGrps}){
    const modalRef= useRef(null);
    const [grpName, setGrpName] = useState("");
    const [selectColor, setSelectColor]= useState("");

    const handleGroupName=(e)=>{
        setGrpName(e.target.value);
    }

    const handleColorChange=(e)=>{
        setSelectColor(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        const isDuplicate= existingGrps.some((group)=> group.name.toLowerCase()=== grpName.toLowerCase());
        if(isDuplicate){
            alert("Group name must be unique. Please choose a different name.")
            return;
        }

        if(grpName && selectColor){
            addGroup({name: grpName, color: selectColor});
            closeModal();
        }
        else{
            alert("Please enter a group name and select a color.");
        }
    }

    const handleModalClose = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    return(
        <div className="modal-overlay" onClick={handleModalClose}>
            <div className="modal-box" ref={modalRef}>
                <h3>Create New Group</h3>
                <form onSubmit={handleSubmit}>
                    <label>Group Name
                        <input type="text" placeholder="Enter Group name" value={grpName} onChange={handleGroupName}></input>
                    </label>
                    <div className="color-selector">
                    <p>Choose Color</p>
                    <div className="color-options">
                        <label className="label-color">
                            <input type="radio" name="color" value="#B38BFA" onChange={handleColorChange} checked = {selectColor === "#B38BFA"}/>
                            <span className="color purple"></span>
                        </label>
                        <label className="label-color">
                            <input type="radio" name="color" value="#FF79F2" onChange={handleColorChange} checked={selectColor==="#FF79F2"} />
                            <span className="color pink"></span>
                        </label>
                        <label className="label-color">
                            <input type="radio" name="color" value="#43E6FC" onChange={handleColorChange} checked={selectColor==="#43E6FC"} />
                            <span className="color teal"></span>
                        </label>
                        <label className="label-color">
                            <input type="radio" name="color" value="#F19576" onChange={handleColorChange} checked={selectColor==="#F19576"} />
                            <span className="color orange"></span>
                        </label>
                        <label className="label-color">
                            <input type="radio" name="color" value="#0047FF" onChange={handleColorChange} checked={selectColor==="#0047FF"} />
                            <span className="color dark-blue"></span>
                        </label>
                        <label className="label-color">
                            <input type="radio" name="color" value="#6691FF" onChange={handleColorChange} checked={selectColor==="#6691FF"} />
                            <span className="color blue"></span>
                        </label>
                        </div>
                    </div>
                    <button type="submit" className="create-btn">
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}