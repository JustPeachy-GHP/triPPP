
// dummy data in here

// const users = [
//   {
//     user_id: 1,
//     password: "password1",
//     email: "joe@example.com",
//     firstname: "Adventure",
//     lastname: "Joe",
//   },
//   {
//     user_id: 2,
//     password: "password2",
//     email: "ninja@example.com",
//     firstname: "Coding",
//     lastname: "Ninja",
//   },
//   {
//     user_id: 3,
//     password: "password3",
//     email: "samantha@example.com",
//     firstname: "Explorer",
//     lastname: "Samantha",
//   },
//   {
//     user_id: 4,
//     password: "password4",
//     email: "geek@example.com",
//     firstname: "Gamer",
//     lastname: "Geek",
//   },
//   {
//     user_id: 5,
//     password: "password5",
//     email: "music@example.com",
//     firstname: "Music",
//     lastname: "Maestro",
//   },
// ];


const users = [
  {
    user_id: 1,
    password: "$2b$10$cDkJKeMlzQmVX/9FcpPc3eI4AhSECDrk1KHF9zTtjEjiyNkG8XuVO",
    email: "joe@example.com",
    firstname: "Adventure",
    lastname: "Joe",
  },
  {
    user_id: 2,
    password: "$2b$10$TqHQbtfkjtSsr3Y4ABc6FulMcWC0kSe6578pELuOKXUtj0/pZhygm",
    email: "ninja@example.com",
    firstname: "Coding",
    lastname: "Ninja",
  },
  {
    user_id: 3,
    password: "$2b$10$dH4rC5eg8C2SZlgOGfoby./K9cQq3XIR5Az/tjpOfQE3msTM4nkO6",
    email: "samantha@example.com",
    firstname: "Explorer",
    lastname: "Samantha",
  },
  {
    user_id: 4,
    password: "$2b$10$kpmtufzti1u/LKWXUpi9ruU5TcC3ZE1kY/XKeCjkafojQb2hq36DW",
    email: "geek@example.com",
    firstname: "Gamer",
    lastname: "Geek",
  },
  {
    user_id: 5,
    password: "$2b$10$7NtA6sdf/fmcCOXXtvk5XuEb3myJ20bzO6U5wYd3FC6TQtG2Gu/mS",
    email: "music@example.com",
    firstname: "Music",
    lastname: "Maestro",
  },
];

