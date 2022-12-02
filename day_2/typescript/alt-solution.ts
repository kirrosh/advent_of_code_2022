import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";

const createNodes = () => {
  const A = {
    value: 1,
    win: "C",
    lose: "B",
  };

  const B = {
    value: 2,
    win: "A",
    lose: "C",
  };

  const C = {
    value: 3,
    win: "B",
    lose: "A",
  };

  return { A, B, C } as Record<
    string,
    { value: number; win: string; lose: string }
  >;
};

const nodes = createNodes();

const calc_row = (item: string[]) => {
  const [a, b] = item;
  const mapValues = {
    X: "A",
    Y: "B",
    Z: "C",
  };
  const bNode = mapValues[b as keyof typeof mapValues];
  if (a == bNode) {
    return 3 + nodes[bNode].value;
  } else if (nodes[a].win == bNode) {
    return 0 + nodes[bNode].value;
  } else {
    return 6 + nodes[bNode].value;
  }
};

const calc_row_part_2 = (item: string[]) => {
  const [a, b] = item;
  if (b == "X") {
    return nodes[nodes[a].win].value;
  } else if (b == "Y") {
    return nodes[a].value + 3;
  } else {
    return nodes[nodes[a].lose].value + 6;
  }
};

const solution = (input: [string, string][]): number => {
  return input.map(calc_row).reduce((a, b) => a + b, 0);
};

const solution_part_2 = (input: [string, string][]): number => {
  return input.map(calc_row_part_2).reduce((a, b) => a + b, 0);
};

Deno.test("Part 1", () => {
  const res = solution([
    ["A", "Y"],
    ["B", "X"],
    ["C", "Z"],
  ]);
  assertEquals(res, 15);
});

Deno.test("Part 2", () => {
  const res = solution_part_2([
    ["A", "Y"],
    ["B", "X"],
    ["C", "Z"],
  ]);
  assertEquals(res, 12);
});

Deno.test("Part 1 Input", async () => {
  const text = await Deno.readTextFile("../input.txt");
  const parsed = text.split("\r\n").map((line) => line.split(" "));
  const res = solution(parsed as [string, string][]);
  assertEquals(res, 13268);
});

Deno.test("Part 2 Input", async () => {
  const text = await Deno.readTextFile("../input.txt");
  const parsed = text.split("\r\n").map((line) => line.split(" "));
  const res = solution_part_2(parsed as [string, string][]);
  assertEquals(res, 15508);
});
