import QueryProcessor from "../../utils/QueryProcessor";
import "@testing-library/jest-dom";

describe("QueryProcessor", () => {
  test("should return a string", () => {
    expect(typeof QueryProcessor("test")).toBe("string");
  });

  test("should return shakespeare description", () => {
    expect(QueryProcessor("shakespeare")).toBe(
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
        "English poet, playwright, and actor, widely regarded as the greatest " +
        "writer in the English language and the world's pre-eminent dramatist."
    );
  });

  test("should return name", () => {
    expect(QueryProcessor("What is your name?")).toBe("albader");
  });

  test("should return Andrew ID", () => {
    expect(QueryProcessor("What is your Andrew ID?")).toBe("mbader");
  });

  test("largest number", () => {
    expect(
      QueryProcessor(
        "Which of the following numbers is the largest: 72, 44, 58?"
      )
    ).toBe("72");
  });

  test("smallest number", () => {
    expect(
      QueryProcessor(
        "Which of the following numbers is the smallest: 72, 44, 58?"
      )
    ).toBe("44");
  });

  test("primes", () => {
    expect(
      QueryProcessor(
        "Which of the following numbers are primes: 43, 62, 80, 37, 46?"
      )
    ).toBe("43, 37");
  });

  test("one prime", () => {
    expect(
      QueryProcessor(
        "Which of the following numbers are primes: 38, 80, 65, 85, 5?"
      )
    ).toBe("5");
  });

  test("simple addition", () => {
    expect(QueryProcessor("What is 56 plus 92?")).toBe("148");
  });

  test("multiple additions", () => {
    expect(
      QueryProcessor("What is 29 plus 70 plus 16?")
    ).toBe("115");
  });

  test("subtraction", () => {
    expect(QueryProcessor("What is 30 minus 53?")).toBe("-23");
  });

  test("multiplication", () => {
    expect(
      QueryProcessor("What is 34 multiplied by 54?")
    ).toBe("1836");
  });

  test("multiplication precedence 1", () => {
    expect(
      QueryProcessor(
        "What is 75 plus 13 multiplied by 22?"
      )
    ).toBe("361");
  });

  test("multiplication precedence 2", () => {
    expect(
      QueryProcessor(
        "What is 81 plus 10 multiplied by 82?"
      )
    ).toBe("901");
  });

  test("multiplication then addition", () => {
    expect(
      QueryProcessor(
        "What is 66 multiplied by 13 plus 83?"
      )
    ).toBe("941");
  });

  test("another multiplication then addition", () => {
    expect(
      QueryProcessor(
        "What is 40 multiplied by 82 plus 65?"
      )
    ).toBe("3345");
  });

  test("another precedence example", () => {
    expect(
      QueryProcessor(
        "What is 21 plus 87 multiplied by 19?"
      )
    ).toBe("1674");
  });

  test("power", () => {
    expect(
      QueryProcessor("What is 84 to the power of 15?")
    ).toBe((84n ** 15n).toString());
  });

  test("large power", () => {
    expect(
      QueryProcessor("What is 80 to the power of 61?")
    ).toBe((80n ** 61n).toString());
  });

  test("scrabble banana", () => {
    expect(
      QueryProcessor("What is the scrabble score of banana?")
    ).toBe("8");
  });

  test("dictionary anagram", () => {
    expect(
      QueryProcessor(
        "Which of the following is an anagram of dictionary: incendiary, indicatory, abdication, butterfly?"
      )
    ).toBe("indicatory");
  });

  test("even numbers", () => {
    expect(
      QueryProcessor(
        "Which of the following numbers are even: 13, 20, 42, 55?"
      )
    ).toBe("20, 42");
  });

  test("odd numbers", () => {
    expect(
      QueryProcessor(
        "Which of the following numbers are odd: 13, 20, 42, 55?"
      )
    ).toBe("13, 55");
  });

  test("division", () => {
    expect(
      QueryProcessor("What is 100 divided by 4?")
    ).toBe("25");
  });

  test("factorial", () => {
    expect(QueryProcessor("What is 8 factorial?")).toBe(
      "40320"
    );
  });

  test("square root", () => {
    expect(
      QueryProcessor("What is the square root of 144?")
    ).toBe("12");
  });

  test("gcd", () => {
    expect(
      QueryProcessor(
        "What is the greatest common divisor of 48 and 18?"
      )
    ).toBe("6");
  });

  test("lcm", () => {
    expect(
      QueryProcessor(
        "What is the least common multiple of 12 and 18?"
      )
    ).toBe("36");
  });

  test("modulo", () => {
    expect(
      QueryProcessor("What is 17 modulo 5?")
    ).toBe("2");
  });

  test("palindrome", () => {
    expect(
      QueryProcessor(
        "Which of the following is a palindrome: apple, level, house?"
      )
    ).toBe("level");
  });
});