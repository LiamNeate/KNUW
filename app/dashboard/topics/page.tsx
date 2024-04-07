"use server"

import { fetchTopic, fetchComments, fetchEndorsementsPerTopic, fetchUserComment } from '@/app/lib/data';
import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { auth } from '../../../auth';
import { updateRating } from '@/app/lib/actions';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import { Button, FormControl, MenuItem, NativeSelect, TextField } from '@mui/material';

import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Toast from 'react-bootstrap/Toast';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useSession } from 'next-auth/react';

/*
import { lusitana } from '@/app/ui/fonts';
import { fetchTopic} from '@/app/lib/data';
import Link from 'next/link'

export default async function Page({
  searchParams,
} : {
  searchParams: {id: string}
}) {
  const topicInfo = await fetchTopic(searchParams.id);

  return (
    <div>
      {topicInfo?.map((topic) =>
      <div>
          <div>
          <Link href={{
                pathname: '/dashboard/image',
                query: { id: topic.id}
              }}
              >
                <img src={topic.image} alt="Avatar"/>
              </Link>
            <h4><b>{topic.topic}</b></h4>
            <p>{topic.info}</p>
          </div>
            </div>
          )}
    </div>
  );
}
*/

function renderSwitch(param: number){
  switch(param){
    case 0:
      return <DoneIcon />;
    case 1:
      return <CloseIcon />;
    default:
      return <HorizontalRuleIcon />;
  }
}

