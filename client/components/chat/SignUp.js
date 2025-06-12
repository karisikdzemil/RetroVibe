import Link from "next/link";
import { useSelector } from "react-redux";

const SignUp = ({ user, socket, input, setInput }) => {
  const loggedUser = useSelector((state) => state.user);

  const addUser = () => {
    user.current = { name: loggedUser.user.username, id: socket.id };
    socket.emit("new_user", { user: input });
    setInput("");
  };

  return (
    <div className="w-full h-full p-10 flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center">
          Welcome to Chat
        </h1>

        <h2 className="text-lg sm:text-xl text-blue-300 text-center">
          This chat can be anonymous, type in the name you want.
        </h2>

        <input
          type="text"
          className="w-full text-lg sm:text-xl text-center rounded-xl p-3 text-white placeholder-blue-300 bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          placeholder="Your name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
        />

        {loggedUser.user ? (
          <button
            onClick={addUser}
            disabled={!input}
            className={`w-full text-white text-lg font-semibold py-3 rounded-xl transition ${
              input
                ? "bg-sky-500 hover:bg-sky-600"
                : "bg-slate-500 cursor-not-allowed"
            }`}
          >
            Join Chat
          </button>
        ) : (
          <Link
            href="/login"
            
          >
            <button className="w-full text-white text-lg font-semibold py-3 rounded-xl transition bg-sky-500 hover:bg-sky-600">Log In First</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SignUp;
