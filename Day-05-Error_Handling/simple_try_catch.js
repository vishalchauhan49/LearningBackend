/*


📌 SCENARIO 1 - no error, catch never runs

try {
const x = 1 + 1; // safe, no crash
console.log(x); // 2
} catch (err) {
console.log("never runs");
}


📌 SCENARIO 2 - automatic error from JS
try {
undefined. name; // JS throws TypeError automatically
} catch (err) {
console.log("JS threw:", err. message);
}




📌 SCENARIO 3 - you manually throw
try {
throw new Error("I threw this myself");
} catch (err) {
console.log("I caught:", err. message);


*/