var MAX = 100;
for (var i = 0; i < MAX; i++) {
    var numFactors = 0;
    for (var j = 0; j <= i; j++) {
        if (i % j === 0) {
            numFactors += 1;
        }
    }
    console.log(i, numFactors, numFactors/i);
}