import AddModifierButton from "@/components/AddModifierButton";
import CodeEditor from "@/components/CodeEditor";
import DeployButton from "@/components/DeployButton";
import { useCodeContext } from "@/contexts/CodeContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Inter } from "next/font/google";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

// TODO: figure out how other code editors do this
// TODO: adding modifiers !== composing code logic, not sure if this is what we are trying to aim for
const plugins = [
  {
    displayName: "Add guard modifier",
    protocol: "Gnosis",
    id: 1,
    description:
      "Adds a guard modifier to all public methods, excluding the constructor",
    modifyCode: (code: string) => {
      return code
        .split("\n")
        .map((line) => {
          if (!line.includes("constructor") && line.includes("public")) {
            line += "\n";
            for (const char of line) {
              if (char === " ") {
                line += " ";
              } else {
                break;
              }
            }
            line += "    ";
            line += "_mustBeOwner();";
          }
          return line;
        })
        .join("\n");
    },
  },
];

const HomePage = () => {
  const { setCode } = useCodeContext();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-7xl w-full mx-auto">
      <h1 className={`text-5xl font-bold text-center ${inter.className} pb-4`}>
        Your wallet made with Account Abstraction.
      </h1>
      <div className="absolute right-[58%] top-[70%] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px] -z-50"></div>
      <ConnectButton />
      <div className="grid grid-cols-5 pt-12 z-0 gap-4 w-full">
        <div className="col-span-3">
          <ul className="pb-12">
            {plugins.map(({ id, displayName, modifyCode, protocol }) => (
              <li
                key={id}
                className="border-2 py-2 px-4 rounded border-slate-400 hover:bg-slate-900 active:opacity-80 transition-colors hover:cursor-pointer text-slate-300 hover:text-slate-200"
                onClick={() => {
                  setCode?.((prev) => modifyCode(prev));
                  toast("Activated " + displayName + " modifier");
                }}
              >
                <span className="font-bold">{protocol}</span> - {displayName}
              </li>
            ))}
          </ul>
          <AddModifierButton />
        </div>
        <div className="border-2 rounded border-slate-400 col-span-2">
          <CodeEditor />
        </div>
      </div>
      <DeployButton>Deploy</DeployButton>
    </main>
  );
};

export default HomePage;
