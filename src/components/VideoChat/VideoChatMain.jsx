import React from 'react'
import { useState, useRef } from 'react';
import { collection, Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   // your config
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }



const firestore = Firestore;

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};

// Global State
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

//HTML elements



const VideoChatMain = () => {



    const [callDisabled, setCallDisabled] = useState(true);

    const webVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const webCamButtonRef = useRef(null);
    const callCamButtonRef = useRef(null);
    const answerButtonRef = useRef(null);
    const hangUpButtonRef = useRef(null);
    const callInputRef = useRef(null);

    const db = getFirestore();


    // 1. Setup media sources

    const webCamButtonOnclick = async () => {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        remoteStream = new MediaStream();

        // Push tracks from local stream to peer connection
        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        // Pull tracks from remote stream, add to video stream
        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };

        webVideoRef.current.srcObject = localStream;
        remoteVideoRef.current.srcObject = remoteStream;

        //callCamButtonRef.current.disabled = false;
        setCallDisabled(false);
        answerButtonRef.current.disabled = false;
        webCamButtonRef.current.disabled = true;
    };

    // 2. Create an offer
    const callBtnOnclick = async () => {
        console.log("Call BTN Clicked!", collection(db, "calls"));
        // Reference Firestore collections for signaling
        //const callDoc = firestore.collection('calls').doc();

        // const offerCandidates = callDoc.offerCandidates;
        // const answerCandidates = callDoc.answerCandidates;

        // callInputRef.current.value = callDoc.id;

        // // Get candidates for caller, save to db
        // pc.onicecandidate = (event) => {
        //     event.candidate && offerCandidates.add(event.candidate.toJSON());
        // };

        // // Create offer
        // const offerDescription = await pc.createOffer();
        // await pc.setLocalDescription(offerDescription);

        // const offer = {
        //     sdp: offerDescription.sdp,
        //     type: offerDescription.type,
        // };

        // await callDoc.set({ offer });

        // // Listen for remote answer
        // callDoc.onSnapshot((snapshot) => {
        //     const data = snapshot.data();
        //     if (!pc.currentRemoteDescription && data?.answer) {
        //         const answerDescription = new RTCSessionDescription(data.answer);
        //         pc.setRemoteDescription(answerDescription);
        //     }
        // });

        // // When answered, add candidate to peer connection
        // answerCandidates.onSnapshot((snapshot) => {
        //     snapshot.docChanges().forEach((change) => {
        //         if (change.type === 'added') {
        //             const candidate = new RTCIceCandidate(change.doc.data());
        //             pc.addIceCandidate(candidate);
        //         }
        //     });
        // });

        // hangUpButtonRef.current.disabled = false;
    };

    // 3. Answer the call with the unique ID
    const answerButtonClick = async () => {
        const callId = callInputRef.current?.value;
        //const callDoc = firestore.collection('calls').doc(callId);
        const callDoc = collection(firestore, "calls", callId);

        const answerCandidates = callDoc.collection('answerCandidates');
        const offerCandidates = callDoc.collection('offerCandidates');

        pc.onicecandidate = (event) => {
            event.candidate && answerCandidates.add(event.candidate.toJSON());
        };

        const callData = (await callDoc.get()).data();

        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await callDoc.update({ answer });

        offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                console.log(change);
                if (change.type === 'added') {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });
    };

    return (
        <div>
            <h2>1. Start your Webcam</h2>
            <div className="videos">
                <span>
                    <h3>Local Stream</h3>
                    <video ref={webVideoRef} id="webcamVideo" autoPlay playsInline></video>
                </span>
                <span>
                    <h3>Remote Stream</h3>
                    <video ref={remoteVideoRef} id="remoteVideo" autoPlay playsInline></video>
                </span>


            </div>

            <button ref={webCamButtonRef} onClick={() => webCamButtonOnclick()} id="webcamButton">Start webcam</button>
            <h2>2. Create a new Call</h2>
            <button ref={callCamButtonRef} onClick={() => callBtnOnclick()} id="callButton" disabled={callDisabled}>Create Call (offer)</button>

            <h2>3. Join a Call</h2>
            <p>Answer the call from a different browser window or device</p>

            <input ref={callInputRef} id="callInput" />
            <button onClick={() => answerButtonClick()} ref={answerButtonRef} id="answerButton" disabled>Answer</button>

            <h2>4. Hangup</h2>

            <button ref={hangUpButtonRef} id="hangupButton" disabled>Hangup</button>
        </div>
    )
}

export default VideoChatMain;