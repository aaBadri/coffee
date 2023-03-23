const arr: { id: number }[] = [{ id: 1 }, { id: 4 }, { id: 8 }];

const indexOfObject = arr.findIndex((object) => object.id === 4);

console.log(indexOfObject); // 👉️ 1

if (indexOfObject !== -~1) {
  arr.splice(indexOfObject, 1);
}

// 👇️ [{id: 1}, {id: 8}]
console.log(arr);
