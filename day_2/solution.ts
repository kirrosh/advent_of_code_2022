import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
type Default = "A" | "B" | "C";
type Cusom = "X" | "Y" | "Z";
const VALUES = {
  A: 1,
  B: 2,
  C: 3,
};

class Node {
  value: number;
  beat: Node | null = null;
  // loose: Node | null = null;
  constructor(value: number) {
    this.value = value;
  }
  setBeat(node: Node) {
    this.beat = node;
  }
  // setLoose(node: Node) {
  //     this.loose = node;
  // }
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
  // A.setLoose(B);
  B.setBeat(A);
  // B.setLoose(C);
  C.setBeat(B);
  // C.setLoose(A);
  return { A, B, C };
};

const rotation = function* () {
  const { A, B, C } = createRools();
  yield { X: A, Y: B, Z: C };
  yield { X: B, Y: C, Z: A };
  yield { X: C, Y: A, Z: B };

  yield { X: A, Y: C, Z: B };
  yield { X: B, Y: A, Z: C };
  yield { X: C, Y: B, Z: A };
};

const calculateAll = (input: [Default, Cusom][]) => {
  const rools = createRools();

  let sums = [];
  for (const custom of rotation()) {
    let sum = 0;
    input.forEach((item) => {
      const [a, b] = item;
      const aNode = rools[a as Default];
      const bNode = custom[b as Cusom];
      sum += bNode.compare(aNode) + bNode.value;
    });
    sums.push(sum);
  }
  return sums;
};

const solution = (input: [Default, Cusom][]): number => {
  const sums = calculateAll(input);
  return sums[0];
  // Do not need  to find Max LOl
  //   return Math.max(...sums);
};

Deno.test("Test", () => {
  const res = solution([
    ["A", "Y"],
    ["B", "X"],
    ["C", "Z"],
  ]);
  assertEquals(res, 13268);
});

Deno.test("Input", async () => {
  const text = await Deno.readTextFile("./input.txt");
  const parsed = text.split("\r\n").map((line) => line.split(" "));
  const res = solution(parsed as [Default, Cusom][]);
  assertEquals(res, 13268);
});
