import Image from "next/image";
import React from "react";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-r-0 border-l-0  border-b-0 border-gray-600 p-5 hover:bg-slate-900 cursor-pointer transition-all">
      <div className="grid grid-cols-12 gap-3">
        <div className=" col-span-1">
          <Image
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user profile"
            width={50}
            height={50}
          />
        </div>
        <div className=" col-span-11">
          <h5>Shivam Yadav</h5>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            eveniet ab, cumque incidunt aliquid quibusdam{" "}
          </p>
          <div className="flex justify-between  mt-5 items-center text-xl p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <AiOutlineRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeedCard;
