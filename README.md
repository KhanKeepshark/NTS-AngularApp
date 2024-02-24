```
// Можно упростить код, заменив цикл на map. Это сделает код более читаемым и понятным.
function processLargeData(data) {
    return data.map(performComplexCalculation);
}

// Тут можно использовать мемоизацию, чтобы избежать повторных вычислений для оптимизации кода. 
// Конечно при первом рендере вычисления будут происходить, но при последующих рендерах результат будет браться из кэша.
const memo = {};

function performComplexCalculation(item) {
    if (memo[item]) {
        return memo[item];
    } 
    const result = item * item;
    memo[item] = result;
    return result;
}
```
