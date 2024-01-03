import Image from "next/image";
import Link from "next/link";
import Event from "@/components/event";

export default function Home() {
  const detailsButtonStyle = {
    backgroundColor: "rgb(92,156,176)",
  };
  return (
    <>
      <div className="flex flex-row items-center justify-center p-4 ">
        <div className="flex-1"></div>

        <Link href="/datumi">
          <div className="text-medium font-semibold text-center text-black mr-4">DOGAĐAJI</div>
        </Link>

        <Link href="/datumi">
          <div className="text-medium font-semibold text-center text-black mr-4">DATUMI</div>
        </Link>

        <div className="flex-1"></div>

        {/* Profile Button */}
        <Link href="/profile">
          <Image
            src="/profile_icon.png"
            alt="Profile Icon"
            width={30}
            height={30}
          />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Event />
      </div>
      <div className="flex flex-col items-center justify-center"> 
        {/*show more button*/}
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-8 rounded m-4 rounded-lg" style={detailsButtonStyle}>
          VIŠE
        </button>
      </div>
    </>
  );
}
