import { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import "../styles/videoChat.css";


const socket = io("http://localhost:5000");

const VideoChat = ()=>{
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [peerConnection, setPeerConnection] = useState(null);

    useEffect(() => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        setPeerConnection(pc);

        navigator.mediaDevices.getUserMedia({ video: true, audio:true })
            .then((stream)=>{
                if(localVideoRef.current){
                    localVideoRef.current.srcObject = stream;
                }
                stream.getTracks().forEach(track => pc.addTrack(track, stream))
            })
            .catch((error) => console.error("Error accessing Media devices", error));
        
        pc.ontrack = (event) =>{
            if(remoteVideoRef.current){
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        pc.onicecandidate = (event) => {
            if(event.candidate){
                socket.emit("ice-candidate", event.candidate);
            }
        };

        socket.on("offer", async(offer) => {
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socket.emit("answer", answer);
        });

        socket.on("answer", async(answer) => {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on("ice-candidate", async(candidate) => {
            try{
                await pc.addIceCandidate(new RTCIceCandidate(candidate));
            } catch(error){
                console.error("Error adding ICE candidate", error);
            }
        });

        return ()=>{
            pc.close();
        };
    }, []);

    const startCall = async()=>{
        if(peerConnection){
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            socket.emit("offer", offer);
        }
    };

    return(
        <div className="video-chat-container">
            <h2>Video Chat</h2>
            <div className="video-container">
                <video ref={localVideoRef} autoPlay playsInline muted className="video-box" />
                <video ref={remoteVideoRef} autoPlay playsInline className="video-box" />
            </div>
            <button className="call-button" onClick={startCall}>Start Call</button>
        </div>
    );
};

export default VideoChat;