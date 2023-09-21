// dummy data in here

const users = [
  {
    user_id: 1,
    password: "password1",
    email: "joe@example.com",
    firstname: "Adventure",
    lastname: "Joe",
  },
  {
    user_id: 2,
    password: "password2",
    email: "ninja@example.com",
    firstname: "Coding",
    lastname: "Ninja",
  },
  {
    user_id: 3,
    password: "password3",
    email: "samantha@example.com",
    firstname: "Explorer",
    lastname: "Samantha",
  },
  {
    user_id: 4,
    password: "password4",
    email: "geek@example.com",
    firstname: "Gamer",
    lastname: "Geek",
  },
  {
    user_id: 5,
    password: "password5",
    email: "music@example.com",
    firstname: "Music",
    lastname: "Maestro",
  },
];

const locations = [
  {
    location_id: 1,
    destination: "Paris, France",
    place_id: "ChIJgUbEo8cfqokR5lP9_Wh_DaM",
    coord: ('41.387397,32.168568'),
  },
  {
    location_id: 2,
    destination: "New York City, USA",
    place_id: "ChIJgUbEo8cfqokR5lP9_Wh_DaM",
    coord: ('41.387397,2.168568'),
  },
  {
    location_id: 3,
    destination: "Tokyo, Japan",
    place_id: "ChIJgUbEo8cfqokR5lP9_Wh_DaM",
    coord: ('41.387397,2.168568'),
  },
  {
    location_id: 4,
    destination: "Rome, Italy",
    place_id: "ChIJgUbEo8cfqokR5lP9_Wh_DaM",
    coord: ('41.387397,2.168568'),
  },
  {
    location_id: 5,
    destination: "Sydney, Australia",
    place_id: "ChIJgUbEo8cfqokR5lP9_Wh_DaM",
    coord: ('41.387397,2.168568'),
  },
  {
    location_id: 6,
    destination: "Cape Town, South Africa",
    place_id: "ChIJgUbEo8cfqokR5lP9_Wh_DaM",
    coord: ('41.387397,2.168568'),
  },
  {
    location_id: 7,
    destination: "Rio de Janeiro, Brazil",
    place_id: "ChIJgUbEo8cfqokR5lP9_Wh_DaM",
    coord: ('41.387397,2.168568'),
  },
  {
    location_id: 8,
    destination: "Barcelona, Spain",
    place_id: "ChIJgUbEo8cfqokR5lP9_Wh_DaM",
    coord: ('41.387397,2.168568'),
  },
];

const trips = [
  {
    trip_id: 1,
    itinerary_id: 1,
    // group_id: 1,
    // location_id: 1,
    tripname: "European Adventure",
    numdays: 14,
    numtravelers: 2,
    isdecided: true,
    vibeform: "outdoors",
  },
  {
    trip_id: 2,
    itinerary_id: 2,
    // group_id: 2,
    // location_id: 2,
    tripname: "Party",
    numdays: 7,
    numtravelers: 4,
    isdecided: false,
    vibeform: "party",
  },
  {
    trip_id: 3,
    itinerary_id: 3,
    // group_id: 3,
    // location_id: 3,
    tripname: "Cultural Experience",
    numdays: 10,
    numtravelers: 3,
    isdecided: false,
    vibeform: "local",
  },
  {
    trip_id: 4,
    itinerary_id: 4,
    // group_id: 4,
    // location_id: 4,
    tripname: "City Exploration",
    numdays: 5,
    numtravelers: 2,
    isdecided: true,
    vibeform: "shop",
  },
  {
    trip_id: 5,
    itinerary_id: 5,
    // group_id: 5,
    // location_id: 5,
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
    image: "https://example.com/image1.jpg",
    title: "Exploring Paris",
    entry: "Today, I visited the Eiffel Tower and had a delicious croissant.",
    timestamp: "2023-09-08 16:28:32-07",
    trip_id: 1,
  },
  {
    journal_id: 2,
    user_id: 2,
    video_content: "https://www.youtube.com/watch?v=zqT0j13dZx4",
    image: "https://example.com/image2.jpg",
    title: "Beach Day",
    entry: "Spent the day relaxing on the beautiful beach in Bali.",
    timestamp: "2016-01-25 10:10:10.555555-05:00",
    trip_id: 2,
  },
  {
    journal_id: 3,
    user_id: 3,
    video_content: "https://www.youtube.com/watch?v=5DcA4BePBdA",
    image: "https://example.com/image3.jpg",
    title: "Cultural Immersion",
    entry: "Explored historic sites and tried local cuisine in Rome.",
    timestamp: "2023-09-08 16:28:32-07",
    trip_id: 3,
  },
  {
    journal_id: 4,
    user_id: 1,
    video_content: "https://www.youtube.com/watch?v=WLSnrXEtrT4",
    image: "https://example.com/image4.jpg",
    title: "City Lights",
    entry: "New York City's skyline is simply breathtaking at night.",
    timestamp: "2016-01-25 10:10:10.555555-05:00",
    trip_id: 4,
  },
  {
    journal_id: 5,
    user_id: 4,
    video_content: "https://www.youtube.com/watch?v=jvN5hZzhFHM",
    image: "https://example.com/image5.jpg",
    title: "Mountain Adventure",
    entry: "Hiked to the summit and enjoyed panoramic views in Nepal.",
    timestamp: "2023-09-08 16:28:32-07",
    trip_id: 5,
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
