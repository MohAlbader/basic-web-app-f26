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
    const numbers = query.match(/-?\d+/g);

    if (numbers && numbers.length > 0) {
      return Math.max(...numbers.map(Number)).toString();
    }
  }

  if (lowerQuery.includes("primes")) {
    const numbers = query.match(/\d+/g);

    const isPrime = (n: number): boolean => {
      if (n < 2) return false;

      for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
          return false;
        }
      }

      return true;
    };

    if (numbers) {
      return numbers
        .map(Number)
        .filter(isPrime)
        .join(", ");
    }
  }

  if (lowerQuery.includes("to the power of")) {
    const numbers = query.match(/-?\d+/g);

    if (numbers && numbers.length >= 2) {
      const base = BigInt(numbers[0]);
      const exponent = BigInt(numbers[1]);

      return (base ** exponent).toString();
    }
  }

  if (
    lowerQuery.includes("plus") &&
    lowerQuery.includes("multiplied by")
  ) {
    const numbers = query.match(/-?\d+/g);

    if (numbers && numbers.length >= 3) {
      const a = BigInt(numbers[0]);
      const b = BigInt(numbers[1]);
      const c = BigInt(numbers[2]);

      if (lowerQuery.indexOf("plus") < lowerQuery.indexOf("multiplied by")) {
        // a plus b multiplied by c
        return (a + b * c).toString();
      } else {
        // a multiplied by b plus c
        return (a * b + c).toString();
      }
    }
  }

  if (lowerQuery.includes("plus")) {
    const numbers = query.match(/-?\d+/g);

    if (numbers && numbers.length >= 2) {
      return (BigInt(numbers[0]) + BigInt(numbers[1])).toString();
    }
  }

  if (lowerQuery.includes("minus")) {
    const numbers = query.match(/-?\d+/g);

    if (numbers && numbers.length >= 2) {
      return (BigInt(numbers[0]) - BigInt(numbers[1])).toString();
    }
  }

  if (lowerQuery.includes("multiplied by")) {
    const numbers = query.match(/-?\d+/g);

    if (numbers && numbers.length >= 2) {
      return (BigInt(numbers[0]) * BigInt(numbers[1])).toString();
    }
  }

  if (lowerQuery.includes("andrew id")) {
    return "mbader";
  }

  if (lowerQuery.includes("name")) {
    return "albader";
  }

  if (lowerQuery.includes("age")) {
    return "67";
  }

  return "";
}