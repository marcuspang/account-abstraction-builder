export default function DeployButton({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="bg-slate-800 px-4 py-2 rounded-full hover:outline-1 hover:ring-2 hover:ring-slate-100 ">
      <button
        className="relative py-2 px-4 rounded-lg font-bold  text-3xl text-white transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none "
        onClick={onClick}
        style={{
          background:
            "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
          backgroundSize: "400% 400%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        onMouseEnter={(e) =>
          e.currentTarget.classList.add("animate-gradient-x")
        }
        onMouseLeave={(e) =>
          e.currentTarget.classList.remove("animate-gradient-x")
        }
      >
        {children}
      </button>
    </div>
  );
}