const locations = [
  {
    location_id: 1,
    destination: "Barcelona, Spain",
    place_id: "ChIJ5TCOcRaYpBIRCmZHTz37sEQ",
    coord: ('41.385063,2.173404'),
    vibes: [ "shop", "party", "local"]
  },
  {
    location_id: 2,
    destination: "Asheville, North Carolina",
    place_id: "ChIJCW8PPKmMWYgRXTo0BsEx75Q",
    coord: ('35.595058,-82.551487'),
    vibes: ["outdoors", "chill"]

  },
  {
    location_id: 3,
    destination: "Las Vegas, Nevada",
    place_id: "ChIJ0X31pIK3voARo3mz1ebVzDo",
    coord: ('36.1699,-115.1398'),
    vibes: ["party", "shop"]

  },
  {
    location_id: 4,
    destination: "Chicago, Illinois",
    place_id: "ChIJ7cv00DwsDogRAMDACa2m4K8",
    coord: ('41.8781,-87.6298'),
    vibes: ["local", "shop"]
  },
  {
    location_id: 5,
    destination: "Denver, Colorado",
    place_id: "ChIJzxcfI6qAa4cR1jaKJ_j0jhE",
    coord: ('39.7392,-104.9903'),
    vibes: ["outdoors", "shop"]
  },
  {
    location_id: 6,
    destination: "Key West, Florida",
    place_id: "ChIJGZPxxsW20YgRVe3uNrw1q-k",
    coord: ('24.5551,-81.7800'),
    vibes: ["party", "chill"]
  },
  {
    location_id: 7,
    destination: "New York City, New York",
    place_id: "ChIJOwg_06VPwokRYv534QaPC8g",
    coord: ('40.7128,-74.0060'),
    vibes: ["shop", "local"]
  },
  {
    location_id: 8,
    destination: "Los Angeles, California",
    place_id: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    coord: ('34.0522,-118.2437'),
    vibes: ["party", "shop"]
  },
  {
    location_id: 9,
    destination: "Omni Grove Park Inn - Country Club",
    place_id: "ChIJLb17W8f0WYgRpWXPmOh22Fk",
    destination_place_id: "ChIJCW8PPKmMWYgRXTo0BsEx75Q",
    coord: ('35.619857,-82.542978')
  },
  {
    location_id: 10,
    destination: "Biltmore Forest Country Club",
    place_id: "ChIJdb2htJTyWYgRG4PVQhGknMY",
    destination_place_id: "ChIJCW8PPKmMWYgRXTo0BsEx75Q",
    coord: ('35.532191,-82.536819')
  },
  {
    location_id: 11,
    destination: "Lake Lure Adventure Company",
    place_id: "ChIJ_xr5xelYV4gRc1TL7kMyiV0",
    destination_place_id: "ChIJCW8PPKmMWYgRXTo0BsEx75Q",
    coord: ('35.423333,-82.186666')
  },
  {
    location_id: 12,
    destination: "Reems Creek Golf Club",
    place_id: "ChIJ3zMqbswfWogRUYZ0hyNgj58",
    destination_place_id: "ChIJCW8PPKmMWYgRXTo0BsEx75Q",
    coord: ('35.698753,-82.520927')
  },
  {
    location_id: 13,
    destination: "Asheville Adventure Company",
    place_id: "ChIJ9289NOaMWYgRzGcX7_SMje4",
    destination_place_id: "ChIJCW8PPKmMWYgRXTo0BsEx75Q",
    coord: ('35.566272,-82.586497')
  },
  {
    location_id: 14,
    destination: "Asheville Municipal Golf Course",
    place_id: "ChIJZ9il6JPzWYgR1cUrYlcprbw",
    destination_place_id: "ChIJCW8PPKmMWYgRXTo0BsEx75Q",
    coord: ('35.5783,-82.500883')
  },
  {
    location_id: 15,
    destination: "Eiffel Tower",
    place_id: "ChIJLU7jZClu5kcR4PcOOO6p3I0",
    destination_place_id: "ChIJ5TCOcRaYpBIRCmZHTz37sEQ",
    coord: ('48.858844,2.294351')
  },
  {
    location_id: 16,
    destination: "La Barceloneta Beach",
    place_id: "ChIJk1xgCQejpBIRUvCCQOH6ACY",
    destination_place_id: "ChIJ5TCOcRaYpBIRCmZHTz37sEQ",
    coord: ('41.3784,2.1925')
  },
  {
    location_id: 17,
    destination: "Montpellier Botanical Garden",
    place_id: "ChIJuaew9wavthIRVF6Rv-gqcSE",
    destination_place_id: "ChIJ5TCOcRaYpBIRCmZHTz37sEQ",
    coord: ('43.3643,3.5238')
  },
  {
    location_id: 18,
    destination: "Palais des Papes",
    place_id: "ChIJb_jbjobrtRIRy9KIwWXljHc",
    destination_place_id: "ChIJ5TCOcRaYpBIRCmZHTz37sEQ",
    coord: ('43.9509,4.8077')
  },
  {
    location_id: 19,
    destination: "Basilica of Notre Dame of Fourvière",
    place_id: "ChIJK1Jxdanr9EcRKY5nG3nMG50",
    destination_place_id: "ChIJ5TCOcRaYpBIRCmZHTz37sEQ",
    coord: ('45.7623,4.8226')
  },
  {
    location_id: 20,
    destination: "Louvre Museum",
    place_id: "ChIJD3uTd9hx5kcR1IQvGfr8dbk",
    destination_place_id: "ChIJ5TCOcRaYpBIRCmZHTz37sEQ",
    coord: ('48.8606,2.3376')
  },
  {
    location_id: 21,
    destination: "La Boqueria Market",
    place_id: "ChIJAVoetfeipBIR1a1z3FTGCoY",
    destination_place_id: "ChIJ5TCOcRaYpBIRCmZHTz37sEQ",
    coord: ('41.3819,2.1717')
  },
];

