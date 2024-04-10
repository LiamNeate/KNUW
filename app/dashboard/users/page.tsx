import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { fetchAllTopics, fetchUserInfo, fetchBossName, fetchEndorsementsByCat, fetchCategories, fetchEndorsementAmmout, fetchAllUserComments, fetchUserId } from '@/app/lib/data';
import { auth } from '../../../auth';
import { updateRating, addDislike, removeDislike, addLike, removeLike } from '@/app/lib/actions';

import Accordion from '@/app/ui/search/Accordion';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';


import { Button, FormControl, InputLabel, Rating, Select, MenuItem, TextField } from "@mui/material";
import Link from "next/link";

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

    const user = await auth()

    const email = user?.user?.email!;
    const userId = await fetchUserId(email);

    const allTopics = await fetchAllTopics();
    const userInfo = await fetchUserInfo(searchParams.id);
    const bossName = await fetchBossName(userInfo[0].boss);
    const cats = await fetchCategories();
    const endorsAmm = await fetchEndorsementAmmout(searchParams.id);
    const comments = await fetchAllUserComments(searchParams.id);

    console.log(allTopics);

    const topicImage = '/default.png'

    var accordionItems: { title: string; content: JSX.Element; }[] = []

    const phoneNum = "tel:"+userInfo[0].phone;
    const emailAdd = "mailto:"+userInfo[0].email;
    const whatsappNum = "https://wa.me/"+userInfo[0].phone;
    const teamsChat = "https://teams.microsoft.com/l/chat/0/0?users="+userInfo[0].email;


  for (let item of cats){
    const relevantTopicsPerCat = await fetchEndorsementsByCat(item.id, searchParams.id);
    let test = {
      title: item.category+" ("+relevantTopicsPerCat.length+"/"+endorsAmm[0].total+")",
      content: (
        <div className="text-center">
            <div className="flex grid grid-cols-5 basis-full gap-2 font-semibold">
                <p>Topic</p>
                <p>User</p>
                <p className='col-span-3'>Reason</p>
            </div>
            {relevantTopicsPerCat?.map((topic) =>
                <div key={topic.id} className="flex grid grid-cols-5 basis-full">
                    <p>{topic.topic}</p>
                    <p>{topic.fname} {topic.sname}</p>
                    <p className='col-span-3'>{topic.reason}</p>
                </div>
            )}
        </div>
      )
    }
    accordionItems.push(test);
  }

    return(
        <div className="flex flex-row justify-between flex-wrap">
            <div className="basis-[77.5%] flex flex-row flex-wrap">
                <Card className="mb-10 flex flex-row basis-full">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={topicImage}
                    width={250}
                    height={250}
                    />
                    <CardBody>
                        <Card className="basis-full">
                            <CardHeader className="pb-0">
                                <h1 className="text-6xl font-semibold text-center basis-full">{userInfo[0].fname} {userInfo[0].sname}</h1>
                            </CardHeader>
                            <CardBody className="pt-0 flex flex-row flex-wrap">
                                <p className="text-center pt-1 basis-full">"{userInfo[0].pre_name}"</p>
                                <div className="flex justify-center pt-1 basis-full space-x-5">
                                    <p>{userInfo[0].role}</p>
                                    <p>|</p>
                                    <p>{userInfo[0].team_name}</p>
                                    <p>|</p>
                                    <p>{bossName[0].fname} {bossName[0].sname}</p>
                                </div>
                                <div className="flex justify-center pt-1 basis-full space-x-16">
                                    {userInfo[0].phone == null?
                                        <PhoneIcon className="text-3xl opacity-30"/>
                                        :
                                        <a href={phoneNum} target="_blank">
                                            <PhoneIcon className="text-3xl"/>
                                        </a>
                                    }
                                    {userInfo[0].email_allow?
                                        <a href={emailAdd} target="_blank">
                                            <EmailIcon className="text-3xl"/>
                                        </a>
                                        :
                                        <EmailIcon className="text-3xl opacity-30"/>
                                    }
                                    {userInfo[0].teams?
                                        <a href={teamsChat} target="_blank">
                                            <PeopleIcon className="text-3xl"/>
                                        </a>
                                            :
                                            <PeopleIcon className="text-3xl opacity-30"/>
                                    }
                                    {userInfo[0].whatsapp?
                                        <a href={whatsappNum} target="_blank">
                                            <WhatsAppIcon className="text-3xl"/>
                                        </a>
                                        :
                                        <WhatsAppIcon className="text-3xl opacity-30"/>
                                    }
                                    {userInfo[0].linkedin == null?
                                        <LinkedInIcon className="text-3xl opacity-30"/>
                                        :
                                        <a href={userInfo[0].linkedin} target="_blank">
                                            <LinkedInIcon className="text-3xl"/>
                                        </a>
                                    }
                                    {userInfo[0].website == null?
                                        <LanguageIcon className="text-3xl opacity-30"/>
                                        :
                                        <a href={userInfo[0].website} target="_blank">
                                            <LanguageIcon className="text-3xl"/>
                                        </a>
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
                <div className="flex justify-between basis-full flex-wrap ">
                    <Card className="flex flex-col basis-full mb-10">
                        <CardHeader className='text-xl font-bold'>
                            <h1>About me</h1>
                        </CardHeader>
                        <CardBody className='pt-0 overflow-visible'>
                            <Card className="basis-full">
                                <CardBody className="p-5 flex flex-wrap">
                                    <p className='px-2'>{userInfo[0].about}</p>
                                    <h2 className="font-bold pt-4">Hobbies</h2>
                                    <p className='px-2'>{userInfo[0].hobbies}</p>
                                    <h2 className="font-bold pt-4">Wanting to learn</h2>
                                    <p className='px-2'>{userInfo[0].want_learn}</p>
                                    <h2 className="font-bold pt-4">Top 3 knowledge bases</h2>
                                    <p className='px-2'>{userInfo[0].top_knowledge}</p>
                                </CardBody>
                            </Card>
                        </CardBody>
                    </Card>
                    <Card className="flex flex-col basis-full">
                        <CardHeader className='text-xl font-bold'>
                            <h1>Endorsments</h1>
                        </CardHeader>
                        <CardBody className='pt-0 overflow-visible'>
                            <Card className="basis-full">
                                <CardHeader className="pb-0 pt-5 flex flex-wrap">
                                    <p className="text-center basis-full">Total</p>
                                    <h1 className="text-9xl font-bold text-center basis-full">{endorsAmm[0].total}</h1>
                                </CardHeader>
                                <CardBody className="pt-0 flex flex-row flex-wrap">
                                <div className='container' style={{"maxWidth": "100%"}}>
                                    <Accordion items={accordionItems} />
                                </div>
                                </CardBody>
                            </Card>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="basis-[20%]">
                <Card className="mb-10 flex flex-col">
                    <CardHeader className='text-xl font-bold'>
                        <h1>Availability (GMT +0)</h1>
                    </CardHeader>
                    <CardBody className="overflow-visible pb-3 pt-0">
                        <Card className="basis-full">
                            <CardBody>
                                <div className="overflow-visible flex flex-row justify-between px-6 pb-0 pt-1">
                                    <p className="font-semibold">Monday</p>
                                    <p>09:00-17:00</p>
                                </div>
                                <div className="overflow-visible flex flex-row justify-between px-6 pb-0 pt-3">
                                    <p className="font-semibold">Tuesday</p>
                                    <p>09:00-17:00</p>
                                </div>
                                <div className="overflow-visible flex flex-row justify-between px-6 pb-0 pt-3">
                                    <p className="font-semibold">Wednesday</p>
                                    <p>09:00-17:00</p>
                                </div>
                                <div className="overflow-visible flex flex-row justify-between px-6 pb-0 pt-3">
                                    <p className="font-semibold">Thursday</p>
                                    <p>09:00-17:00</p>
                                </div>
                                <div className="overflow-visible flex flex-row justify-between px-6 pb-0 pt-3">
                                    <p className="font-semibold">Friday</p>
                                    <p>09:00-17:00</p>
                                </div>
                                <div className="overflow-visible flex flex-row justify-between px-6 pb-0 pt-3">
                                    <p className="font-semibold">Saturday</p>
                                    <p>Unavailable</p>
                                </div>
                                <div className="overflow-visible flex flex-row justify-between px-6 pb-0 pt-3">
                                    <p className="font-semibold">Sunday</p>
                                    <p>Unavailable</p>
                                </div>
                                <div className="overflow-visible flex flex-row justify-around px-6 pb-0 pt-5">
                                    <p className="font-bold">Currently: </p>
                                    <p className="font-bold text-green-700">Available</p>
                                </div>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
                <Card className="flex flex-col flex-wrap mb-10">
                    <CardHeader className='text-xl font-bold'>
                        <h1>Give endorsement</h1>
                    </CardHeader>
                    <CardBody className="overflow-visible pb-3 pt-0">
                        <Card className="basis-full">
                            <CardBody>
                                    {userId[0].id == searchParams.id?
                                    <div>
                                    <FormControl fullWidth>
                                            <InputLabel id ='category-select'>Topic</InputLabel>
                                            <Select 
                                                name="catSel"
                                                label='Topic'
                                                id='catSel'
                                                variant="outlined" 
                                                required
                                                disabled
                                            >
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            multiline 
                                            fullWidth 
                                            disabled
                                            rows={3} 
                                            id="outlined-basic" 
                                            label="Reason" 
                                            variant="outlined" 
                                            name = 'reason'
                                            inputProps={{ maxLength: 250 }}
                                            className="mt-5"
                                            required
                                        />
                                        <div className="flex justify-center">
                                            <Button 
                                                variant="outlined"
                                                className="mt-4"
                                                disabled
                                            >
                                                Update
                                            </Button>
                                        </div>
                                        </div>
                                    :
                                        <form>
                                        <FormControl fullWidth>
                                            <InputLabel id ='category-select'>Topic</InputLabel>
                                            <Select 
                                                name="catSel"
                                                labelId='category-select'
                                                id='catSel'
                                                required
                                            >
                                                {allTopics.map((topic) => 
                                                    <MenuItem key={topic.id} value={topic.category}>{topic.category}: {topic.topic}</MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            multiline 
                                            fullWidth 
                                            rows={3} 
                                            id="outlined-basic" 
                                            label="Reason" 
                                            variant="outlined" 
                                            name = 'reason'
                                            inputProps={{ maxLength: 250 }}
                                            className="mt-5"
                                            required
                                        />
                                        <div className="flex justify-center">
                                            <Button 
                                                variant="outlined"
                                                type="submit"
                                                className="mt-4"
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                    }
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
                <Card >
                    <CardHeader className='text-xl font-bold pb-1'>
                        <h1>Engagement rank</h1>
                    </CardHeader>
                    <CardBody className="overflow-visible pb-3 pt-0">
                        <Card className=" basis-full py-4">
                            <CardBody className="overflow-visible p-8 flex flex-wrap flex-col justify-center">
                                <h1 className='text-9xl font-bold text-center'>#1</h1>
                                <p className='text-center text-sm'>Out of 4 users</p>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
            </div>
            <div className="basis-full mt-10">
            <Card id="allUserComments">
          <CardHeader className='text-xl font-bold pb-1'>
            <h1>All user comments</h1>
          </CardHeader>
          <CardBody className="overflow-visible pb-3 pt-0">
            <Card className=" basis-full">
              <CardBody className="overflow-visible">
                <div className="grid grid-cols-6 grid-flow-row-dense gap-2 text-center">
                    <div>Category</div>
                    <div>Topic</div>
                  <div>Rating</div>
                  <div>Recommends?</div>
                  <div className="col-span-2">Comment</div>
                </div>
                  {comments?.map((comment) =>
                  <div key={comment.id} className="my-2 grid grid-cols-6 grid-flow-row-dense gap-2 text-center">
                    <div>
                        {comment.category}
                    </div>
                    <div>
                        {comment.topic}
                    </div>
                    <div>
                      <Rating name="read-only" value={comment.rating} readOnly />
                    </div>
                    <div>{renderSwitch(comment.recom)}</div>
                    <div className="col-span-2 text-start"><q>{comment.comment}</q></div>
                    <form >
                      <div className='hidden'>
                          <TextField 
                            id="likeId" 
                            name = 'likeId'
                            defaultValue={comment.likeid}
                          />
                        </div>
                        <div className='hidden'>
                          <TextField 
                            id="commentId" 
                            name = 'commentId'
                            defaultValue={comment.commentid}
                          />
                        </div>
                        <div className='hidden'>
                          <TextField 
                            id = "userId" 
                            name = 'userId'
                            defaultValue={searchParams.id}
                          />
                        </div>
                        <div className='hidden'>
                          <TextField 
                            id = "likeAmm" 
                            name = 'likeAmm'
                            defaultValue={comment.likes}
                          />
                        </div>
                        <div className='hidden'>
                          <TextField 
                            id = "dislikeAmm" 
                            name = 'dislikeAmm'
                            defaultValue={comment.dislikes}
                          />
                        </div>
                        <div className='hidden'>
                          <TextField 
                            id = "wasReacted" 
                            name = 'wasReacted'
                            defaultValue={comment.left_like}
                          />
                        </div>
                    </form>
                  </div>
                  )}
              </CardBody>
            </Card>
          </CardBody>
        </Card>
            </div>
        </div>
    );

}