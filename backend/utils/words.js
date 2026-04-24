export const adjectives = [
  "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Black", "White", "Gray", "Brown",
  "Happy", "Sad", "Angry", "Excited", "Nervous", "Brave", "Calm", "Eager", "Gentle", "Fierce",
  "Big", "Small", "Tall", "Short", "Long", "Wide", "Narrow", "Thick", "Thin", "Deep",
  "Hot", "Cold", "Warm", "Cool", "Freezing", "Boiling", "Spicy", "Sweet", "Sour", "Bitter",
  "Fast", "Slow", "Quick", "Rapid", "Sluggish", "Hasty", "Swift", "Brisk", "Leisurely", "Paced",
  "Loud", "Quiet", "Noisy", "Silent", "Deafening", "Muted", "Roaring", "Whispering", "Ringing", "Soft",
  "Bright", "Dark", "Light", "Dim", "Shiny", "Dull", "Glowing", "Fading", "Sparkling", "Shadowy",
  "Rough", "Smooth", "Hard", "Soft", "Bumpy", "Flat", "Sharp", "Blunt", "Slippery", "Sticky",
  "Old", "New", "Young", "Ancient", "Modern", "Fresh", "Stale", "Vintage", "Antique", "Recent",
  "Good", "Bad", "Great", "Terrible", "Awesome", "Awful", "Fantastic", "Horrible", "Excellent", "Poor",
  "Clean", "Dirty", "Neat", "Messy", "Tidy", "Sloppy", "Spotless", "Filthy", "Pure", "Stained",
  "Rich", "Poor", "Wealthy", "Broke", "Expensive", "Cheap", "Valuable", "Worthless", "Priceless", "Costly",
  "Strong", "Weak", "Powerful", "Feeble", "Mighty", "Frail", "Sturdy", "Delicate", "Tough", "Tender",
  "Smart", "Dumb", "Clever", "Stupid", "Wise", "Foolish", "Brilliant", "Idiocy", "Genius", "Clueless",
  "Brave", "Cowardly", "Bold", "Timid", "Fearless", "Fearful", "Courageous", "Scared", "Heroic", "Afraid"
];

export const nouns = [
  "House", "Car", "Tree", "Dog", "Cat", "Bird", "Fish", "Sun", "Moon", "Star",
  "Book", "Pen", "Desk", "Chair", "Table", "Bed", "Door", "Window", "Wall", "Floor",
  "Computer", "Phone", "Screen", "Keyboard", "Mouse", "Cable", "Charger", "Battery", "Plug", "Socket",
  "River", "Mountain", "Ocean", "Lake", "Forest", "Desert", "Valley", "Hill", "Island", "Beach",
  "City", "Town", "Village", "Street", "Road", "Highway", "Bridge", "Tunnel", "Building", "Tower",
  "Shirt", "Pants", "Shoes", "Hat", "Socks", "Jacket", "Coat", "Dress", "Skirt", "Sweater",
  "Apple", "Banana", "Orange", "Grape", "Melon", "Berry", "Cherry", "Peach", "Plum", "Pear",
  "Bread", "Cheese", "Meat", "Milk", "Water", "Juice", "Coffee", "Tea", "Soda", "Wine",
  "Hand", "Foot", "Head", "Eye", "Ear", "Nose", "Mouth", "Tooth", "Hair", "Skin",
  "Day", "Night", "Morning", "Evening", "Afternoon", "Week", "Month", "Year", "Decade", "Century",
  "Friend", "Enemy", "Partner", "Colleague", "Boss", "Worker", "Student", "Teacher", "Doctor", "Nurse",
  "Song", "Movie", "Play", "Game", "Sport", "Team", "Player", "Coach", "Fan", "Referee",
  "Love", "Hate", "Joy", "Sorrow", "Hope", "Fear", "Anger", "Peace", "War", "Victory",
  "Idea", "Thought", "Dream", "Memory", "Plan", "Goal", "Wish", "Secret", "Truth", "Lie",
  "Fire", "Ice", "Earth", "Air", "Wind", "Storm", "Rain", "Snow", "Cloud", "Lightning"
];

export const generateGameName = () => {
  const adj1 = adjectives[Math.floor(Math.random() * adjectives.length)];
  const adj2 = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj1} ${adj2} ${noun}`;
};