const trips = [
  {
    trip_id: 1,
    itinerary_id: 1,
    group_id: 1,
    location_id: 1,
    tripname: "European Adventure",
    numdays: 14,
    numtravelers: 2,
    isdecided: true,
    vibeform: "outdoors",
  },
  {
    trip_id: 2,
    itinerary_id: 2,
    group_id: 2,
    location_id: 2,
    tripname: "Party",
    numdays: 7,
    numtravelers: 4,
    isdecided: false,
    vibeform: "party",
  },
  {
    trip_id: 3,
    itinerary_id: 3,
    group_id: 3,
    location_id: 3,
    tripname: "Cultural Experience",
    numdays: 10,
    numtravelers: 3,
    isdecided: false,
    vibeform: "local",
  },
  {
    trip_id: 4,
    itinerary_id: 4,
    group_id: 4,
    location_id: 4,
    tripname: "City Exploration",
    numdays: 5,
    numtravelers: 2,
    isdecided: true,
    vibeform: "shop",
  },
  {
    trip_id: 5,
    itinerary_id: 5,
    group_id: 5,
    location_id: 5,
    tripname: "Mountain Retreat",
    numdays: 3,
    numtravelers: 2,
    isdecided: true,
    vibeform: "chill",
  },
];

const journals = [
  {
    journal_id: 1,
    user_id: 1,
    videocontent: "https://www.youtube.com/watch?v=video1",
    image:
      "https://www.reuters.com/resizer/-K5JWbCI58lWSmK0kXXS7ECII6Y=/1200x1500/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/AHF2FYISNJO55J6N35YJBZ2JYY.jpg",
    title: "Exploring Paris",
    entry:
      "Today was a day I will forever hold dear. As the morning sun gently kissed the streets of Paris, I ventured out into the enchanting city. The Eiffel Tower, standing tall and majestic, was my first stop. Seeing this iconic symbol of France up close was a dream come true. Its intricate lattice structure against the clear blue sky left me in awe. Afterward, I found a cozy café tucked away on a charming Parisian street. With a view of the Eiffel Tower in the distance, I savored a fresh croissant, warm from the oven. Its delicate layers melted in my mouth, a taste of pure Parisian delight. Today's experience was a perfect blend of history, culture, and culinary delight, making my time in Paris truly unforgettable.",
    timestamp: "2023-09-08 16:28:32-07",
    trip_id: 1,
  },
  {
    journal_id: 1,
    user_id: 1,
    videocontent: "https://www.youtube.com/watch?v=video1",
    image:
      "https://www.reuters.com/resizer/-K5JWbCI58lWSmK0kXXS7ECII6Y=/1200x1500/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/AHF2FYISNJO55J6N35YJBZ2JYY.jpg",
    title: "Exploring Paris",
    entry: "Today, I visited the Eiffel Tower and had a delicious croissant.",
    timestamp: "2023-09-08 16:28:32-07",
    trip_id: 1,
  },
  {
    journal_id: 1,
    user_id: 1,
    videocontent: "https://www.youtube.com/watch?v=video1",
    image:
      "https://www.reuters.com/resizer/-K5JWbCI58lWSmK0kXXS7ECII6Y=/1200x1500/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/AHF2FYISNJO55J6N35YJBZ2JYY.jpg",
    title: "Still Exploring Paris",
    entry: "Today, I tried escargo",
    timestamp: "2023-09-08 16:28:32-07",
    trip_id: 1,
  },
  {
    journal_id: 1,
    user_id: 1,
    videocontent: "https://www.youtube.com/watch?v=video1",
    image:
      "https://www.reuters.com/resizer/-K5JWbCI58lWSmK0kXXS7ECII6Y=/1200x1500/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/AHF2FYISNJO55J6N35YJBZ2JYY.jpg",
    title: "Still Really Exploring Paris",
    entry: "Today, I did many things.",
    timestamp: "2023-09-08 16:28:32-07",
    trip_id: 1,
  },
  {
    journal_id: 2,
    user_id: 1,
    video_content: "https://www.youtube.com/watch?v=zqT0j13dZx4",
    image:
      "https://a.cdn-hotels.com/gdcs/production50/d535/172cb39f-200a-4bed-8911-353860c517c2.jpg",
    title: "Beach Day",
    entry: "Spent the day relaxing on the beautiful beach in Bali.",
    timestamp: "2016-01-25 10:10:10.555555-05:00",
    trip_id: 2,
  },
  {
    journal_id: 3,
    user_id: 3,
    video_content: "https://www.youtube.com/watch?v=5DcA4BePBdA",
    image:
      "https://www.historyhit.com/app/uploads/fly-images/5149921/The-Colosseum-e1633702661138-750x537-c.jpg?x80808",
    title: "Cultural Immersion",
    entry: "Explored historic sites and tried local cuisine in Rome.",
    timestamp: "2023-09-08 16:28:32-07",
    trip_id: 3,
  },
  {
    journal_id: 4,
    user_id: 1,
    video_content: "https://www.youtube.com/watch?v=WLSnrXEtrT4",
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/f2/84/26.jpg",
    title: "City Lights",
    entry: "New York City's skyline is simply breathtaking at night.",
    timestamp: "2016-01-25 10:10:10.555555-05:00",
    trip_id: 4,
  },
  {
    journal_id: 5,
    user_id: 4,
    video_content: "https://www.youtube.com/watch?v=jvN5hZzhFHM",
    image:
      "https://nepaltrekroutes.com/wp-content/uploads/2020/09/everest-panorama-view.jpg",
    title: "Mountain Adventure",
    entry: "Hiked to the summit and enjoyed panoramic views in Nepal.",
    timestamp: "2023-09-08 16:28:32-07",
    trip_id: 5,
    location_id: 1,
  },
];

