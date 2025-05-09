const apiUrl = process.env.EXPO_PUBLIC_HOST_URL;
console.log("API URL:", apiUrl);


export interface Phonetic {
    text: string;
    audio: string;
  }
  
  export interface Definition {
    definition: string;
    example: string;
  }
  
  export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
  }
  
  export interface VocabularyWord {
    id: string;
    word: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    isLearned: boolean;
    lessonId: string;
  }
  
export const getLessonVocabulary = async (
  lessonId: string
): Promise<VocabularyWord[] | null> => {
  try {
    const res = await fetch(
      `${apiUrl}/api/vocabulary/lesson/${encodeURIComponent(lessonId)}`
    );
    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
    const data: VocabularyWord[] = await res.json();
    console.log("Lesson vocabulary:", data);
    return data;
  } catch (error) {
    console.error("Error fetching lesson vocabulary:", error);
    return null;
  }
};


export const updateVocabularyLearnedStatus = async (
  wordId: string,
  isLearned: boolean
): Promise<VocabularyWord | null> => {
  try {
    const res = await fetch(
      `${apiUrl}/api/vocabulary/${encodeURIComponent(wordId)}/learned`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isLearned }),
      }
    );
    console.log("Update learned status response:", res.status);
    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
    const data: VocabularyWord = await res.json();
    console.log("Updated vocabulary:", data);
    return data;
  } catch (error) {
    console.error("Error updating learned status:", error);
    return null;
  }
};


export const getLessonVocabularyStats = async (
  lessonId: string
): Promise<{
  total: number;
  learned: number;
  progress: number;
} | null> => {
  try {
    const res = await fetch(
      `${apiUrl}/api/vocabulary/lesson/${encodeURIComponent(
        lessonId
      )}/stats`
    );
    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
    const data: { total: number; learned: number; progress: number } =
      await res.json();
    console.log("Vocabulary stats:", data);
    return data;
  } catch (error) {
    console.error("Error fetching vocabulary stats:", error);
    return null;
  }
};

export const getVocabularyFromJson = async (lessonId: string): Promise<VocabularyWord[] | null> => {
  try {
    // Determine which part file to read based on lessonId
    let partNumber = 1;
    if (lessonId === "64f1a1000000000000000001" || lessonId === "64f1a1000000000000000002") {
      partNumber = 1;
    } else if (lessonId === "64f1a1000000000000000003" || lessonId === "64f1a1000000000000000004") {
      partNumber = 2;
    } else if (lessonId === "64f1a1000000000000000005" || lessonId === "64f1a1000000000000000006") {
      partNumber = 3;
    } else if (lessonId === "64f1a1000000000000000007" || lessonId === "64f1a1000000000000000008") {
      partNumber = 4;
    } else if (lessonId === "64f1a1000000000000000009" || lessonId === "64f1a1000000000000000010") {
      partNumber = 5;
    }

    const response = await fetch(`/data/vocabulary_part${partNumber}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load vocabulary data: ${response.status}`);
    }

    const data = await response.json();
    // Filter vocabulary items for the specific lesson
    const lessonVocabulary = data.vocabulary.filter(
      (item: VocabularyWord) => item.lessonId === lessonId
    );

    return lessonVocabulary;
  } catch (error) {
    console.error("Error loading vocabulary from JSON:", error);
    return null;
  }
};
