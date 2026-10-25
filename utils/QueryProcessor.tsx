function getNumbers(text: string): number[] {
  const matches = text.match(/-?\d+(?:\.\d+)?/g);
  return matches ? matches.map(Number) : [];
}

function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) {
    return false;
  }

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function anagramKey(word: string): string {
  return word
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .sort()
    .join("");
}

function getScrabbleScore(word: string): number {
  const scores: Record<string, number> = {
    a: 1,
    b: 3,
    c: 3,
    d: 2,
    e: 1,
    f: 4,
    g: 2,
    h: 4,
    i: 1,
    j: 8,
    k: 5,
    l: 1,
    m: 3,
    n: 1,
    o: 1,
    p: 3,
    q: 10,
    r: 1,
    s: 1,
    t: 1,
    u: 1,
    v: 4,
    w: 4,
    x: 8,
    y: 4,
    z: 10,
  };

  return word
    .toLowerCase()
    .split("")
    .reduce((total, letter) => total + (scores[letter] ?? 0), 0);
}

function evaluateArithmetic(query: string): string | null {
  let expression = query
    .toLowerCase()
    .replace(/^what is\s+/, "")
    .replace(/\?$/, "")
    .trim();

  expression = expression
    .replace(/multiplied by/g, "*")
    .replace(/\btimes\b/g, "*")
    .replace(/divided by/g, "/")
    .replace(/\bplus\b/g, "+")
    .replace(/\bminus\b/g, "-");

  const tokens = expression.match(/-?\d+(?:\.\d+)?|[+\-*/]/g);

  if (!tokens || tokens.length === 0) {
    return null;
  }

  if (!/^-?\d+(?:\.\d+)?$/.test(tokens[0])) {
    return null;
  }

  const values: number[] = [Number(tokens[0])];
  const addSubtractOperators: string[] = [];

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const numberToken = tokens[i + 1];

    if (
      !numberToken ||
      !/^-?\d+(?:\.\d+)?$/.test(numberToken)
    ) {
      return null;
    }

    const value = Number(numberToken);

    if (operator === "*") {
      const previous = values.pop();

      if (previous === undefined) {
        return null;
      }

      values.push(previous * value);
    } else if (operator === "/") {
      const previous = values.pop();

      if (previous === undefined || value === 0) {
        return null;
      }

      values.push(previous / value);
    } else if (operator === "+" || operator === "-") {
      addSubtractOperators.push(operator);
      values.push(value);
    } else {
      return null;
    }
  }

  let result = values[0];

  for (let i = 0; i < addSubtractOperators.length; i++) {
    if (addSubtractOperators[i] === "+") {
      result += values[i + 1];
    } else {
      result -= values[i + 1];
    }
  }

  return result.toString();
}

function factorial(n: bigint): bigint {
  let result = 1n;

  for (let i = 2n; i <= n; i++) {
    result *= i;
  }

  return result;
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) {
    return 0;
  }

  return Math.abs(a * b) / gcd(a, b);
}

