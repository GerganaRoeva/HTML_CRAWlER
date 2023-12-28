export function customTrim(str) {
    let start = 0;
    let end = str.length - 1;

    // Trim leading whitespace
    while (start <= end && isWhitespace(str[start])) {
        start++;
    }

    // Trim trailing whitespace
    while (end >= start && isWhitespace(str[end])) {
        end--;
    }

    // Extract the trimmed substring
    const trimmed = str.substring(start, end + 1);
    return trimmed;
}

// Function to check if a character is whitespace
function isWhitespace(char) {
    return char === ' ' || char === '\t' || char === '\n' || char === '\r';
}
