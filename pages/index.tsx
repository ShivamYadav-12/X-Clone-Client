import Image from "next/image";
import React, { useCallback, useState } from "react";
import FeedCard from "@/components/Feedcard";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import Twitterlayout from "@/components/Layout";
import { BiImageAlt } from "react-icons/bi";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";

interface HomeProps{
  tweets : Tweet[]
}
export default function Home(props:HomeProps) {
  const {user} = useCurrentUser();
  const {mutate} = useCreateTweet();
  const [content,setContent] = useState("");

  const handleSelectImg =useCallback(()=>{
    const input = document.createElement('input')
    input.setAttribute('type','file')
    input.setAttribute("accept","image/*")
    input.click()
  },[])

  const handleCreateTweet = useCallback(()=>{
    mutate({
      content,
    })

  },[content,mutate])
  return (
    <div>
      <Twitterlayout>
      <div className="border border-r-0 border-l-0  border-b-0 border-gray-600 p-5 hover:bg-slate-900 cursor-pointer transition-all">
        <div className="grid grid-cols-12 gap-3">
       <div className=" col-span-1">
       {user?.profileImageUrl &&
          <Image
          className="rounded-full"
            src={user?.profileImageUrl}
            alt="user profile"
            width={50}
            height={50}
          />}
        </div>
        <div className=" col-span-11">
          <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
           className=" w-full text-xl 
          bg-transparent border-b
           border-slate-700 px-3" 
           rows={3} 
           placeholder="What's happening?">
           </textarea>
           <div className="mt-2 flex justify-between">
          <BiImageAlt  onClick={handleSelectImg} className="text-xl"/>
          <button onClick={handleCreateTweet} className="bg-[#1d9bf0] font-semibold text-sm px-4 py-2 rounded-full">
                Tweet
              </button>
        </div>
        </div>
        

        </div>
        </div>
        {props.tweets?.map((tweet) => tweet ? <FeedCard key={tweet?.id} data ={tweet as Tweet} />: null)}

      </Twitterlayout>
    </div>
  );
  
}
export const getServerSideProps : GetServerSideProps<HomeProps> = async (context)=>{
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return {
    props :{
 tweets : allTweets.getAllTweets as Tweet[],
    }
  }
}