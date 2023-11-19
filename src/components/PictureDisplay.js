import React, { useState, useEffect } from 'react';
import * as Images from '../Images'; // Import all images as a single object
import './PictureDisplay.css';

const PictureGrid = ({ searchTerm, onSearch }) => {
    const [showAllImages, setShowAllImages] = useState(false); // New state variable

    const imageNames = [
        "Afternoon", "Again", "Alright", "Ask", "AssalamOAlaikum", "Attendance", "Bad", "Beautiful", "Best", "Big",
        "Bird", "Birthday", "BoyOrMan", "Bye", "Chair", "Cheap", "Child", "Clean", "Cold", "Come", "Congratulations", "Deaf",
        "Difficult", "Do", "Eat", "Evening", "Facebook", "Faith", "Fall", "Fight", "Food", "GirlOrWoman", "Go", "Good", "Hang", "Happy", "Hello", "HeSheIt",
        "Home", "Hot", "How", "I", "Internet", "Know", "Later", "Laugh", "Leave", "Listen", "Love", "Market", "Maybe", "Me", "Meet", "Money",
        "More", "Morning", "Mosque", "Name", "Need", "Night", "Not", "Old", "Pakistan", "Pull", "Push", "Quiet", "Read", "Rich", "Right", "Sad",
        "See", "Shift", "Siblings", "Sick", "Sing", "Sit", "Sleep", "Small", "Smile", "Soon", "Sorry", "Speak", "Stand", "Straight",
        "Study", "Summer", "Table", "Takecare", "Teacher", "Thankyou", "Time", "Today", "Tomorrow", "Urdu", "WalaikumSalaam", "Walk",
        "Want", "We", "Welcome", "What", "When", "Where", "Who", "Why", "Winter", "Write", "Wrong", "Yes", "Yesterday", "You"
    ];

    const images = imageNames.map((name) => {
        return {
            name: name,
            url: Images[name], // Access image dynamically using the name
        };
    });

    const filteredImages = images.filter(image => {
        return image.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    useEffect(() => {
        setShowAllImages(false); // Reset showAllImages on component unmount
    }, []);

    return (
        <div className="picture-grid">
            <button onClick={() => setShowAllImages(!showAllImages)}>
                Show All Images
            </button>
            {showAllImages ? (
                images.map((image, index) => (
                    <div key={index} className="image-container">
                        <img src={image.url} alt={image.name} />
                        <p>{image.name}</p>
                    </div>
                ))
            ) : (
                filteredImages.map((image, index) => (
                    <div key={index} className="image-container">
                        <img src={image.url} alt={image.name} />
                        <p>{image.name}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default PictureGrid;
