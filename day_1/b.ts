const text = await Deno.readTextFile("./input.txt");

const findTopThree = (map: Map<number, number>) => {
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .flatMap((e, i) => Array(e[1]).fill(e[0]))
    .slice(0, 3);
};

const parseInput = () => text.split("\n").map((line) => parseInt(line));

const collectValues = (values: number[]) => {
  const sums = new Map<number, number>();
  values.reduce((acc, value) => {
    if (Number.isNaN(value)) {
      const current = sums.get(value) || 0;
      sums.set(acc, current + 1);
      return 0;
    }
    return acc + value;
  }, 0);
  return sums;
};

const sumTopThree = (values: number[]) => {
  return values.reduce((acc, value) => {
    return acc + value;
  }, 0);
};

const res = sumTopThree(findTopThree(collectValues(parseInput())));

console.log(res);
