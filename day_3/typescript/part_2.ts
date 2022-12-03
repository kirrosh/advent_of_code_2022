import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

const findCharInAll = (arr: string[]) => {
  const charSet = new Set(arr[0].split(""));
  const res = [...charSet].filter((x) => arr.every((y) => y.includes(x)));
  return res[0] || "";
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

const splitArrayToChunks = (arr: string[], chunkSize: number) => {
  const res = [];
  for (let i = 0, len = arr.length; i < len; i += chunkSize) {
    res.push(arr.slice(i, i + chunkSize));
  }
  return res;
};

const solution = (input: string[]): number => {
  return splitArrayToChunks(input, 3)
    .map(findCharInAll)
    .map(getCharValue)
    .reduce(sum, 0);
};

Deno.test("Part 2", () => {
  const input = [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ];

  const res = solution(input);
  assertEquals(res, 70);
});

Deno.test("Part 2 Input", async () => {
  const input = await Deno.readTextFile("../input.txt");
  const data = input.split("\r\n");
  const res = solution(data);
  assertEquals(res, 2607);
});
