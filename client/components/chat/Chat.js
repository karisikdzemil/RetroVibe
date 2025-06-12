// import { Message, ServerMessage, Typing } from "./Messages"
import Typing from "../messages/Typing";
import ServerMessage from "../messages/ServerMessage";
import Message from "../messages/Message";
import { useEffect, useRef } from "react"

const Chat = ({chat, user, typing}) => {

    const scroller = useRef(null);

    useEffect(() => {
        if(!scroller.current) return

        scroller.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }, [chat])

    return (
        <div className="h-full pb-12 md:p-4">
        <div className="w-full h-full max-h-screen rounded-2xl overflow-y-auto pt-4 md:pt-6 px-3 md:px-6 bg-[#1e223f]/80 backdrop-blur-md shadow-inner space-y-3 scroll-smooth custom-scrollbar">
        
          {chat.map((message, index) => {
            message = { ...message, own: message.user?.id === user.id };
            return message.type === "server" ? (
              <div key={index} className="text-center text-indigo-400 italic text-sm py-2">
                <ServerMessage {...message} />
              </div>
            ) : (
              <Message key={index} {...message} />
            );
          })}
    
          {typing[0] && <Typing user={typing[0]} />}
      
          <div ref={scroller} className="pb-6" />
        </div>
      </div>
      
    )
}

export default Chat