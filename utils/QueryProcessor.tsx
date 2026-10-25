export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (lowerQuery.includes("largest")) {
    const numbers = query.match(/\d+/g);

    if (numbers) {
      return Math.max(...numbers.map(Number)).toString();
    }
  }

  if (lowerQuery.includes("plus")) {
    const numbers = query.match(/\d+/g);

    if (numbers && numbers.length >= 2) {
      return (Number(numbers[0]) + Number(numbers[1])).toString();
    }
  }

  if (lowerQuery.includes("name")) {
    return "albader";
  }

  if (lowerQuery.includes("age")) {
    return "67";
  }

  if (lowerQuery.includes("andrew id")) {
    return "mbader";
  }

  return "";
}