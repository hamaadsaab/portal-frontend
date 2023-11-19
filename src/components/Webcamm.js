import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./Webcamm.css";
import PictureGrid from "./PictureDisplay";
import * as Images from "../Images"; // Import all images as a single object


function Webcamm() {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [capturing, setCapturing] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    const showNextObject = () => {
        // Increment the index to display the next object
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };
    const imageNames = [
        "Afternoon",
        "Again",
        "Alright",
        "Ask",
        "AssalamOAlaikum",
        "Attendance",
        "Bad",
        "Beautiful",
        "Best",
        "Big",
        "Bird",
        "Birthday",
        "BoyOrMan",
        "Bye",
        "Chair",
        "Cheap",
        "Child",
        "Clean",
        "Cold",
        "Come",
        "Congratulations",
        "Deaf",
        "Difficult",
        "Do",
        "Eat",
        "Evening",
        "Facebook",
        "Faith",
        "Fall",
        "Fight",
        "Food",
        "GirlOrWoman",
        "Go",
        "Good",
        "Hang",
        "Happy",
        "Hello",
        "HeSheIt",
        "Home",
        "Hot",
        "How",
        "I",
        "Internet",
        "Know",
        "Later",
        "Laugh",
        "Leave",
        "Listen",
        "Love",
        "Market",
        "Maybe",
        "Me",
        "Meet",
        "Money",
        "More",
        "Morning",
        "Mosque",
        "Name",
        "Need",
        "Night",
        "Not",
        "Old",
        "Pakistan",
        "Pull",
        "Push",
        "Quiet",
        "Read",
        "Rich",
        "Right",
        "Sad",
        "See",
        "Shift",
        "Siblings",
        "Sick",
        "Sing",
        "Sit",
        "Sleep",
        "Small",
        "Smile",
        "Soon",
        "Sorry",
        "Speak",
        "Stand",
        "Straight",
        "Study",
        "Summer",
        "Table",
        "Takecare",
        "Teacher",
        "Thankyou",
        "Time",
        "Today",
        "Tomorrow",
        "Urdu",
        "WalaikumSalaam",
        "Walk",
        "Want",
        "We",
        "Welcome",
        "What",
        "When",
        "Where",
        "Who",
        "Why",
        "Winter",
        "Write",
        "Wrong",
        "Yes",
        "Yesterday",
        "You",
    ];

    const images = imageNames.map((name) => {
        return {
            name: name,
            url: Images[name], // Access image dynamically using the name
        };
    });
    console.log(images);

    const toggleCamera = async () => {
        try {
            if (isCameraOn) {
                const tracks = webcamRef.current.video.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
                webcamRef.current.video.srcObject = null;

                // Turn off flashlight (if supported)
                const videoTracks = tracks.filter((track) => track.kind === "video");
                if (videoTracks.length > 0) {
                    const capabilities = videoTracks[0].getCapabilities();
                    if (capabilities.torch && capabilities.torch === true) {
                        videoTracks[0].applyConstraints({ advanced: [{ torch: false }] });
                    }
                }
            } else {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                webcamRef.current.video.srcObject = stream;
            }

            setIsCameraOn((prev) => !prev);
        } catch (error) {
            console.error("Error accessing the camera:", error);
        }
    };



    const startCapture = () => {
        if (isCameraOn) {
            setCapturing(true);
            showNextObject();
        }
    };

    const stopCapture = () => {

        setCapturing(false);
        const imageSrc = webcamRef.current.getScreenshot();
        const imageBlob = dataURItoBlob(imageSrc);

        setCapturedImage(imageBlob);

        saveFrame(imageBlob);
    };

    const saveFrame = (imageData) => {
        console.log("save frmae method")
        const formData = new FormData();
        formData.append("image", imageData);

        const url = process.env.REACT_APP_BACKEND_URL + '/saveFrame';
        console.log("this is my url")
        console.log(url)

        axios
            .post(url, formData)
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error("Error saving frame:", error);

            });
    };

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    }

    return (
        <>

            <div className="webcam-container border-box-size">
                <div class="container">
                    <div class="column">
                        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
                        <h2 className="button-text">
                            Let's Communicate to the Art of Signing!
                        </h2>
                        <div className="button-container">
                            <button onClick={toggleCamera}>
                                {isCameraOn ? "Turn off Camera" : "Turn on Camera"}
                            </button>
                        </div>
                    </div>

                    <div class="column">
                        {/* <div key={currentIndex} className="image-container"> */}
                        <img
                            className="img"
                            src={images[currentIndex].url}
                            alt={images[currentIndex].name}
                        />
                        <p>{images[currentIndex].name}</p>
                        {/* </div> */}
                    </div>
                </div>
            </div >
            <div>
                {
                    isCameraOn && !capturing && (
                        <button onClick={startCapture}>Start Capture</button>
                    )
                }
                {
                    isCameraOn && capturing && (
                        <button onClick={stopCapture}>Stop Capture</button>
                    )
                }

            </div>
        </>
    );
}

export default Webcamm;
