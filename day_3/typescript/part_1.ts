import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

const splitToTwo = (input: string) => {
  return [input.slice(0, input.length / 2), input.slice(input.length / 2)] as [
    string,
    string
  ];
};

const findBoth = ([a, b]: [string, string]) => {
  const aSet = new Set(a.split(""));
  const bSet = new Set(b.split(""));
  const both = new Set([...aSet].filter((x) => bSet.has(x)));
  return [...both][0] || "";
};

const getCharValue = (char: string) => {
  if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
    return char.charCodeAt(0) - 38;
  }
  if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
    return char.charCodeAt(0) - 96;
  }
  return 0;
};

const sum = (a: number, b: number) => a + b;

const solution = (input: string[]): number => {
  return input.map(splitToTwo).map(findBoth).map(getCharValue).reduce(sum, 0);
};

Deno.test("Part 1", () => {
  const input = [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ];

  const res = solution(input);
  assertEquals(res, 157);
});

Deno.test("Part 1 Input", async () => {
  const input = await Deno.readTextFile("../input.txt");
  const data = input.split("\r\n");
  const res = solution(data);
  assertEquals(res, 7597);
});
