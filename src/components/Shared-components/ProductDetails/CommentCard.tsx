import { CommentModeltype } from '@/types/models/comment.type';
import { AnswerAdminType } from '@/types/models/ticket.type';
import Image from 'next/image';
import { FaRegStar, FaStar } from 'react-icons/fa';
import styles from "./productDetails.module.css"
type AdminCommentType ={
  answerData:AnswerAdminType,
  replyFor :string
}
const CommentCard = ({ commentData }: { commentData: CommentModeltype }) => {
    return (
      <>
        <div className="flex-col   mt-4 flex items-center w-full sm:px-3 sm:py-4 border-b-2 last:border-b-0">
          <div className="py-6 flex items-start w-full  gap-x-4">
            {/* user profile */}
            <div className="w-[80px] h-[80px] pl-2  rounded-full">
              <Image
                src={"/images/user-sample.png"}
                className=" object-cover rounded-full "
                width={800}
                priority={false}
                height={800}
                quality={60}
                alt="user"
              />
            </div>
  
            <div className="flex flex-col w-full justify-center">
              <div className="flex justify-between w-full gap-y-1 sm:gap-y-0 flex-wrap">
                <div className="flex items-start h-full flex-wrap gap-y-1 gap-x-2">
                  <span className="font-Shabnam_M text-base text-dark_shade">
                    {commentData.userName}
                  </span>
                  <span>-</span>
                  <span className="text-mute font-Shabnam_M tracking-tighter">
                    {new Date(commentData.date).toLocaleDateString("fa-Ir")}
                  </span>
                </div>
                {/* rate us from user */}
                <div className="text-base flex ">
                  {new Array(commentData?.score).fill(0).map((item, index) => {
                    return <FaStar className="text-goldColor" key={index} />;
                  })}
                  {new Array(5 - commentData?.score)
                    .fill(0)
                    .map((item, index) => {
                      return <FaRegStar key={index} />;
                    })}
                </div>
              </div>
              {/* comment message */}
              <div className="w-full child:text-mute child:font-Shabnam_M max-w-[95%] mt-2">
                <p className="text-wrap text-sm sm:text-base">
                  {commentData.commentBody}
                </p>
              </div>
            </div>
          </div>
          {commentData?.messages.map((message)=>{
  

              return (
                
              <AdminCommentCard key={message._id} answerData={message} replyFor={commentData.userName}/> )
        
          })}
        </div>
      </>
    );
  };
function AdminCommentCard({answerData,replyFor}:AdminCommentType) {
  return (
    <>
    <div className=" w-[95%] mt-2 rounded-xl bg-gray-100 flex items-center  sm:px-3 px-2 py-1 space-y-3 last:mb-3  border-b-2 last:border-b-0">
      <div className="py-2 flex items-start w-full  gap-x-4">
        {/* user profile */}
        <div className="w-[80px] h-[80px] pl-2  rounded-full">
          <Image
            src={"/images/user-sample.png"}
            className=" object-cover rounded-full "
            width={800}
            priority={false}
            height={800}
            quality={60}
            alt="user"
          />
        </div>

        <div className="flex flex-col w-full justify-between">
          <div className="flex justify-between relative w-full gap-y-1 sm:gap-y-0 flex-wrap">
            <div className="flex flex-col">
          <div className="flex items-start h-full flex-wrap gap-y-1 gap-x-2">
          <span className="font-Shabnam_M sm:text-base text-sm text-white px-2 py-[1px] rounded-lg bg-main_brown ">
                {answerData.sender.userName}
              </span>
              <span>-</span>
              <span className="text-mute font-Shabnam_M tracking-tighter">
                {new Date(answerData.sendAt).toLocaleDateString("fa-Ir")}
              </span>
          </div>
          <p className="mt-1 text-mute max-w-[150px] "> در پاسخ به {replyFor}</p>
            </div>

                <p className={`font-Shabnam  sm:text-sm 
                   text-white px-2 py-1 absolute left-0  rounded-lg
                    bg-main_brown ${styles.admin_badge} `}>
                    {answerData?.sender?.role === "ADMIN" ? "ادمین" : "کاربر"}
                </p>
          </div>
          {/* comment message */}
          <div className="w-full child:text-mute  max-w-[95%] mt-2">
            <p className="text-wrap text-sm sm:text-base font-Shabnam_B">
              {answerData.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default CommentCard