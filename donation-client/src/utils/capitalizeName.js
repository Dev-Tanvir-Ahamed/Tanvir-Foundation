 const  capitalizeName = (name) => {
    // Split the name into an array of words
    const words = name.split(" ");

    // Map over the words, capitalizing the first letter of each word
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Join the words back into a single string
    return capitalizedWords.join(" ");
}

// Example usage
// const name = "tanvir ahamed";
// const capitalizedName = capitalizeName(name);
// console.log(capitalizedName); // Output: Tanvir Ahamed
export default capitalizeName