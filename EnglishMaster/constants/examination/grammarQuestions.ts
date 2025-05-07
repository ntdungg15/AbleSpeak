export type QuestionType = 'fill-in-blank' | 'multiple-choice';

export interface BaseQuestion {
  id: number;
  type: QuestionType;
  question: string;
}

export interface FillInBlankQuestion extends BaseQuestion {
  type: 'fill-in-blank';
  blanks: string[];
  options: string[];
  correctAnswers: string[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: string;
}

export type Question = FillInBlankQuestion | MultipleChoiceQuestion;

export const grammarQuestions: Question[] = [
  // Fill in blank questions
  {
    id: 1,
    type: 'fill-in-blank',
    question: "The luxury Segoda resort is located high up on the _____ offering beautiful views out to sea. Our resort offers three heated _____ which are open all day for you to swim in - or just relax in the warm _____ with a book!",
    blanks: ["_____", "_____", "_____"],
    options: ["Cliff", "Forests", "Pools", "Scenery", "Season", "Soil", "Sunset", "Sunshine"],
    correctAnswers: ["Cliff", "Pools", "Sunshine"]
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: "She _____ to the store yesterday.",
    options: ["go", "goes", "went", "gone"],
    correctAnswer: "went"
  },
  {
    id: 3,
    type: 'fill-in-blank',
    question: "The _____ is very busy today. Many _____ are shopping for the upcoming _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["mall", "people", "holiday", "store", "customer", "weekend", "market", "festival"],
    correctAnswers: ["mall", "people", "holiday"]
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: "They _____ in London for 10 years.",
    options: ["live", "lived", "have lived", "are living"],
    correctAnswer: "have lived"
  },
  {
    id: 5,
    type: 'fill-in-blank',
    question: "In the _____, students study various _____. They learn about science, math, and many other _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["school", "subjects", "topics", "class", "books", "lessons", "university", "courses"],
    correctAnswers: ["school", "subjects", "topics"]
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: "If it _____ tomorrow, we will stay home.",
    options: ["rains", "rain", "will rain", "is raining"],
    correctAnswer: "rains"
  },
  {
    id: 7,
    type: 'fill-in-blank',
    question: "During the _____, we saw many _____ animals in their natural _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["safari", "wild", "habitat", "zoo", "exotic", "environment", "trip", "jungle"],
    correctAnswers: ["safari", "wild", "habitat"]
  },
  {
    id: 8,
    type: 'multiple-choice',
    question: "By the time we arrived, the movie _____.",
    options: ["started", "has started", "had started", "was starting"],
    correctAnswer: "had started"
  },
  {
    id: 9,
    type: 'fill-in-blank',
    question: "The _____ was beautiful as we watched the sun set over the _____. The _____ changed from blue to orange.",
    blanks: ["_____", "_____", "_____"],
    options: ["view", "ocean", "sky", "scene", "horizon", "beach", "landscape", "colors"],
    correctAnswers: ["view", "ocean", "sky"]
  },
  {
    id: 10,
    type: 'multiple-choice',
    question: "I wish I _____ harder for the exam.",
    options: ["study", "studied", "had studied", "would study"],
    correctAnswer: "had studied"
  }
];

export const grammarQuestions1: Question[] = [
  {
    id: 1,
    type: 'fill-in-blank',
    question: "The _____ is very busy today. Many _____ are shopping for the upcoming _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["mall", "people", "holiday", "store", "customer", "weekend", "market", "festival"],
    correctAnswers: ["mall", "people", "holiday"]
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: "She _____ to the store yesterday.",
    options: ["go", "goes", "went", "gone"],
    correctAnswer: "went"
  },
  {
    id: 3,
    type: 'fill-in-blank',
    question: "In the _____, students study various _____. They learn about science, math, and many other _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["school", "subjects", "topics", "class", "books", "lessons", "university", "courses"],
    correctAnswers: ["school", "subjects", "topics"]
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: "They _____ in London for 10 years.",
    options: ["live", "lived", "have lived", "are living"],
    correctAnswer: "have lived"
  },
  {
    id: 5,
    type: 'fill-in-blank',
    question: "The luxury Segoda resort is located high up on the _____. Our resort offers three heated _____ which are open all day for you to swim in - or just relax in the warm _____ with a book!",
    blanks: ["_____", "_____", "_____"],
    options: ["Cliff", "Forests", "Pools", "Scenery", "Season", "Soil", "Sunset", "Sunshine"],
    correctAnswers: ["Cliff", "Pools", "Sunshine"]
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: "If it _____ tomorrow, we will stay home.",
    options: ["rains", "rain", "will rain", "is raining"],
    correctAnswer: "rains"
  },
  {
    id: 7,
    type: 'fill-in-blank',
    question: "During the _____, we saw many _____ animals in their natural _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["safari", "wild", "habitat", "zoo", "exotic", "environment", "trip", "jungle"],
    correctAnswers: ["safari", "wild", "habitat"]
  },
  {
    id: 8,
    type: 'multiple-choice',
    question: "By the time we arrived, the movie _____.",
    options: ["started", "has started", "had started", "was starting"],
    correctAnswer: "had started"
  },
  {
    id: 9,
    type: 'fill-in-blank',
    question: "The _____ was beautiful as we watched the sun set over the _____. The _____ changed from blue to orange.",
    blanks: ["_____", "_____", "_____"],
    options: ["view", "ocean", "sky", "scene", "horizon", "beach", "landscape", "colors"],
    correctAnswers: ["view", "ocean", "sky"]
  },
  {
    id: 10,
    type: 'multiple-choice',
    question: "I wish I _____ harder for the exam.",
    options: ["study", "studied", "had studied", "would study"],
    correctAnswer: "had studied"
  }
];

export const grammarQuestions2: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: "Which word is the synonym of 'happy'?",
    options: ["sad", "joyful", "angry", "tired"],
    correctAnswer: "joyful"
  },
  {
    id: 2,
    type: 'fill-in-blank',
    question: "The _____ is barking loudly at the _____ in the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["dog", "cat", "yard", "house", "boy", "street", "car", "tree"],
    correctAnswers: ["dog", "cat", "yard"]
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: "Choose the correct past tense: 'He _____ a letter yesterday.'",
    options: ["write", "writes", "wrote", "writing"],
    correctAnswer: "wrote"
  },
  {
    id: 4,
    type: 'fill-in-blank',
    question: "My favorite _____ is _____ because it is very _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["season", "summer", "cold", "hot", "rainy", "winter", "spring", "beautiful"],
    correctAnswers: ["season", "summer", "hot"]
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: "Which is a fruit?",
    options: ["carrot", "potato", "apple", "lettuce"],
    correctAnswer: "apple"
  },
  {
    id: 6,
    type: 'fill-in-blank',
    question: "The _____ is shining and the _____ are singing in the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["sun", "birds", "sky", "moon", "stars", "clouds", "wind", "rain"],
    correctAnswers: ["sun", "birds", "sky"]
  },
  {
    id: 7,
    type: 'multiple-choice',
    question: "Which sentence is correct?",
    options: ["She go to school.", "She goes to school.", "She going to school.", "She gone to school."],
    correctAnswer: "She goes to school."
  },
  {
    id: 8,
    type: 'fill-in-blank',
    question: "The _____ is on the _____ next to the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["book", "table", "lamp", "bed", "chair", "window", "pen", "shelf"],
    correctAnswers: ["book", "table", "lamp"]
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: "What is the opposite of 'old'?",
    options: ["young", "big", "small", "tall"],
    correctAnswer: "young"
  },
  {
    id: 10,
    type: 'fill-in-blank',
    question: "The _____ likes to eat _____ in the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["monkey", "banana", "tree", "apple", "forest", "bird", "river", "fish"],
    correctAnswers: ["monkey", "banana", "tree"]
  }
];

