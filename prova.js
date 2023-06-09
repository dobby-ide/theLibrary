const array = [[{ title: 'bravo' }], [{ title: 'coglione' }]]
const found = array.map((firstArray) => firstArray.map((secondArray) => secondArray.title))
//console.log(found)
for (let i in array) {
  const t = array[i]
  for (let j in t) {
    console.log(t[j].title)
  }
}
