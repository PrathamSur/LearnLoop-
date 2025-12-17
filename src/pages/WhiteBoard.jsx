import {
  Excalidraw,
  MainMenu,
  LiveCollaborationTrigger,
} from "@excalidraw/excalidraw";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// Make sure this path matches your file structure exactly
import VoiceChatWrapper from '../Components/VoiceChat.jsx'; 

// 👇 CSS Import
import "@excalidraw/excalidraw/index.css";

const WhiteBoard = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const navigate = useNavigate();

  // 🚨 FIX: Get the userRole from storage (Default to 'student' if missing)
  const userRole = localStorage.getItem("userType") || "student";

  return (
    <div className="h-screen w-screen relative"> {/* Added 'relative' for positioning voice chat */}
      <Excalidraw
        ref={(api) => setExcalidrawAPI(api)}
        renderTopRightUI={() => (
          <LiveCollaborationTrigger
            isCollaborating={isCollaborating}
            onSelect={() => {
              window.alert("You clicked on collab button");
              setIsCollaborating(true);
            }}
          />
        )}
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.Export />
          {/* Note: LiveCollaborationTrigger is usually in top right, but can be here too */}
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.ItemCustom>
            <button
              style={{ height: "100%", width: "100%", textAlign: "left", paddingLeft: "12px" }}
              onClick={() => navigate("/teacher/dashboard")}
            >
              Back to Dashboard
            </button>
          </MainMenu.ItemCustom>
        </MainMenu>
      </Excalidraw>
      
      {/* 🎤 Voice Chat Overlay */}
      {/* Now 'userRole' is defined, so this will work */}
      <VoiceChatWrapper userRole={userRole} />
    </div>
  );
};

export default WhiteBoard;