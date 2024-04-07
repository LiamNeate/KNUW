// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const teams = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    team: 'Client Delivery',
  },
];

const users = [
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    fname: 'Liam',
    sname: 'Neate',
    email: 'liam.neate@outlook.com',
    password: 'liam1234',
    team: '410544b2-4001-4271-9855-fec4b6a6442a',
    boss: '00000000-0000-0000-0000-000000000000',
    admin: true,
    pre_name: 'Liam'
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    fname: 'Olly',
    sname: 'Piper',
    email: 'olly@piper.com',
    password: 'olly1234',
    team: '410544b2-4001-4271-9855-fec4b6a6442a',
    boss: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    admin: false,
    pre_name: 'Olly'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    fname: 'Bruce',
    sname: 'Wayne',
    email: 'bruce@wayne.com',
    password: 'bruce1234',
    team: '410544b2-4001-4271-9855-fec4b6a6442a',
    boss: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    admin: false,
    pre_name: 'Bruce'
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    fname: 'Sofia',
    sname: 'Kuks',
    email: 'sofia@kuks.com',
    password: 'sofia1234',
    team: '410544b2-4001-4271-9855-fec4b6a6442a',
    boss: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    admin: false,
    pre_name: 'Sofia'
  }
];

const categories = [
  { 
    id: '3958dc9e-798f-4377-85e9-fec4b6a6442a',
    category: 'Databases' 
  },{ 
    id: '3958dc9e-798f-4377-85e9-fec4b6a6442b',
    category: 'Languages' 
  },{ 
    id: '3958dc9e-798f-4377-85e9-fec4b6a6442c',
    category: 'Methods' 
  }
]

const topics = [
  {
    id: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    topic: 'PostgreSQL',
    category: '3958dc9e-798f-4377-85e9-fec4b6a6442a',
    info: 'Info about PostgreSQL',
    website: 'www.website.com',
    documentation: 'www.website.com/docs',
    notes: 'Use it!',
    image: '',
    blocked: false
  },{
    id: '3958dc1b-798f-4377-85e9-fec4b6a6442b',
    topic: 'Python',
    category: '3958dc9e-798f-4377-85e9-fec4b6a6442b',
    info: 'Info about Python',
    website: 'www.website.com',
    documentation: 'www.website.com/docs',
    notes: 'Use it!',
    image: '',
    blocked: false
  },{
    id: '3958dc1b-798f-4377-85e9-fec4b6a6442c',
    topic: 'SCRUM',
    category: '3958dc9e-798f-4377-85e9-fec4b6a6442c',
    info: 'Info about SCRUM',
    website: 'www.website.com',
    documentation: 'www.website.com/docs',
    notes: 'Use it!',
    image: '',
    blocked: false
  }
];

const comments = [
  {
    id: 'c5d901a7-c673-41f5-9d2b-1251e706a53d',
    comment: 'Very good! Used it recently',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    likes: 12,
    dislikes: 1
  },
  {
    id: 'b57f8028-a5c5-4107-bd32-d5a7403a1679',
    comment: 'in terms of?',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    likes: 1,
    dislikes: 5
  },
  {
    id: 'c5d901a7-c673-41f5-9d2b-1251e706a53e',
    comment: 'Quite good, would reccomend',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    likes: 6,
    dislikes: 0
  },
  {
    id: 'b57f8028-a5c5-4107-bd32-d5a7403a1678',
    comment: 'No better alternative',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    likes: 9,
    dislikes: 1
  }
];

const scores = [
  {
    id: '98d05691-9355-4311-a644-227eca680ef7',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    rating: 4,
    recom: 0,
    endorsements: 3
  },
  {
    id: 'd292e064-c9ec-4e5e-8ad3-b50b382fbb43',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    rating: 5,
    recom: 0,
    endorsements: 0
  },
  {
    id: '98d05691-9355-4311-a644-227eca680ef8',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    rating: 5,
    recom: 0,
    endorsements: 3
  },
  {
    id: 'd292e064-c9ec-4e5e-8ad3-b50b382fbb44',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    rating: 5,
    recom: 0,
    endorsements: 1
  }
];

const endorsements = [
  {
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    reason: 'Really helped me out with making the right choice! A real expert',
  },
  {
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    reason: 'Very helpful and informative. Knows his stuff!',
  },
  {
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    reason: 'Thanks again for all the help!',
  },
  {
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    reason: 'Taught me all I know!',
  },
  {
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    reason: 'Class act!',
  },
  {
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    reason: 'Thanks again for all the help!',
  },
  {
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    reason: 'Thanks again for all the help!',
  }
];

module.exports = {
  teams,
  users,
  categories,
  topics,
  comments,
  scores,
  endorsements
};
