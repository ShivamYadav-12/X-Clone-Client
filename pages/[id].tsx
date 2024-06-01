import FeedCard from "@/components/Feedcard";
import { useRouter } from "next/router";
import Twitterlayout from "@/components/Layout";
import { Tweet, User } from "@/gql/graphql";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";

interface ServerProps {
    userInfo? : User
}


const UserProfilePage : NextPage<ServerProps> = (props) =>{
   
    const router = useRouter()

    return(
        <div>
            <Twitterlayout>
                <div>
                    <nav className="flex items-center gap-3 py-3 px-3">
                    <BsArrowLeftShort className="text-4xl"/>
                    <div>
                        <h1 className="text-2xl font-bold">Shivam Yadav</h1>
                        <h1 className="text-md font-bold text-slate-500">{props.userInfo?.tweets?.length} Tweets</h1>
                    </div>
                    </nav>
                    <div>
                   <div className="p-4 border-b border-slate-800">
                   {props.userInfo?.profileImageUrl && <Image
                    src={props.userInfo?.profileImageUrl}
                    alt="user-image"
                    className="rounded-full"
                    width={100}
                    height={100}/>}
                    <h1 className="text-2xl font-bold mt-5">Shivam Yadav</h1>

                   </div>
                   <div>
                    {props.userInfo?.tweets?.map((tweet)=><FeedCard data={tweet as Tweet} key={tweet?.id}/>)}
                    </div>
                    </div>

                </div>
            </Twitterlayout>
        </div>

    )
};

export  const getServerSideProps : GetServerSideProps = async(context) => {
    const id = context.query.id as string|undefined
    if(!id) return {notFound :true , props: {userInfo : undefined}}
    const userInfo = await  graphqlClient.request(getUserByIdQuery,{id})
    if(!userInfo?.getUserById) return {notFound : true}
 return {
    props :{
        userInfo :userInfo.getUserById as User ,
    },
 }
}
export default UserProfilePage;