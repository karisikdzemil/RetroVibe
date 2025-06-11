const Message = ({content, type, own, user}) => {
    return (
        <p className={`message px-3 md:px-6 py-2 flex items-end ${own ? "justify-end" : "justify-start"}`}>
        {!own && (
          <span className="logo text-lg md:text-xl font-bold bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
      
        <span
          className={`
            max-w-[80%] md:max-w-[60%]
            text-base md:text-lg leading-relaxed
            py-3 px-5 md:px-6
            rounded-3xl shadow-md
            break-words
            ${type === "text" ? "" : "p-1"}
            ${own ? "bg-indigo-500 text-white" : "bg-slate-200 text-gray-800"}
          `}
        >
          {type === "text" ? (
            content
          ) : (
            <img src={content} alt="uploaded" className="rounded-xl max-w-full max-h-64 object-cover" />
          )}
        </span>
      </p>
      
    )
}

export default Message