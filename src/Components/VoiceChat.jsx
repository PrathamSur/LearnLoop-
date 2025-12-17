// src/components/VoiceChatWrapper.jsx
import React, { useState } from 'react';
import AgoraRTC, {
  AgoraRTCProvider,
  useJoin,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
  useRemoteAudioTracks,
} from 'agora-rtc-react';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

// 🚨 CRITICAL: This App ID must be from a project with "No Certificate" (App ID Only mode).
// If this ID is from your "Secure" project, this will NOT work.
const APP_ID = "e63f5acd864d47e6bc0d489e132e77ce"; 

export const VoiceChatWrapper = ({ userRole }) => {
  return (
    <AgoraRTCProvider client={client}>
      <VoiceControlPanel userRole={userRole} />
    </AgoraRTCProvider>
  );
};

const VoiceControlPanel = ({ userRole }) => {
  const [joined, setJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  
  const [inputCode, setInputCode] = useState(""); 
  const [activeChannel, setActiveChannel] = useState(null);

  const { localMicrophoneTrack, isLoading: isMicLoading } = useLocalMicrophoneTrack(micOn);

  // 🚨 FIX: Token is set to null so we can join ANY channel name
  useJoin(
    { 
      appid: APP_ID, 
      channel: activeChannel, 
      token: null 
    },
    joined && !!activeChannel
  );

  usePublish([localMicrophoneTrack]);

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  audioTracks.forEach((track) => track.play());

  const handleConnect = () => {
    if (!inputCode.trim()) {
      alert("Please enter a valid code!");
      return;
    }
    setActiveChannel(inputCode.trim().toUpperCase());
    setJoined(true);
  };

  const handleLeave = () => {
    setJoined(false);
    setActiveChannel(null);
    setInputCode("");
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white p-5 rounded-xl shadow-2xl border border-gray-200 z-50 w-72">
      {/* ... (The rest of your JSX UI stays exactly the same) ... */}
      
      {/* HEADER */}
      <div className="mb-4 border-b pb-2 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">
          {userRole === 'teacher' ? 'Teacher Voice' : 'Student Voice'}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full font-bold ${joined ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
          {joined ? "Connected" : "Disconnected"}
        </span>
      </div>

      {!joined ? (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">
            {userRole === 'teacher' 
              ? "Create a unique code for your students to join." 
              : "Enter the code provided by your teacher."}
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder={userRole === 'teacher' ? "Create Code (e.g. MATH1)" : "Enter Code (e.g. MATH1)"}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:border-blue-500 outline-none uppercase tracking-widest"
            />
          </div>
          <button
            onClick={handleConnect}
            disabled={isMicLoading}
            className={`w-full py-2 rounded-lg font-bold text-white transition shadow-md ${userRole === 'teacher' ? 'bg-black hover:bg-gray-800' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isMicLoading ? "Loading..." : (userRole === 'teacher' ? "Create Room" : "Join Room")}
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-100 mb-3 text-center">
             <p className="text-xs text-green-600 uppercase font-bold tracking-wider">Active Room</p>
             <p className="text-2xl font-black text-green-800 tracking-widest">{activeChannel}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${micOn ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-red-500 text-white hover:bg-red-600'}`}
            >
              {micOn ? 'Mute' : 'Unmuted'}
            </button>
            <button
              onClick={handleLeave}
              className="px-4 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-bold hover:bg-red-100"
            >
              Leave
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            {remoteUsers.length} other person(s) here
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceChatWrapper;