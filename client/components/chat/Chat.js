

const Chat = ( {chat, user} ) => {  
    return (
        <div className="h-full pb-12 md:p-4">
            <div className="w-full h-full max-h-screen rounded-md overflow-y-auto gradient pt-2 md:pt-6">
                {chat.map((message, index) => {
                    message = {...message, own: message.user === user}
                    return <Message key={index} {...message}/>
                })}
                {/* <Message content="Hello World" own={true}/> */}
            </div>

        </div>
    )
}

const Message = ({content, type, own}) => {
    console.log(type)
    return(
        <p className={`message px-6 py-1 flex ${own && 'justify-end'}`}>
            <span className={`text-3xl py-2 rounded-2xl ${type === "text" ? "px-6" : "px-2"} ${own ? "bg-sky-400 text-white" : "bg-slate-300"}`}>
                    {type === "text" ? content : <img src={content} className="rounded-md" alt="image"/>}
            </span>
        </p>
    )
}

export default Chat
