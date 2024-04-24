import dayjs from "dayjs";
import { cn } from "../../utils/cn";
import {
  formatCurrency,
  formatNumber,
  getDaysBetween,
} from "../../utils/helper";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../hooks/useDarkMode";

function SalesChart({ className, bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const currentDate = dayjs();
  const startDate = dayjs().subtract(numDays - 1, "day");

  const range = getDaysBetween(startDate, currentDate);

  const data = range.map((date) => {
    return {
      label: new Intl.DateTimeFormat("fa-IR", {
        day: "numeric",
        month: "long",
      }).format(date),
      فروش: bookings
        .filter((booking) => date.isSame(booking.created_at, "day"))
        .reduce((acc, cur) => acc + cur.villaPrice, 0),
    };
  });

  const color = {
    totalSales: isDarkMode
      ? { stroke: "#3730a3", fill: "#4f46e5" }
      : { stroke: "#4f46e5", fill: "#c7d2fe" },
    text: isDarkMode ? "#e5e7eb" : "#374151",
    background: isDarkMode ? "#18212f" : "#fff",
  };

  return (
    <div
      className={cn(
        " dark:bg-bg-dark h-96 overflow-auto rounded-md border border-gray-200 bg-white px-4 py-3 dark:border-gray-800",
        className,
      )}
    >
      <ResponsiveContainer width={"100%"} height={"100%"} minWidth={500}>
        <BarChart
          data={data}
          width={500}
          height={300}
          margin={{
            top: 30,
            right: 30,
            left: 40,
            bottom: 0,
          }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"label"} padding={{ left: 10, right: 10 }} />
          <YAxis
            className="dir-ltr"
            tickFormatter={(value) => formatNumber(value)}
          />
          <Bar
            dataKey={"فروش"}
            stroke={color.totalSales.stroke}
            fill={color.totalSales.fill}
          />
          <Tooltip
            labelStyle={{ color: color.red }}
            contentStyle={{
              color: color.text,
              backgroundColor: color.background,
            }}
            itemStyle={{ color: color.text }}
            cursor={false}
            formatter={(value) => formatCurrency(value)}
          />
          <Legend iconSize={10} iconType="circle" verticalAlign="top" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