const groupmembs = [
  {
    groupmemb_id: 1,
    trip_id: 1,
    user_id: 1,
    group_id: 1,
  },
  {
    groupmemb_id: 2,
    trip_id: 1,
    user_id: 2,
    group_id: 1,
  },
  {
    groupmemb_id: 3,
    trip_id: 2,
    user_id: 3,
    group_id: 2,
  },
  {
    groupmemb_id: 4,
    trip_id: 2,
    user_id: 4,
    group_id: 2,
  },
  {
    groupmemb_id: 5,
    trip_id: 3,
    user_id: 1,
    group_id: 3,
  },
  {
    groupmemb_id: 6,
    trip_id: 3,
    user_id: 5,
    group_id: 3,
  },
];

const groups = [
  {
    group_id: 1,
    trip_id: 1,
    user_id: 1,
  },
  {
    group_id: 2,
    trip_id: 1,
    user_id: 2,
  },
  {
    group_id: 3,
    trip_id: 2,
    user_id: 3,
  },
  {
    group_id: 4,
    trip_id: 3,
    user_id: 4,
  },
];

const itineraryitems = [
  {
    itinerary_id: 1,
    // trip_id: 1,
    // location_id: 1,
    user_id: 1,
    rating: 1,
  },
  {
    itinerary_id: 2,
    // trip_id: 2,
    // location_id: 2,
    user_id: 2,
    rating: 2,
  },
  {
    itinerary_id: 3,
    // trip_id: 3,
    // location_id: 3,
    user_id: 3,
    rating: 3,
  },
  {
    itinerary_id: 4,
    // trip_id: 4,
    // location_id: 4,
    user_id: 4,
    rating: 3,
  },
  {
    itinerary_id: 5,
    // trip_id: 4,
    // location_id: 4,
    user_id: 4,
    rating: 3,
  },
];

module.exports = {
  users,
  trips,
  journals,
  locations,
  itineraryitems,
  groupmembs,
  groups,
};
