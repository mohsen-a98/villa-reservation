import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "../../utils/cn";
import { useDarkMode } from "../../hooks/useDarkMode";
// import { useEffect, useRef } from "react";

const startDataLight = [
  {
    duration: "1 شب اقامت",
    value: 0,
  },
  {
    duration: "2 شب اقامت",
    value: 0,
  },
  {
    duration: "3 شب اقامت",
    value: 0,
  },
  {
    duration: "4-5 شب اقامت",
    value: 0,
  },
  {
    duration: "6-7 شب اقامت",
    value: 0,
  },
  {
    duration: "8-14 شب اقامت",
    value: 0,
  },
  {
    duration: "15-21 شب اقامت",
    value: 0,
  },
  {
    duration: "21+ شب اقامت",
    value: 0,
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((item) => {
      if (item.duration === field) {
        return {
          ...item,
          value: item.value + 1,
        };
      }
      return item;
    });
  }

  const data = stays
    .reduce((arr, cur) => {
      const duration = cur.numNights;
      if (duration === 1) {
        return incArrayValue(arr, "1 شب اقامت");
      } else if (duration === 2) {
        return incArrayValue(arr, "2 شب اقامت");
      } else if (duration === 3) {
        return incArrayValue(arr, "3 شب اقامت");
      } else if (duration >= 4 && duration <= 5) {
        return incArrayValue(arr, "4-5 شب اقامت");
      } else if (duration >= 6 && duration <= 7) {
        return incArrayValue(arr, "6-7 شب اقامت");
      } else if (duration >= 8 && duration <= 14) {
        return incArrayValue(arr, "8-14 شب اقامت");
      } else if (duration >= 15 && duration <= 21) {
        return incArrayValue(arr, "15-21 شب اقامت");
      } else if (duration >= 21) {
        return incArrayValue(arr, "21+ شب اقامت");
      }
    }, startData)
    .filter((item) => item.value > 0);

  return data;
}

function DurationChart({ className, confirmedStay }) {
  const { isDarkMode } = useDarkMode();
  const data = prepareData(startDataLight, confirmedStay);
  const colorsLight = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#14b8a6",
    "#3b82f6",
    "#a855f7",
  ];
  const colorsDark = [
    "#b91c1c",
    "#c2410c",
    "#a16207",
    "#4d7c0f",
    "#15803d",
    "#0f766e",
    "#1d4ed8",
    "#7e22ce",
  ];

  const colors = isDarkMode ? colorsDark : colorsLight;

  return (
    <div
      className={cn(
        "dark:bg-bg-dark overflow-auto rounded-md border border-gray-200 bg-white px-6 py-5 dark:border-gray-800",
        className,
      )}
    >
      <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
        نمودار مدت اقامت
      </h2>
      <ResponsiveContainer width="100%" height={240} minWidth={300}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={75}
            outerRadius={100}
            nameKey="duration"
            dataKey="value"
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke={colors[index % colors.length]}
                value={entry.value}
              />
            ))}
          </Pie>
          <Tooltip />

          <Legend
            layout="vertical"
            verticalAlign="middle"
            iconSize={0}
            width="30%"
            align="right"
            wrapperStyle={{
              height: "100%",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DurationChart;
