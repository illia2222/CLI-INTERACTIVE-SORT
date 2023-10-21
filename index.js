import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

async function main() {
  const readLine = createInterface(stdin, stdout);
  try {
    await cli(readLine);
  } finally {
    readLine.close();
  }
}

async function cli(readLine) {
  const userInput = await readLine.question(
    "Hello. Enter 10 words or digits deviding them in spaces: "
  );
  console.log(`How would you like to sort values: 
  1. Sort words alphabetically
  2. Show numbers from lesser to greater
  3. Show numbers from bigger to smaller
  4. Display words in ascending order by number of letters in the word
  5. Show only unique words

  `);
  const userInputOperation = await readLine.question(
    "Select (1 - 5) and press ENTER: "
  );

  if (userInputOperation === "exit") {
    console.log("Good bye! Come back again!");
    return;
  }

  const inputArr = userInput.split(" ");

  if (userInputOperation === "1") {
    console.log(inputArr.sort());
  } else if (userInputOperation === "2") {
    console.log(inputArr.sort((a, b) => Number(a) - Number(b)));
  } else if (userInputOperation === "3") {
    console.log(inputArr.sort((a, b) => Number(b) - Number(a)));
  } else if (userInputOperation === "4") {
    console.log(inputArr.sort((a, b) => a.length - b.length));
  } else if (userInputOperation === "5") {
    console.log([...new Set(inputArr)]);
  }
  await cli(readLine);
}
main();