export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase().trim();

  if (lowerQuery.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  // Which number is largest?
  if (lowerQuery.includes("largest")) {
    const numbers = getNumbers(query);

    if (numbers.length > 0) {
      return Math.max(...numbers).toString();
    }
  }

  // Which number is smallest?
  if (lowerQuery.includes("smallest")) {
    const numbers = getNumbers(query);

    if (numbers.length > 0) {
      return Math.min(...numbers).toString();
    }
  }

  // Prime numbers
  if (lowerQuery.includes("numbers are primes")) {
    const numbers = getNumbers(query);

    return numbers.filter(isPrime).join(", ");
  }

  // Even numbers
  if (lowerQuery.includes("numbers are even")) {
    const numbers = getNumbers(query);

    return numbers
      .filter((n) => Number.isInteger(n) && n % 2 === 0)
      .join(", ");
  }

  // Odd numbers
  if (lowerQuery.includes("numbers are odd")) {
    const numbers = getNumbers(query);

    return numbers
      .filter((n) => Number.isInteger(n) && Math.abs(n % 2) === 1)
      .join(", ");
  }

  // Anagram questions
  // Example:
  // Which of the following is an anagram of dictionary:
  // incendiary, indicatory, abdication, butterfly?
  if (lowerQuery.includes("anagram of")) {
    const match = query.match(
      /anagram of\s+([a-z]+)\s*:\s*(.+?)\??$/i
    );

    if (match) {
      const target = match[1];
      const options = match[2]
        .split(",")
        .map((option) =>
          option
            .trim()
            .replace(/[?.!]+$/g, "")
        );

      const targetKey = anagramKey(target);

      const answers = options.filter(
        (option) =>
          anagramKey(option) === targetKey &&
          option.toLowerCase() !== target.toLowerCase()
      );

      return answers.join(", ");
    }
  }

  // Scrabble
  if (lowerQuery.includes("scrabble score of")) {
    const match = query.match(
      /scrabble score of\s+([a-z]+)/i
    );

    if (match) {
      return getScrabbleScore(match[1]).toString();
    }
  }

  // Power
  if (lowerQuery.includes("to the power of")) {
    const matches = query.match(/-?\d+/g);

    if (matches && matches.length >= 2) {
      const base = BigInt(matches[0]);
      const exponent = BigInt(matches[1]);

      if (exponent >= 0n) {
        return (base ** exponent).toString();
      }
    }
  }

  // Factorial
  if (lowerQuery.includes("factorial")) {
    const matches = query.match(/\d+/g);

    if (matches && matches.length >= 1) {
      const n = BigInt(matches[0]);
      return factorial(n).toString();
    }
  }

  // Square root
  if (lowerQuery.includes("square root of")) {
    const numbers = getNumbers(query);

    if (numbers.length >= 1 && numbers[0] >= 0) {
      return Math.sqrt(numbers[0]).toString();
    }
  }

  // Squared
  if (/\b\d+\s+squared\b/i.test(query)) {
    const numbers = getNumbers(query);

    if (numbers.length >= 1) {
      return (numbers[0] ** 2).toString();
    }
  }

  // Cubed
  if (/\b\d+\s+cubed\b/i.test(query)) {
    const numbers = getNumbers(query);

    if (numbers.length >= 1) {
      return (numbers[0] ** 3).toString();
    }
  }

  // Modulo / remainder
  if (
    lowerQuery.includes("modulo") ||
    lowerQuery.includes("remainder")
  ) {
    const numbers = getNumbers(query);

    if (numbers.length >= 2 && numbers[1] !== 0) {
      return (numbers[0] % numbers[1]).toString();
    }
  }

  // Greatest common divisor
  if (
    lowerQuery.includes("greatest common divisor") ||
    lowerQuery.includes("gcd")
  ) {
    const numbers = getNumbers(query);

    if (numbers.length >= 2) {
      return gcd(numbers[0], numbers[1]).toString();
    }
  }

  // Least common multiple
  if (
    lowerQuery.includes("least common multiple") ||
    lowerQuery.includes("lcm")
  ) {
    const numbers = getNumbers(query);

    if (numbers.length >= 2) {
      return lcm(numbers[0], numbers[1]).toString();
    }
  }

  // Count vowels
  if (lowerQuery.includes("how many vowels")) {
    const match = query.match(
      /(?:word\s+)?["']?([a-z]+)["']?\??$/i
    );

    if (match) {
      const vowels = match[1].match(/[aeiou]/gi);
      return (vowels?.length ?? 0).toString();
    }
  }

  // Reverse a word
  if (
    lowerQuery.includes("reverse of") ||
    lowerQuery.includes("reversed")
  ) {
    const match = query.match(
      /(?:reverse of|reverse)\s+["']?([a-z]+)["']?/i
    );

    if (match) {
      return match[1].split("").reverse().join("");
    }
  }

  // Choose a palindrome
  if (
    lowerQuery.includes("which of the following") &&
    lowerQuery.includes("palindrome")
  ) {
    const colonIndex = query.indexOf(":");

    if (colonIndex !== -1) {
      const options = query
        .slice(colonIndex + 1)
        .replace(/\?$/, "")
        .split(",")
        .map((word) => word.trim());

      const palindromes = options.filter((word) => {
        const cleaned = word
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");

        return (
          cleaned.length > 0 &&
          cleaned === cleaned.split("").reverse().join("")
        );
      });

      return palindromes.join(", ");
    }
  }

  // General arithmetic.
  // Handles:
  // 66 multiplied by 13 plus 83
  // 21 plus 87 multiplied by 19
  // 29 plus 70 plus 16
  // 30 minus 53
  // 10 multiplied by 5 minus 2
  // divided by
  if (
    lowerQuery.startsWith("what is ") &&
    (
      lowerQuery.includes("plus") ||
      lowerQuery.includes("minus") ||
      lowerQuery.includes("multiplied by") ||
      lowerQuery.includes("times") ||
      lowerQuery.includes("divided by")
    )
  ) {
    const result = evaluateArithmetic(query);

    if (result !== null) {
      return result;
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