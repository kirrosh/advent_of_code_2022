import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

const parseLine = (input: string) => {
  const [left, right] = input.split(",");
  const [leftMin, leftMax] = left.split("-").map(Number);
  const [rightMin, rightMax] = right.split("-").map(Number);
  return { leftMin, leftMax, rightMin, rightMax };
};

const solution = (input: string): number => {
  const parsed = input.split("\n").map(parseLine);
  const contains = parsed.filter(({ leftMin, leftMax, rightMin, rightMax }) => {
    if (leftMin <= rightMin && leftMax >= rightMax) {
      return true;
    }
    if (leftMin >= rightMin && leftMax <= rightMax) {
      return true;
    }
    return false;
  });
  return contains.length;
};

Deno.test("Part 1", () => {
  const input = `2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8`;

  const res = solution(input);
  assertEquals(res, 2);
});

Deno.test("Part 1 Input", async () => {
  const input = await Deno.readTextFile("../input.txt");
  const res = solution(input);
  assertEquals(res, 518);
});
