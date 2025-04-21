// export interface GrammarQuestion {
//   id: number;
//   question: string;
//   options: string[];
//   correctAnswer: string;
// }

// export const grammarQuestions: GrammarQuestion[] = [
//   {
//     id: 1,
//     question: "She _____ to the store yesterday.",
//     options: ["go", "goes", "went", "gone"],
//     correctAnswer: "went"
//   },
//   {
//     id: 2,
//     question: "If it _____ tomorrow, we will stay home.",
//     options: ["rains", "rain", "will rain", "is raining"],
//     correctAnswer: "rains"
//   },
//   {
//     id: 3,
//     question: "They _____ in London for 10 years.",
//     options: ["live", "lived", "have lived", "are living"],
//     correctAnswer: "have lived"
//   },
//   {
//     id: 4,
//     question: "By the time we arrived, the movie _____.",
//     options: ["started", "has started", "had started", "was starting"],
//     correctAnswer: "had started"
//   },
//   {
//     id: 5,
//     question: "I wish I _____ harder for the exam.",
//     options: ["study", "studied", "had studied", "would study"],
//     correctAnswer: "had studied"
//   }
// ];

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