export const grammarQuestions3: Question[] = [
  {
    id: 1,
    type: 'fill-in-blank',
    question: "The _____ is playing with a _____ in the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["child", "ball", "park", "dog", "cat", "garden", "toy", "friend"],
    correctAnswers: ["child", "ball", "park"]
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: "Which is a color?",
    options: ["table", "blue", "run", "sing"],
    correctAnswer: "blue"
  },
  {
    id: 3,
    type: 'fill-in-blank',
    question: "The _____ is reading a _____ under the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["girl", "book", "tree", "boy", "magazine", "bench", "flower", "sun"],
    correctAnswers: ["girl", "book", "tree"]
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: "Which animal can fly?",
    options: ["dog", "cat", "bird", "fish"],
    correctAnswer: "bird"
  },
  {
    id: 5,
    type: 'fill-in-blank',
    question: "The _____ is cooking _____ in the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["mother", "dinner", "kitchen", "father", "lunch", "restaurant", "breakfast", "oven"],
    correctAnswers: ["mother", "dinner", "kitchen"]
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: "Which is a day of the week?",
    options: ["January", "Monday", "Summer", "Night"],
    correctAnswer: "Monday"
  },
  {
    id: 7,
    type: 'fill-in-blank',
    question: "The _____ is driving a _____ on the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["man", "car", "road", "woman", "bus", "street", "bike", "highway"],
    correctAnswers: ["man", "car", "road"]
  },
  {
    id: 8,
    type: 'multiple-choice',
    question: "Which is a vegetable?",
    options: ["banana", "carrot", "apple", "orange"],
    correctAnswer: "carrot"
  },
  {
    id: 9,
    type: 'fill-in-blank',
    question: "The _____ is painting a _____ on the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["artist", "picture", "wall", "student", "drawing", "paper", "canvas", "board"],
    correctAnswers: ["artist", "picture", "wall"]
  },
  {
    id: 10,
    type: 'multiple-choice',
    question: "Which is a means of transport?",
    options: ["apple", "car", "banana", "book"],
    correctAnswer: "car"
  }
];

