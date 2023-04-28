export default function FancyButton({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="bg-slate-800 px-3 py-2 rounded-md hover:outline-1 hover:ring-2 hover:ring-slate-300 transition-all group cursor-pointer">
      <button
        className="relative py-2 px-3 rounded-lg font-bold  text-3xl text-white transition duration-300 ease-in-out transform group-focus:outline-none group-hover:animate-gradient-x"
        onClick={onClick}
        style={{
          background:
            "linear-gradient(90deg, #ff5151, orange, yellow, green, #6e6eeb, #9033d4, violet)",
          backgroundSize: "400% 400%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {children}
      </button>
    </div>
  );
}
