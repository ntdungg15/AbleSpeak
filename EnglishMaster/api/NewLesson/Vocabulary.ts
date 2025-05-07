
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
