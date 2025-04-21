export interface GrammarQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const grammarQuestions: GrammarQuestion[] = [
  {
    id: 1,
    question: "She _____ to the store yesterday.",
    options: ["go", "goes", "went", "gone"],
    correctAnswer: "went"
  },
  {
    id: 2,
    question: "If it _____ tomorrow, we will stay home.",
    options: ["rains", "rain", "will rain", "is raining"],
    correctAnswer: "rains"
  },
  {
    id: 3,
    question: "They _____ in London for 10 years.",
    options: ["live", "lived", "have lived", "are living"],
    correctAnswer: "have lived"
  },
  {
    id: 4,
    question: "By the time we arrived, the movie _____.",
    options: ["started", "has started", "had started", "was starting"],
    correctAnswer: "had started"
  },
  {
    id: 5,
    question: "I wish I _____ harder for the exam.",
    options: ["study", "studied", "had studied", "would study"],
    correctAnswer: "had studied"
  }
];

