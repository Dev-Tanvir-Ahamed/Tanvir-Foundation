// src/utils/capitalizeName.ts
export const capitalizeName = (name: string): string => {
    if (!name) return '';
  
    // Split the name into an array of words
    const words = name.split(" ");
  
    // Map over the words, capitalizing the first letter of each word
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  
    // Join the words back into a single string
    return capitalizedWords.join(" ");
  };
  