const text = await Deno.readTextFile("./input.txt");

let max = 0;

const collect = (value: number) => {
  max = Math.max(max, value);
};

text.split("\n").reduce((acc, line) => {
  const numberLine = parseInt(line);
  if (Number.isNaN(numberLine)) {
    collect(acc);
    return 0;
  }
  return acc + numberLine;
}, 0);

console.log(max);
