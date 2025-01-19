import React from "react";
import "../App.css"

export default function SideBar({groups, openModal, onGroupClick}){
    return (
        <div className="sidebar">
        <div className="sidebar-heading">
        <h2>Pocket Notes</h2>
        </div>
        <div className="grp-list">
        <ul>
                {groups.map((group, index) => (
                    <li key={index} className="grp-item" onClick={()=> onGroupClick(group.name)}>
                        <span
                            className="grp-icon"
                            style={{ backgroundColor: group.color }}
                        >
                            {group.name
                                .split(" ")
                                .slice(0, 2)
                                .map((word) => word[0]?.toUpperCase())
                                .join("")}
                        </span>
                        {group.name}
                    </li>
                ))}
            </ul>
        </div>
            <button className="addgroup-btn" onClick={openModal}>
                +
            </button>
        </div>
    );
}