const apiUrl = process.env.EXPO_PUBLIC_HOST_URL;
console.log(apiUrl );

export const getVocabulary = async (word: string) => {
  try {
    const response = await fetch(`${apiUrl}/dictionary/word/${encodeURIComponent(word)}`);
    if (!response.ok) {
      throw new Error(`Lỗi từ server: ${response.status}`);
    }
    const data = await response.json();
    console.log("Definition:", data);
    return data;
  } catch (error) {
    console.error("Lỗi khi fetch từ điển:", error);
    return null;
  }
};
  

export const getTranslation = async (text: string) => {
  try {
    const response = await fetch(`${apiUrl}/dictionary/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'en',
        to: 'vi',
        text: text,
      }),
    });

    console.log('Translation API Response:', response.status);
    const data = await response.text();
    console.log('Translated Text:', data);

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error in getTranslation:', error);
    throw error;
  }
};
      