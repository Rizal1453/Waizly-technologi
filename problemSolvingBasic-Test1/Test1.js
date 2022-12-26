function miniMaxSum(arr) {
  arr.sort((a, b) => a - b);
  let min = 0,
    max = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    min += arr[i];
  }
  for (let j = 1; j < arr.length; j++) {
    max += arr[j];
  }
  console.log(min, max);
}
miniMaxSum([1, 2, 3, 4, 5]);
