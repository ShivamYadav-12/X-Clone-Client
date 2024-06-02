import Image from "next/image";
import React, { useCallback, useState } from "react";
import FeedCard from "@/components/Feedcard";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import Twitterlayout from "@/components/Layout";
import { BiImageAlt } from "react-icons/bi";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery, getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import toast from "react-hot-toast";
import axios from "axios";

interface HomeProps{
  tweets : Tweet[]
}
export default function Home(props:HomeProps) {
  const {user} = useCurrentUser();
  const {tweets = props.tweets as Tweet[]}  =useGetAllTweets()
  const {mutateAsync} = useCreateTweet();
  const [content,setContent] = useState("");
  const [imageURL,setImageURL] = useState("");
  
  const handleInputChangeFile = useCallback((input: HTMLInputElement)=>{
    return  async(event:Event) =>{
      event.preventDefault();
      const file: File|undefined|null = input.files?.item(0)
      if(!file) return;
      const {getSignedURLForTweet} = await graphqlClient.request(getSignedURLForTweetQuery,{
        imageName : file.name,
        imageType : file.type
      })
      if(getSignedURLForTweet){
        toast.loading("Uploading...",{id:'2'})
        await axios.put(getSignedURLForTweet,file,{
          headers: {
            'Content-Type' : file.type
          }
        })
        toast.success("Upload completed",{id : '2'})
        const url = new URL(getSignedURLForTweet)
        const myFilePath = `${url.origin}${url.pathname}`
        setImageURL(myFilePath)
      }

    }

  },[])

  const handleSelectImg =useCallback(()=>{
    const input = document.createElement('input')
    input.setAttribute('type','file')
    input.setAttribute("accept","image/*")
    const handlerFn = handleInputChangeFile(input)
    input.addEventListener("change",handlerFn);
    input.click()
  },[handleInputChangeFile])

  const handleCreateTweet = useCallback(()=>{
    mutateAsync({
      content,
      imageURL,
    })
    setContent("");
    setImageURL("");

  },[content,imageURL,mutateAsync])
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
           {
            imageURL && <Image src={imageURL} alt="tweet-image" width={300} height={300}/>
           }
           <div className="mt-2 flex justify-between">
          <BiImageAlt  onClick={handleSelectImg} className="text-xl"/>
          <button onClick={handleCreateTweet} className="bg-[#1d9bf0] font-semibold text-sm px-4 py-2 rounded-full">
                Tweet
              </button>
        </div>
        </div>
        

        </div>
        </div>
        {tweets?.map((tweet) => tweet ? <FeedCard key={tweet?.id} data ={tweet as Tweet} />: null)}

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