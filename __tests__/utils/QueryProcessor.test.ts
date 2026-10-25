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

  test("should return largest number", () => {
    expect(
      QueryProcessor(
        "Which of the following numbers is the largest: 72, 44, 58?"
      )
    ).toBe("72");
  });

  test("should add numbers", () => {
    expect(QueryProcessor("What is 56 plus 92?")).toBe("148");
  });

  test("should subtract numbers", () => {
    expect(QueryProcessor("What is 30 minus 53?")).toBe("-23");
  });

  test("should multiply numbers", () => {
    expect(QueryProcessor("What is 34 multiplied by 54?")).toBe("1836");
  });

  test("should handle addition before written multiplication", () => {
    expect(
      QueryProcessor("What is 75 plus 13 multiplied by 22?")
    ).toBe("361");
  });

  test("should handle multiplication followed by addition", () => {
    expect(
      QueryProcessor("What is 91 multiplied by 68 plus 9?")
    ).toBe("6197");
  });

  test("should calculate powers", () => {
    expect(QueryProcessor("What is 84 to the power of 15?")).toBe(
      (84n ** 15n).toString()
    );
  });

  test("should identify multiple primes", () => {
    expect(
      QueryProcessor(
        "Which of the following numbers are primes: 43, 62, 80, 37, 46?"
      )
    ).toBe("43, 37");
  });

  test("should identify one prime", () => {
    expect(
      QueryProcessor(
        "Which of the following numbers are primes: 38, 80, 65, 85, 5?"
      )
    ).toBe("5");
  });
});