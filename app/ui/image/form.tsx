import { fetchTopics } from '@/app/lib/data';

export default async function TopicMenu(){
  const topics = await fetchTopics("");

  return(
    <select 
          id="topics"
          name="topics" 
          required
        >
          {topics?.map((topic) =>
            <option value={topic.id}>
              {topic.topic}
            </option>
          )}  
        </select> 
  )
}