export default async function Page({
  searchParams,
} : {
  searchParams: {id: string}
}) {

  const { data: session } = useSession();

  const email = session?.user?.email?.toString()!;
  const userId = session?.user?.id?.toString()!;

  try{
    const topicInfo = await fetchTopic(searchParams.id);
    const blocked = topicInfo[0].blocked ? "Yes" : "No";
    const topicImage = topicInfo[0].image ? topicInfo[0].image : '/no-image-icon.png'

    const comments = await fetchComments(searchParams.id);

    const endorsements = await fetchEndorsementsPerTopic(searchParams.id)

    const userComment = await fetchUserComment(searchParams.id, email);

    console.log(userComment[0]);

    let userRating = 0;
    let userRec = 2;
    let userCom = ""

    if(userComment[0]){
      userRating = userComment[0].rating;
      userRec = userComment[0].recom;
      userCom = userComment[0].comment;
    }
  

    return(
      <div className="flex flex-row justify-between flex-wrap">
        <Card className="py-4 basis-[20%]">
          <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center">
          <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={topicImage}
              width={100}
              height={100}
            />
          </CardHeader>
          <CardBody className="overflow-visible py-2 h-full">
            <h3 className="font-bold text-xl text-center mb-2">{topicInfo[0].topic}</h3>
            <Card className="py-4 h-full">
              <CardBody className="overflow-visible h-full flex flex-col justify-between">
                <p className="text-center">{topicInfo[0].info}</p>
                <p><b>Website: </b>{topicInfo[0].website}</p>
                <p><b>Documentation: </b>{topicInfo[0].documentation}</p>
                <p><b>Notes: </b>{topicInfo[0].notes}</p>
                <p><b>Blocked: </b>{blocked}</p>
                <p className="text-sm text-end	"><u>Suggest a change</u></p>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
        <div className="flex flex-row justify-between flex-wrap basis-[77.5%]">
        <Card className="basis-full mb-10">
          <CardHeader className='text-xl font-bold pb-1'>
            <h1>Top user comments</h1>
          </CardHeader>
          <CardBody className="overflow-visible pb-3 pt-0">
            <Card className=" basis-full">
              <CardBody className="overflow-visible">
                <div className="grid grid-cols-6 grid-flow-row-dense gap-2 text-center">
                  <div>User</div>
                  <div>Rating</div>
                  <div>Recommends?</div>
                  <div className="col-span-2">Comment</div>
                  <div>Likes/Dislikes</div>
                </div>
                  {comments?.slice(0, 3).map((comment) =>
                  <div key={comment.id} className="my-2 grid grid-cols-6 grid-flow-row-dense gap-2 text-center">
                    <div>{comment.fname} {comment.sname}</div>
                    <div>
                      <Rating name="read-only" value={comment.rating} readOnly />
                    </div>
                    <div>{renderSwitch(comment.recom)}</div>
                    <div className="col-span-2 text-start"><q>{comment.comment}</q></div>
                    <div className="flex">
                      <p className='w-1/2'>👍{comment.likes}</p>
                      <p className='w-1/2'>👎{comment.dislikes}</p>
                    </div>
                  </div>
                  )}
                  <Link className='text-end text-sm' href="#allUserComments"><u>View all</u></Link>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
        <Card className="basis-[79%]">
          <CardHeader className='text-xl font-bold pb-1'>
            <h1>Top endorsed users</h1>
          </CardHeader>
          <CardBody className="overflow-visible pb-3 pt-0">
            <Card className=" basis-full">
            <CardBody className="overflow-visible">
                <div className="grid grid-cols-4 grid-flow-row-dense gap-2 text-center">
                  <div>User</div>
                  <div>Rating</div>
                  <div>Recommends?</div>
                  <div>Endorsements</div>
                </div>
                  {endorsements?.slice(0, 3).map((endorsement) =>
                  <div key={endorsement.id} className="my-2 grid grid-cols-4 grid-flow-row-dense gap-2 text-center">
                    <div>{endorsement.fname} {endorsement.sname}</div>
                    <div>
                      <Rating name="read-only" value={endorsement.rating} readOnly />
                    </div>
                    <div>{renderSwitch(endorsement.recom)}</div>
                    <div >{endorsement.endorsements}</div>
                  </div>
                  )}
                  <Link className='text-end text-sm' href="#allUserEndorsements"><u>View all</u></Link>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
        <Card className="basis-[18%]">
          <CardHeader className='text-xl font-bold pb-1'>
            <h1>Current popularity*</h1>
          </CardHeader>
          <CardBody className="overflow-visible pb-3 pt-0">
            <Card className=" basis-full py-4">
              <CardBody className="overflow-visible p-0 flex flex-wrap flex-col justify-center">
                <h1 className='text-9xl font-bold text-center'>#1</h1>
                <p className='text-center text-sm'>Out of 36 databases</p>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
        </div>
        <Card className="my-10 basis-full">
          <CardHeader className='text-xl font-bold pb-1'>
            <h1>Add/Update your score</h1>
          </CardHeader>
          <CardBody className="overflow-visible pb-3 pt-0">
            <Card className=" basis-full py-4">
              <CardBody className="overflow-visible p-0 flex flex-wrap flex-col justify-center">
                <form action={updateRating}>
                  <div className="grid grid-cols-10 grid-flow-row-dense gap-2 text-center">
                    <div className='col-span-2 flex items-center flex-wrap justify-around'>
                      <FormControl className='h-full flex items-center flex-wrap justify-around' sx={{ minWidth: 120 }} size="small">
                        <label htmlFor="rating">
                          Rating:
                        </label>
                        <Rating 
                          name="rating" 
                          defaultValue={userRating} 
                        />
                      </FormControl>
                    </div>
                    <div className='h-full col-span-2 flex items-center flex-wrap justify-around'>
                      <FormControl className='h-full flex items-center flex-wrap justify-around' sx={{ minWidth: 120 }} size="small">
                        <label htmlFor="reccs">
                          Recommend?
                        </label>
                        <Select
                          name = 'reccs'
                          defaultValue={userRec}
                          label=""
                        >
                          <MenuItem value={0}><DoneIcon /></MenuItem>
                          <MenuItem value={1}><CloseIcon /></MenuItem>
                          <MenuItem value={2}><HorizontalRuleIcon /></MenuItem>
                        </Select>
                      </FormControl>
                    </div> 
                    <div className='flex items-center justify-center'>
                      <label htmlFor="reccs">
                          Comment:
                      </label>
                    </div>
                    <div className='col-span-4 pr-6'>
                      <TextField 
                        multiline 
                        fullWidth 
                        rows={3} 
                        id="outlined-basic" 
                        label="" 
                        variant="outlined" 
                        name = 'comment'
                        defaultValue={userCom}
                        inputProps={{ maxLength: 250 }}
                      />
                    </div>
                    <div className='invisible'>
                      <TextField 
                        id="userId" 
                        name = 'userId'
                        defaultValue={userId}
                      />
                    </div>
                    <div className='invisible'>
                      <TextField 
                        id="topicId" 
                        name = 'topicId'
                        defaultValue={searchParams.id}
                      />
                    </div>
                    <div className='pr-6 text-right absolute bottom-0 right-0'>
                      <Button 
                        variant="outlined"
                        type="submit"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </form>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
        <Card id="allUserComments" className="basis-full mb-10">
          <CardHeader className='text-xl font-bold pb-1'>
            <h1>All user comments</h1>
          </CardHeader>
          <CardBody className="overflow-visible pb-3 pt-0">
            <Card className=" basis-full">
              <CardBody className="overflow-visible">
                <div className="grid grid-cols-6 grid-flow-row-dense gap-2 text-center">
                  <div>User</div>
                  <div>Rating</div>
                  <div>Recommends?</div>
                  <div className="col-span-2">Comment</div>
                  <div>Likes/Dislikes</div>
                </div>
                  {comments?.map((comment) =>
                  <div key={comment.id} className="my-2 grid grid-cols-6 grid-flow-row-dense gap-2 text-center">
                    <div>{comment.fname} {comment.sname}</div>
                    <div>
                      <Rating name="read-only" value={comment.rating} readOnly />
                    </div>
                    <div>{renderSwitch(comment.recom)}</div>
                    <div className="col-span-2 text-start"><q>{comment.comment}</q></div>
                    <div className="flex">
                      <p className='w-1/2'>👍{comment.likes}</p>
                      <p className='w-1/2'>👎{comment.dislikes}</p>
                    </div>
                  </div>
                  )}
              </CardBody>
            </Card>
          </CardBody>
        </Card>
        <Card id="allUserEndorsements" className="basis-full">
          <CardHeader className='text-xl font-bold pb-1'>
            <h1>All users endorsements</h1>
          </CardHeader>
          <CardBody className="overflow-visible pb-3 pt-0">
            <Card className=" basis-full">
            <CardBody className="overflow-visible">
                <div className="grid grid-cols-4 grid-flow-row-dense gap-2 text-center">
                  <div>User</div>
                  <div>Rating</div>
                  <div>Recommends?</div>
                  <div>Endorsements</div>
                </div>
                  {endorsements?.map((endorsement) =>
                  <div key={endorsement.id} className="my-2 grid grid-cols-4 grid-flow-row-dense gap-2 text-center">
                    <div>{endorsement.fname} {endorsement.sname}</div>
                    <div>
                      <Rating name="read-only" value={endorsement.rating} readOnly />
                    </div>
                    <div>{renderSwitch(endorsement.recom)}</div>
                    <div >{endorsement.endorsements}</div>
                  </div>
                  )}
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    );
  } catch (error){
    notFound();
  }
}