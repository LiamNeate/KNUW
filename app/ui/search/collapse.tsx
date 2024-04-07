import Accordion from './Accordion';
import { fetchCategories, fetchFilteredTopics, fetchFilteredTopicsByCat } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link'
import React from "react";
import {Card, CardBody} from "@nextui-org/react";

export default async function Collapse({ 
  query 
}: {
  query: string
}) {
  const categories = await fetchCategories();

  const relevantTopics = await fetchFilteredTopics(query);

  var accordionItems: { title: string; content: JSX.Element; }[] = []


  for (let item of categories){
    const relevantTopicsPerCat = await fetchFilteredTopicsByCat(query, item.id);
    let test = {
      title: item.category+" ("+relevantTopicsPerCat.length+"/"+relevantTopics.length+")",
      content: (
        <div className="grid grid-cols-10 grid-flow-row-dense gap-2 text-center">
          {relevantTopicsPerCat?.map((topic) =>
            <Card key={topic.id} className=" basis-full">
              <CardBody className="overflow-visible">
              <Link href={{
                pathname: '/dashboard/topics',
                query: { id: topic.id}
              }}
              passHref={true}
              >
                  <div className='text-center flex flex-wrap justify-center'>
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={topic.image? topic.image : '/no-image-icon.png'}
                      width={100}
                      height={100}
                    />
                    <h4><b>{topic.topic}</b></h4>
                  </div>
              </Link>
              </CardBody>
            </Card>
          /*
            <p
              key={topic.id}
            >
              <Link href={{
                pathname: '/dashboard/topics',
                query: { id: topic.id}
              }}
              passHref={true}
              >
                  <div>
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={topic.image? topic.image : '/no-image-icon.png'}
                    width={100}
                    height={100}
                  />
                  <h4><b>{topic.topic}</b></h4>
                  <p>{topic.info}</p>
                  </div>
              </Link>
            </p>
            */
          )}
        </div>
      )
    }
    accordionItems.push(test);
  }

  return (
    <div className='container' style={{"maxWidth": "100%"}}>
      <Accordion items={accordionItems} />
    </div>
  )
}