import Accordion from './Accordion';
import { fetchCategories, fetchFilteredTopics } from '@/app/lib/data';

export default async function Collapse({ 
  query 
}: {
  query: string
}) {
  const categories = await fetchCategories();

  const relevantTopics = await fetchFilteredTopics(query);

  var accordionItems = []

  categories?.map(async (category) => 
    {
      let test = {
        title: category.category,
        content: (
          <div>
            {relevantTopics?.map((topic) =>
              <p
                key={topic.id}
              >
                {topic.topic}
              </p>
            )}
          </div>
        )
      }
      accordionItems.push(test);
    });

  return (
    <div className='container' style={{"max-width": "100%"}}>
      <Accordion items={accordionItems} />
    </div>
  )
}