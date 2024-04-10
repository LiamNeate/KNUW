// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const teams = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    team: 'Client Delivery',
    boss: '3958dc9e-787f-4377-85e9-fec4b6a6442a'
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
    role: 'Software manager',
    admin: true,
    pre_name: 'Liam',
    about: 'Hi, I am Liam and I have worked at the company for 5 years as a software manager',
    hobbies: 'Outside of work, I enjoy swimming, going for walks with my dog, and cycling',
    want_learn: 'I really would like to learn AWS at some point in the future',
    top_knowledge: 'MonogDB, SQLite, Redis',
    phone:'07401749337',
    email_allow: true,
    teams:true,
    whatsapp: false,
    linkedin: null,
    website: null
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    fname: 'Olly',
    sname: 'Piper',
    email: 'olly@piper.com',
    password: 'olly1234',
    team: '410544b2-4001-4271-9855-fec4b6a6442a',
    role: 'Software developer',
    admin: false,
    pre_name: 'Olly',
    about: 'Hi, I am Olly and I have worked at the company for 5 years as a software developer',
    hobbies: 'Outside of work, I enjoy swimming, going for walks with my dog, and cycling',
    want_learn: 'I really would like to learn AWS at some point in the future',
    top_knowledge: 'MonogDB, SQLite, Redis',
    phone: null,
    email_allow: true,
    teams:true,
    whatsapp: false,
    linkedin: null,
    website: 'https://liamneate.github.io/'
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    fname: 'Bruce',
    sname: 'Wayne',
    email: 'bruce@wayne.com',
    password: 'bruce1234',
    team: '410544b2-4001-4271-9855-fec4b6a6442a',
    role: 'Software developer',
    admin: false,
    pre_name: 'Bruce',
    about: 'Hi, I am Bruce and I have worked at the company for 5 years as a software developer',
    hobbies: 'Outside of work, I enjoy swimming, going for walks with my dog, and cycling',
    want_learn: 'I really would like to learn AWS at some point in the future',
    top_knowledge: 'MonogDB, SQLite, Redis',
    phone: null,
    email_allow: true,
    teams:true,
    whatsapp: false,
    linkedin: 'https://www.linkedin.com/in/liamneate2002/',
    website: null
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    fname: 'Sofia',
    sname: 'Kuks',
    email: 'sofia@kuks.com',
    password: 'sofia1234',
    team: '410544b2-4001-4271-9855-fec4b6a6442a',
    role: 'Software developer',
    admin: false,
    pre_name: 'Sof',
    about: 'Hi, I am Sof and I have worked at the company for 5 years as a software developer',
    hobbies: 'Outside of work, I enjoy swimming, going for walks with my dog, and cycling',
    want_learn: 'I really would like to learn AWS at some point in the future',
    top_knowledge: 'MonogDB, SQLite, Redis',
    phone:null,
    email_allow: false,
    teams:true,
    whatsapp: false,
    linkedin: null,
    website: null
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
    likes: 2,
    dislikes: 1
  },
  {
    id: 'b57f8028-a5c5-4107-bd32-d5a7403a1679',
    comment: 'in terms of?',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    likes: 0,
    dislikes: 0
  },
  {
    id: 'c5d901a7-c673-41f5-9d2b-1251e706a53e',
    comment: 'Quite good, would reccomend',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    likes: 0,
    dislikes: 0
  },
  {
    id: 'b57f8028-a5c5-4107-bd32-d5a7403a1678',
    comment: 'No better alternative',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    user_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    likes: 0,
    dislikes: 0
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
    id: '87c4987f-511c-4bed-8ee4-089fe8bd1b37',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    reason: 'Really helped me out with making the right choice! A real expert',
  },
  {
    id: 'a4d7a487-833c-45ba-8a8d-34672df21177',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    reason: 'Very helpful and informative. Knows his stuff!',
  },
  {
    id: '2651bafb-1714-43ea-bff2-a5accb84b6d1',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    reason: 'Thanks again for all the help!',
  },
  {
    id: 'ff1d17c6-f559-4140-9e6b-2ee259950336',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    reason: 'Taught me all I know!',
  },
  {
    id: '88e06ead-3bc8-4cb5-901c-49c4ca7f14e2',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    reason: 'Class act!',
  },
  {
    id: '3127d393-11a4-4c83-ba06-8beaa4367408',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    reason: 'Thanks again for all the help!',
  },
  {
    id: '38e9eadc-acec-4e43-a19a-168273c92b9c',
    topic: '3958dc1b-798f-4377-85e9-fec4b6a6442a',
    giver: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    reciever: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    reason: 'Thanks again for all the help!',
  }
];

const likes = [
  {
    id: '5ad0c8f3-6856-4417-add5-0ad1b9922cfa',
    comment: 'c5d901a7-c673-41f5-9d2b-1251e706a53d',
    user: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    lefLike: true,
    liked: true
  },
  {
    id: '2af0ae17-11b0-4b92-a3c4-242dc990c3ec',
    comment: 'c5d901a7-c673-41f5-9d2b-1251e706a53d',
    user: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    lefLike: true,
    liked: true
  },
  {
    id: '016e5ff7-8adc-4f61-97ea-eee78ed2b4df',
    comment: 'c5d901a7-c673-41f5-9d2b-1251e706a53d',
    user: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    lefLike: true,
    liked: false
  }
];

module.exports = {
  teams,
  users,
  categories,
  topics,
  comments,
  scores,
  endorsements,
  likes
};
