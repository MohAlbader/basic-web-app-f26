import QueryProcessor from "../../utils/QueryProcessor";
import "@testing-library/jest-dom";

describe("QueryProcessor", () => {
  test("should return a string", () => {
    const query = "test";
    const response: string = QueryProcessor(query);
    expect(typeof response).toBe("string");
  });

  test("should return shakespeare description", () => {
    const query = "shakespeare";
    const response: string = QueryProcessor(query);

    expect(response).toBe(
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
        "English poet, playwright, and actor, widely regarded as the greatest " +
        "writer in the English language and the world's pre-eminent dramatist."
    );
  });

  test("should return name", () => {
    const query = "What is your name?";
    const response: string = QueryProcessor(query);

    expect(response).toBe("albader");
  });

  test("should return Andrew ID", () => {
    const response = QueryProcessor("What is your Andrew ID?");
    expect(response).toBe("mbader");
  });

  test("should return the largest number", () => {
    const response = QueryProcessor(
      "Which of the following numbers is the largest: 72, 44, 58?"
    );

    expect(response).toBe("72");
  });

  test("should return the sum", () => {
    const response = QueryProcessor("What is 56 plus 92?");

    expect(response).toBe("148");
  });
});