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
    if (leftMin < rightMin && leftMax < rightMin) {
      return false;
    }
    if (rightMin < leftMin && rightMax < leftMin) {
      return false;
    }
    return true;
  });
  return contains.length;
};

Deno.test("Test", () => {
  const input = `2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8`;

  const res = solution(input);
  assertEquals(res, 4);
});

Deno.test("Input", async () => {
  const input = await Deno.readTextFile("../input.txt");
  const res = solution(input);
  assertEquals(res, 909);
});
