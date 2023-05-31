function checkArgument (arg) {
  if (typeof arg === 'number') {
    return Number.isInteger(arg/2)
  }
  return ''
}

function findSimpleNumbers() {
  const arrayOfSimpleNumbers = []

  nextSimple:
  for (let i = 1; i <= Number.MAX_SAFE_INTEGER; i++) {
    for(let j = 2; j < i; j++) {
      if (i % j === 0) continue nextSimple
    }

    arrayOfSimpleNumbers.push(i)
    if(arrayOfSimpleNumbers.length >= 5) {
      return arrayOfSimpleNumbers.reduce((acc, item) => {
        return acc + item
      }, 0)
    }
  }
}

function getRowSum (n) {
  const symbol = '1'
  const row = []
  for(let i = 1; i <= n; i++) {
    const currStr = symbol.padEnd(i, symbol)
    row.push(currStr)
  }
  return row.reduce((acc, item) => {
    return acc + Number(item);
  }, 0)
} 

console.log(checkArgument(4))
console.log(checkArgument('3'))
console.log(checkArgument({}))

console.log(findSimpleNumbers())

console.log(getRowSum(5))
