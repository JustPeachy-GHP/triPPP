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
      coord: { latitude: 48.8566, longitude: 2.3522 },
    },
    {
      location_id: 2,
      destination: "New York City, USA",
      coord: { latitude: 40.7128, longitude: -74.006 },
    },
    {
      location_id: 3,
      destination: "Tokyo, Japan",
      coord: { latitude: 35.682839, longitude: 139.759455 },
    },
    {
      location_id: 4,
      destination: "Rome, Italy",
      coord: { latitude: 41.9028, longitude: 12.4964 },
    },
    {
      location_id: 5,
      destination: "Sydney, Australia",
      coord: { latitude: -33.8688, longitude: 151.2093 },
    },
    {
      location_id: 6,
      destination: "Cape Town, South Africa",
      coord: { latitude: -33.9249, longitude: 18.4241 },
    },
    {
      location_id: 7,
      destination: "Rio de Janeiro, Brazil",
      coord: { latitude: -22.9083, longitude: -43.1964 },
    },
    {
      location_id: 8,
      destination: "Barcelona, Spain",
      coord: { latitude: 41.3851, longitude: 2.1734 },
    },
    {
      location_id: 9,
      destination: "Auckland, New Zealand",
      coord: { latitude: -36.8485, longitude: 174.7633 },
    },
    {
      location_id: 10,
      destination: "Istanbul, Turkey",
      coord: { latitude: 41.0082, longitude: 28.9784 },
    },
    {
      location_id: 11,
      destination: "Bali, Indonesia",
      coord: { latitude: -8.4095, longitude: 115.1889 },
    },
    {
      location_id: 12,
      destination: "Machu Picchu, Peru",
      coord: { latitude: -13.1631, longitude: -72.545 },
    },
    {
      location_id: 13,
      destination: "Venice, Italy",
      coord: { latitude: 45.4408, longitude: 12.3155 },
    },
    {
      location_id: 14,
      destination: "Santorini, Greece",
      coord: { latitude: 36.3932, longitude: 25.4615 },
    },
    {
      location_id: 15,
      destination: "Cairo, Egypt",
      coord: { latitude: 30.0444, longitude: 31.2357 },
    },
  ];
  
  const tripData = [
    {
      trip_id: 1,
      itinierary_id: 1,
      group_id: 1,
      location_id: 1,
      tripname: "European Adventure",
      numdays: 14,
      numtravelers: 2,
      isdecided: true,
      vibeform: "Outdoors",
    },
    {
      trip_id: 2,
      itinierary_id: 2,
      group_id: 2,
      location_id: 2,
      tripName: "Party",
      numdays: 7,
      numtravelers: 4,
      isdecided: false,
      vibeform: "Chill",
    },
    {
      trip_id: 3,
      itinierary_id: 3,
      group_id: 3,
      location_id: 3,
      tripname: "Cultural Experience",
      numdays: 10,
      numtravelers: 3,
      isdecided: false,
      vibeform: "Local",
    },
    {
      trip_id: 4,
      itinierary_id: 4,
      group_id: 4,
      location_id: 4,
      tripname: "City Exploration",
      numdays: 5,
      numtravelers: 2,
      isdecided: true,
      vibeform: "Shop",
    },
    {
      trip_id: 5,
      itinierary_id: 5,
      group_id: 5,
      location_id: 5,
      tripname: "Mountain Retreat",
      numdays: 3,
      numtravelers: 2,
      isdecided: true,
      vibeform: "Scenic",
    },
  ];
  
  const journalData = [
    {
      journal_id: 1,
      user_id: 1,
      videocontent: "https://www.youtube.com/watch?v=video1",
      image: "https://example.com/image1.jpg",
      title: "Exploring Paris",
      entry: "Today, I visited the Eiffel Tower and had a delicious croissant.",
      timestamp: "",
      trip_id: 1,
    },
    {
      journal_id: 2,
      user_id: 2,
      video_content: "https://www.youtube.com/watch?v=video2",
      image: "https://example.com/image2.jpg",
      title: "Beach Day",
      entry: "Spent the day relaxing on the beautiful beach in Bali.",
      timestamp: "",
      trip_id: 2,
    },
    {
      journal_id: 3,
      user_id: 3,
      video_content: "https://www.youtube.com/watch?v=video3",
      image: "https://example.com/image3.jpg",
      title: "Cultural Immersion",
      entry: "Explored historic sites and tried local cuisine in Rome.",
      timestamp: "",
      trip_id: 3,
    },
    {
      journal_id: 4,
      user_id: 1,
      video_content: "https://www.youtube.com/watch?v=video4",
      image: "https://example.com/image4.jpg",
      title: "City Lights",
      entry: "New York City's skyline is simply breathtaking at night.",
      timestamp: "",
      trip_id: 4,
    },
    {
      journal_id: 5,
      user_id: 4,
      video_content: "https://www.youtube.com/watch?v=video5",
      image: "https://example.com/image5.jpg",
      title: "Mountain Adventure",
      entry: "Hiked to the summit and enjoyed panoramic views in Nepal.",
      timestamp: "",
      trip_id: 5,
    },
    {
      journal_id: 6,
      user_id: 5,
      video_content: "https://www.youtube.com/watch?v=video6",
      image: "https://example.com/image6.jpg",
      title: "Desert Safari",
      entry: "Explored the Sahara Desert and camped under the stars.",
      timestamp: "",
      trip_id: 6,
    },
    {
      journal_id: 7,
      user_id: 2,
      video_content: "https://www.youtube.com/watch?v=video7",
      image: "https://example.com/image7.jpg",
      title: "Historic Athens",
      entry: "Visited the Acropolis and learned about Greek history.",
      timestamp: "",
      trip_id: 7,
    },
  ];
  
  const groupmembers = [
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
      user_id: 2
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
  
  const itinieraryData = [
    {
      itinierary_id: 1,
      trip_id: 1,
      location_id: 1,
      user_id: 1,
      rating: 1,
    },
    {
      itinierary_id: 2,
      trip_id: 2,
      location_id: 2,
      user_id: 2,
      rating: 2,
    },
    {
      itinierary_id: 3,
      trip_id: 3,
      location_id: 3,
      user_id: 3,
      rating: 3,
    },
    {
      itinierary_id: 4,
      trip_id: 4,
      location_id: 4,
      user_id: 4,
      rating: 3,
    },
  ];
  