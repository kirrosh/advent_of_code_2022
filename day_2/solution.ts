import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
type Default = "A" | "B" | "C";
type Cusom = "X" | "Y" | "Z";

class Node {
  value: number;
  beat: Node | null = null;
  constructor(value: number) {
    this.value = value;
  }
  setBeat(node: Node) {
    this.beat = node;
  }
  compare(node: Node) {
    if (this.value === node.value) {
      return 3;
    }
    if (this.beat?.value === node.value) {
      return 6;
    }
    return 0;
  }
}

const createRools = () => {
  const A = new Node(1);
  const B = new Node(2);
  const C = new Node(3);
  A.setBeat(C);
  B.setBeat(A);
  C.setBeat(B);
  return { A, B, C };
};

const solution = (input: [Default, Cusom][]): number => {
  const rools = createRools();
  const { A, B, C } = rools;
  const custom = { X: A, Y: B, Z: C };
  let sum = 0;
  input.forEach((item) => {
    const [a, b] = item;
    const aNode = rools[a as Default];
    const bNode = custom[b as Cusom];
    sum += bNode.compare(aNode) + bNode.value;
  });
  return sum;
};

const solutionPart_2 = (input: [Default, Cusom][]): number => {
  const rools = createRools();
  let sum = 0;
  input.forEach((item) => {
    const [a, b] = item;
    const aNode = rools[a as Default];
    if (b == "X") {
      sum += aNode.beat?.value! + 0;
    } else if (b == "Y") {
      sum += aNode.value + 3;
    } else {
      sum += aNode.beat?.beat?.value! + 6;
    }
  });
  return sum;
};

Deno.test("Part 1", () => {
  const res = solution([
    ["A", "Y"],
    ["B", "X"],
    ["C", "Z"],
  ]);
  assertEquals(res, 15);
});

Deno.test("Part 1 Input", async () => {
  const text = await Deno.readTextFile("./input.txt");
  const parsed = text.split("\r\n").map((line) => line.split(" "));
  const res = solution(parsed as [Default, Cusom][]);
  assertEquals(res, 13268);
});

Deno.test("Part 2", () => {
  const res = solutionPart_2([
    ["A", "Y"],
    ["B", "X"],
    ["C", "Z"],
  ]);
  assertEquals(res, 12);
});

Deno.test("Part 2 Input", async () => {
  const text = await Deno.readTextFile("./input.txt");
  const parsed = text.split("\r\n").map((line) => line.split(" "));
  const res = solutionPart_2(parsed as [Default, Cusom][]);
  assertEquals(res, 15508);
});
