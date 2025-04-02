export const generateYAxisLabel = (data: any[]) => {
    // Step 1: Get the largest value in the dataset
    let maxValue = Math.max(...data.map((item) => item.value));
    console.log("Largest value ", maxValue)
    if(maxValue  <=  1000 || maxValue === undefined || maxValue === null) {
        maxValue = 1000
    }
    
    let roundedMax = Math.ceil(maxValue / 1000) * 1000; // Round up to nearest multiple of 1000;
    // Step 3: Generate Y-axis labels by breaking into 5 parts
    const step = roundedMax / 4;

    const yAxisLabels = Array.from(
      { length: 5 },
      (_, i) => (i * step) / 1000 + "k"
    );

    return yAxisLabels;
};
