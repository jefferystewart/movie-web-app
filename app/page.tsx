import Image from "next/image";
import { LoginScreen } from "./components/LoginScreen";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#093545]">
        <LoginScreen />
        <img
          src="/images/Vectors.svg"
          className={`hidden lg:flex absolute bottom-0 w-full `}
        />
        <img
          src="/images/Vectors_mbl.svg"
          className={`flex lg:hidden absolute bottom-0 w-full `}
        />
      </div>
    </>
  );
}
