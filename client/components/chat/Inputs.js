import { send, upload } from "../../assets";
import Image from "next/image";
import { useRef, useState } from "react";

const Inputs = ( { user, socket, setChat } ) => {
    
    const [input, setInput] = useState("");

    const uploadInput = useRef(null);

    const sendMessage = () => {
        if(input){
         const msg = {content: input, type: "text", user}
        socket.emit("send_message", msg);
        setChat(prev => [...prev, msg]);
        setInput("");
        socket.emit("user_typing", {user: user.name, typing: false})
        }else{
            uploadInput.current.click();
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if(file.type ==="image/jpeg" || file.type === "image/png"){
            const img = URL.createObjectURL(file);
            const msg = {content: img, type: "image", user}
            setChat((prev) => [...prev, msg]);
            socket.emit("send_message", msg);
        }

    }

    const userTyping = (e) => {
        setInput(e.target.value);
        socket.emit("user_typing", {user: user.name, typing: e.target.value ? true : false})
    }

  return (
    <div className="w-full absolute bottom-0 left-0 px-4 py-3 bg-[#1e223f]/90 backdrop-blur-md border-t border-indigo-400 md:relative md:rounded-xl md:mt-6 flex items-center gap-3">
  
    <input
      className="flex-grow rounded-full py-3 px-5 text-white placeholder-slate-300 bg-[#2b2f53] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      type="text"
      placeholder="Type your message..."
      value={input}
      onChange={(e) => userTyping(e)}
      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
    />
  
    <input
      type="file"
      className="hidden"
      ref={uploadInput}
      onChange={(e) => handleImageUpload(e)}
    />
  
    <button
      onClick={sendMessage}
      className="bg-indigo-500 hover:bg-indigo-600 transition-all p-3 rounded-full flex items-center justify-center"
    >
      <Image
        src={input ? send : upload}
        alt="send"
        className="w-6 h-6 md:w-8 md:h-8"
        width={24}
        height={24}
      />
    </button>
  </div>
  
  );
};

export default Inputs;