export const grammarQuestions4: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: "Which is a month of the year?",
    options: ["Monday", "January", "Night", "Summer"],
    correctAnswer: "January"
  },
  {
    id: 2,
    type: 'fill-in-blank',
    question: "The _____ is playing the _____ in the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["musician", "guitar", "concert", "piano", "singer", "band", "violin", "hall"],
    correctAnswers: ["musician", "guitar", "concert"]
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: "Which is a drink?",
    options: ["water", "bread", "rice", "apple"],
    correctAnswer: "water"
  },
  {
    id: 4,
    type: 'fill-in-blank',
    question: "The _____ is writing a _____ on the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["student", "letter", "desk", "teacher", "book", "table", "pen", "paper"],
    correctAnswers: ["student", "letter", "desk"]
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: "Which is a part of the body?",
    options: ["car", "hand", "book", "table"],
    correctAnswer: "hand"
  },
  {
    id: 6,
    type: 'fill-in-blank',
    question: "The _____ is baking a _____ in the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["baker", "cake", "oven", "chef", "bread", "kitchen", "pie", "shop"],
    correctAnswers: ["baker", "cake", "oven"]
  },
  {
    id: 7,
    type: 'multiple-choice',
    question: "Which is a country?",
    options: ["Paris", "France", "London", "Tokyo"],
    correctAnswer: "France"
  },
  {
    id: 8,
    type: 'fill-in-blank',
    question: "The _____ is teaching _____ in the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["teacher", "math", "classroom", "student", "science", "school", "lesson", "subject"],
    correctAnswers: ["teacher", "math", "classroom"]
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: "Which is a type of weather?",
    options: ["rainy", "apple", "car", "book"],
    correctAnswer: "rainy"
  },
  {
    id: 10,
    type: 'fill-in-blank',
    question: "The _____ is playing with a _____ in the _____.",
    blanks: ["_____", "_____", "_____"],
    options: ["child", "toy", "garden", "dog", "cat", "ball", "friend", "park"],
    correctAnswers: ["child", "toy", "garden"]
  }
];