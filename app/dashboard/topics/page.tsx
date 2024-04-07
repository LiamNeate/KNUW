import { fetchTopic} from '@/app/lib/data';
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

import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

export default async function Page({
  searchParams,
} : {
  searchParams: {id: string}
}) {

  const topicInfo = await fetchTopic(searchParams.id);
  const blocked = topicInfo[0].blocked ? "Yes" : "No";

  return(
    <div className="flex flex-row justify-between">
      <Card className="py-4 basis-[15%]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center">
        <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://eesarv0hsj9j2qg5.public.blob.vercel-storage.com/postgresql-HoxEfbR6Vtl15v4kdy7I27HDNJ2qu3.png"
            width={100}
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
      <div className="flex flex-row justify-between flex-wrap basis-[82.5%]">
      <Card className="py-4 basis-full mb-10">
        <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center">
        <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://eesarv0hsj9j2qg5.public.blob.vercel-storage.com/postgresql-HoxEfbR6Vtl15v4kdy7I27HDNJ2qu3.png"
            width={140}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardBody>
      </Card>
      <Card className="py-4 basis-[79%]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center">
        <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://eesarv0hsj9j2qg5.public.blob.vercel-storage.com/postgresql-HoxEfbR6Vtl15v4kdy7I27HDNJ2qu3.png"
            width={140}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardBody>
      </Card>
      <Card className="py-4 basis-[18%]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://eesarv0hsj9j2qg5.public.blob.vercel-storage.com/postgresql-HoxEfbR6Vtl15v4kdy7I27HDNJ2qu3.png"
            width={140}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardBody>
      </Card>
      </div>
    </div>
  );
}