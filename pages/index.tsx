import Image from "next/image";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import React, { useCallback } from "react";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import FeedCard from "@/components/Feedcard";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

import { verifyGoogleTokenQuery } from "@/graphql/query/user";
import { graphqlClient } from "@/clients/api";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";

interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
}
const sideBarMenuItems: TwitterSideBarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: " Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More Options",
    icon: <SlOptions />,
  },
];
export default function Home() {
  const {user} = useCurrentUser()
  const queryClient = useQueryClient()
  console.log(user)
 const handleLoginWithGoogle = useCallback(async(cred:CredentialResponse) => {
  const googleToken = cred.credential;
  if(!googleToken)  return toast.error(`google token not found`);
  const {verifyGoogleToken} = await graphqlClient.request(verifyGoogleTokenQuery ,{token: googleToken});

toast.success("verified success")
console.log(verifyGoogleToken);
if(verifyGoogleToken)
  window.localStorage.setItem("__twitter_token",verifyGoogleToken)
await queryClient.invalidateQueries(['curent-user'])
 },
  [queryClient]);
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-4 pt-1 ml-28 relative  ">
          <div className="text-2xl h-fit w-fit  hover:bg-gray-700 rounded-full p-4 cursor-pointer transition-all ">
            <FaSquareXTwitter />
          </div>
          <div className="mt-2 text-xl  pr-4">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4   hover:bg-gray-700 rounded-full 
              px-3 py-3  w-fit mt-2 cursor-pointer"
                >
                  <span className="text-3xl">{item.icon}</span>{" "}
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="bg-[#1d9bf0] font-semibold text-lg px-2 py-4 rounded-full w-full">
                Tweet
              </button>
            </div>
          </div>
         {user &&  <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
        { user && user.prifileImageUrl && <Image className ="rounded-full" src ={user?.prifileImageUrl} alt ="user" height={50} width={50}/>}
        <div>
        <h3 className="text-xl">{user.firstName} {user.lastName}</h3>
      
          </div>
        </div>}
        </div>
        <div className="col-span-5  border-r-[1px] border-l-[1px] border-gray-600 h-scren overflow-scroll  no-scrollbar">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
       <div className="col-span-3 p-5 ">
       { !user &&<div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-xl"> New to twitter ?</h1>
            <GoogleLogin  onSuccess={handleLoginWithGoogle} />
          
          </div>}
        </div>
      </div>
    </div>
  );
}