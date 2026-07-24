import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

console.log("1"); // runs first because there is no delay in the event loop
setTimeout(() => console.log("2"), 0); // it will run after the current call stack is empty, even though the delay is 0
Promise.resolve().then(() => console.log("3")); // it will run after the current call stack is empty, but before the setTimeout callback because microtasks (like Promises) have higher priority than macrotasks (like setTimeout)
console.log("4"); // runs second because there is no delay in the event loop

// point to be noted: The order of execution will be 1, 4, 3, 2. This is because the synchronous code (console.log('1') and console.log('4')) runs first, followed by the microtask (Promise) and then the macrotask (setTimeout). but server.listen is also a macrotask, so it will run after the current call stack is empty, but before the setTimeout callback because it is in the same phase of the event loop as the setTimeout callback. so timeout will run after the server.listen callback.

import { writeFile, readFile } from "fs/promises";

const filePath = "data.txt";

const run = async () => {
  try {
    await writeFile(filePath, "Data written to file");
    const data = await readFile(filePath, "utf-8");
    console.log(data); // Output: Data written to file
  } catch (err) {
    console.error(err);
  }
};

run();

// I do have understanding about the npm and package.json script.
