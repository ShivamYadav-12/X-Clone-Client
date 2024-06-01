import React, { useCallback, useMemo } from "react"
import { BiHash, BiHomeCircle, BiImageAlt, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyGoogleTokenQuery } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface TwitterlayoutProps {
    children : React.ReactNode

}

interface TwitterSideBarButton {
    title: string;
    icon: React.ReactNode;
    link:string;
  }
  
const Twitterlayout : React.FC<TwitterlayoutProps> = (props)=>{
  const {user} = useCurrentUser();
    const queryClient = useQueryClient(); 
  const sideBarMenuItems:TwitterSideBarButton[]= useMemo(
    ()=> [
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link:"/"
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link:"/"
      },
      {
        title: "Notifications",
        icon: <BsBell />,
        link:"/"
      },
      {
        title: " Messages",
        icon: <BsEnvelope />,
        link:"/"
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link:"/"
      },
      {
        title: "Twitter Blue",
        icon: <BiMoney />,
        link:"/"
      },
      {
        title: "Profile",
        icon: <BiUser />,
        link:`/${user?.id}`
      },
      {
        title: "More Options",
        icon: <SlOptions />,
        link:"/"
      },
    ]
  ,[user?.id])
    

    const handleLoginWithGoogle = useCallback(async(cred:CredentialResponse) => {
        const googleToken = cred.credential;
        if(!googleToken)  return toast.error(`google token not found`);
        const {verifyGoogleToken} = await graphqlClient.request(verifyGoogleTokenQuery ,{token: googleToken});
      
      toast.success("verified success")
    
      if(verifyGoogleToken)
        window.localStorage.setItem("__twitter_token",verifyGoogleToken)
      await queryClient.invalidateQueries(["curent-user"])
       },
        [queryClient]);

    return (<div>
              <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-1 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative  ">
            <div>
          <div className="text-2xl h-fit w-fit  hover:bg-gray-700 rounded-full p-4 cursor-pointer transition-all ">
            <FaSquareXTwitter />
          </div>
          <div className="mt-2 text-xl  pr-4">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li>
                  <Link href={item.link} className="flex justify-start items-center gap-4   hover:bg-gray-700 rounded-full 
              px-3 py-3  w-fit mt-2 cursor-pointer">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="hidden sm:inline">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg px-2 py-4 rounded-full w-full">
                Tweet
              </button>
              <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg px-2 py-4 rounded-full w-full">
              <FaSquareXTwitter />
              </button>
            </div>
            </div>
          </div>
         {user &&  <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
        { user && user.profileImageUrl && <Image className ="rounded-full" src ={user?.profileImageUrl} alt ="user" height={50} width={50}/>}
        <div>
        <h3 className="text-xl">{user.firstName} {user.lastName}</h3>
      
          </div>
        </div>}
        </div>
        <div className=" col-span-11 sm:col-span-6  border-r-[1px] border-l-[1px] border-gray-600 h-scren overflow-scroll  no-scrollbar">
        
         {props.children}
        </div>
       <div className="col-span-0 sm:col-span-3 p-5 ">
       { !user &&<div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-xl"> New to twitter ?</h1>
            <GoogleLogin  onSuccess={handleLoginWithGoogle} />
          
          </div>}
        </div>
      </div>


    </div>
    )
} 
export default Twitterlayout;