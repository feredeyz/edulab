import Header from "./Header";
import "../styles/AddCourse.css";
import { useState, useEffect, useRef } from "react";
import React from "react";
import * as image from "../images/check.png";

export default function AddCourse() {
    const [blocks, setBlocks] = useState([]);
    const newBlockRef = useRef(null);
    const course = {
        "meta": {
            "name": "",
            "author": "",
            "date": "",
            "description": "",
            "tags": []
        },
    
        "lessons": [
            
        ]
    }

    const completeCourse = () => {
        blocks.map(block => {
            if (block.type === "p") {
                console.log(block.textContent);
                
                course.lessons.push({
                    "type": "text",
                    "content": block.innerHTML
                });
            } else if (block.type === "div") {
                if (block.querySelector("video")) {
                    course.lessons.push({
                        "type": "video",
                        "content": block.querySelector("video").src
                    });
                } else if (block.querySelector("img")) {
                    course.lessons.push({
                        "type": "image",
                        "content": block.querySelector("img").src
                    });
                }
            }
            return 0;
        })

        console.log(course);
        
    }

    const popSelectWindow = () => {
        const popup = document.getElementById("popup-window");
        if (popup.classList.contains("show")) {
            popup.classList.remove("show");
            setTimeout(() => popup.classList.add("hidden"), 10);
        } else {
            popup.classList.remove("hidden");
            setTimeout(() => popup.classList.add("show"), 10);
        }
    };

    const addTextBlock = () => {
        const newBlock = (
            <p
                key={blocks.length}
                ref={newBlockRef}
                contentEditable
                className="block-text-block"
                suppressContentEditableWarning={true}
            >
                text
            </p>
        );
        setBlocks([...blocks, newBlock]);
    }

    useEffect(() => {
        if (newBlockRef.current) {
            newBlockRef.current.focus();
        }
    }, [blocks]);

    const addVideoBlock = () => {
        const newBlock = <div className="block-video-block" key={blocks.length}>
            <video className="video-block-content" controls>
                <source src={URL.createObjectURL(document.querySelector('.add-video').files[0])} type="video/mp4" />
            </video>
        </div>;
        setBlocks([...blocks, newBlock]);
    }

    const addImageBlock = () => {
        const newBlock = <div className="block-image-block" key={blocks.length}>
            <img className="image-block-content" src={URL.createObjectURL(document.querySelector('.add-image').files[0])} alt="img" />
        </div>;
        setBlocks([...blocks, newBlock]);
    }

    const clickOnImageInput = () => {
        document.querySelector('.add-image').click();
    }

    const clickOnVideoInput = () => {
        document.querySelector('.add-video').click();
    }


    return (
        <>
            <Header />
            <div id="page-add-course-content">
                <div className="add-block">
                    <div id="popup-window" className="pop-window hidden">
                        <button onClick={addTextBlock} className="add-text">Text</button>
                        <button onClick={clickOnVideoInput}>Video</button>
                        <input name="image-input" type="file" accept="video/mp4,video/x-m4v,video/*" onInput={addVideoBlock} className="add-video" />
                        <button onClick={clickOnImageInput}>Image</button>
                        <input name="video-input" type="file" accept="image/png, image/jpeg" onInput={addImageBlock} className="add-image" />
                    </div>
                    <button onClick={popSelectWindow} className="add-block-button">+</button>
                </div>
                <div className="blocks">
                    <input type="text" name="title" id="lesson-title" placeholder="Lesson title" />
                    {blocks.map((block, index) => (
                        <React.Fragment key={index}>{block}</React.Fragment>
                    ))}
                </div>
                <div>
                    <button onClick={completeCourse} className="complete-course"><img src={image.default} alt="Complete" /></button>
                </div>
            </div>
        </>
    );
}
