export const BAR_DATA = [
  { value: 9850, frontColor: "#DBEAFE", label: "S" },
  { value: 3500, frontColor: "#DBEAFE", label: "M" },
  { value: 5500, frontColor: "#DBEAFE", label: "T" },
  { value: 7000, frontColor: "#2563EB", label: "W" },
  { value: 3800, frontColor: "#DBEAFE", label: "T" },
  { value: 2000, frontColor: "#DBEAFE", label: "F" },
  { value: 8200, frontColor: "#DBEAFE", label: "S" },
];

// Step 1: Get the largest value in the dataset
const maxValue = Math.max(...BAR_DATA.map((item) => item.value));

let roundedMax = Math.ceil(maxValue / 1000) * 1000; // Round up to nearest multiple of 1000

// Step 3: Generate Y-axis labels by breaking into 5 parts
const step = roundedMax / 4;

export const yAxisLabels = Array.from(
  { length: 5 },
  (_, i) => (i * step) / 1000 + "k"
);

console.log(yAxisLabels);
// Example Output: ["0k", "2k", "4k", "6k", "8k", "10k"]

// Step 4: Format the values for display in the chart
export const formattedBarData = BAR_DATA.map((item) => ({
  ...item,
  formattedValue:
    item.value >= 1000
      ? `${(item.value / 1000).toFixed(1)}k`
      : item.value.toString(),
}));

export const ROUTE_WITH_ORDERS = [
  [
    {
      id: 1,
      latitude: 6.925097,
      longitude: 79.986655,
    },
    {
      id: 1,
      latitude: 6.92553,
      longitude: 79.986789,
    },
    {
      id: 1,
      latitude: 6.926317,
      longitude: 79.986481,
    },
    {
      id: 1,
      latitude: 6.927027,
      longitude: 79.9871,
    },
  ],
  [
    {
      id: 1,
      latitude: 6.924157,
      longitude: 79.986713,
    },
    {
      id: 1,
      latitude: 6.923851,
      longitude: 79.986812,
    },
    {
      id: 1,
      latitude: 6.923437,
      longitude: 79.986885,
    },
    {
      id: 1,
      latitude: 6.92331,
      longitude: 79.987133,
    },
  ],
  [
    {
      id: 1,
      latitude: 6.924857,
      longitude: 79.988591,
    },
    {
      id: 1,
      latitude: 6.925056,
      longitude: 79.989267,
    },
    {
      id: 1,
      latitude: 6.92536,
      longitude: 79.989897,
    },
    {
      id: 1,
      latitude: 6.925555,
      longitude: 79.990219,
    },
  ],
];

export const ALL_ORDERS = [
  {
    id: 1,
    latitude: 6.925097,
    longitude: 79.986655,
  },
  {
    id: 1,
    latitude: 6.92553,
    longitude: 79.986789,
  },
  {
    id: 1,
    latitude: 6.926317,
    longitude: 79.986481,
  },
  {
    id: 1,
    latitude: 6.927027,
    longitude: 79.9871,
  },

  {
    id: 1,
    latitude: 6.924157,
    longitude: 79.986713,
  },
  {
    id: 1,
    latitude: 6.923851,
    longitude: 79.986812,
  },
  {
    id: 1,
    latitude: 6.923437,
    longitude: 79.986885,
  },
  {
    id: 1,
    latitude: 6.92331,
    longitude: 79.987133,
  },

  {
    id: 1,
    latitude: 6.924857,
    longitude: 79.988591,
  },
  {
    id: 1,
    latitude: 6.925056,
    longitude: 79.989267,
  },
  {
    id: 1,
    latitude: 6.92536,
    longitude: 79.989897,
  },
  {
    id: 1,
    latitude: 6.925555,
    longitude: 79.990219,
  },
];
