import Accordion from './Accordion';
import { fetchCategories, fetchFilteredTopics, fetchFilteredTopicsByCat } from '@/app/lib/data';
import Link from 'next/link'

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
        <div>
          {relevantTopicsPerCat?.map((topic) =>
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
                  <img src={topic.image} alt="Icon"/>
                    <h4><b>{topic.topic}</b></h4>
                    <p>{topic.info}</p>
                    </div>
              </Link>
            </p>
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