function pearson_correlation_coefficient(X, Y) {
    const n = X.length;

    let sumX = 0;
    let sumY = 0;
    let sumXX = 0;
    let sumYY = 0;
    let sumXY = 0;

    for (let i = 0; i < n; i++) {
        sumX += X[i];
        sumY += Y[i];
        sumXX += X[i] * X[i];
        sumYY += Y[i] * Y[i];
        sumXY += X[i] * Y[i];
    }

    pcc = (n * sumXY - sumX * sumY)
        / Math.sqrt(n * sumXX - sumX * sumX)
        / Math.sqrt(n * sumYY - sumY * sumY);

    return pcc;

}

