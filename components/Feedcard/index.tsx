import { Tweet } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";



interface FeedCardProps {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const {data} = props
  return (
    <div className="border border-r-0 border-l-0  border-b-0 border-gray-600 p-5 hover:bg-slate-900 cursor-pointer transition-all">
      <div className="grid grid-cols-12 gap-3">
        <div className=" col-span-1">
         { data.author?.profileImageUrl && <Image
            src={data.author.profileImageUrl}
            alt="user profile"
            width={50}
            height={50}
            className="rounded-full"
          /> }
        </div>
        <div className=" col-span-11">
          <Link href={`/${data.author?.id}`}>{data.author?.firstName} {data.author?.lastName}</Link>
          <p>
            {data.content}
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
