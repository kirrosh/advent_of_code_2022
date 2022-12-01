import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

const text = await Deno.readTextFile("../input.txt");

const findTop = (sums: number[], n: number) => {
  return sums.sort((a, b) => b - a).slice(0, n);
};

const parseInput = () => text.split("\n").map((line) => parseInt(line));

const collectValues = (values: number[]) => {
  const sums: number[] = [];
  let group: number[] = [];
  values.forEach((value) => {
    if (Number.isNaN(value)) {
      sums.push(sum(group));
      group = [];
    } else {
      group.push(value);
    }
  });
  return sums;
};

const sum = (values: number[]) => {
  return values.reduce((acc, value) => {
    return acc + value;
  }, 0);
};

Deno.test("Top 1", () => {
  const res = sum(findTop(collectValues(parseInput()), 1));
  assertEquals(res, 70720);
});

Deno.test("Top 3", () => {
  const res = sum(findTop(collectValues(parseInput()), 3));
  assertEquals(res, 207148);
});
