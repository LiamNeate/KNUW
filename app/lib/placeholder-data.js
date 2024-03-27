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
    comment: 'Very good! Used it recently',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    likes: 12,
    dislikes: 1
  },
  {
    comment: 'in terms of?',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    likes: 1,
    dislikes: 5
  }
];

module.exports = {
  teams,
  users,
  categories,
  topics,
  comments,
};
