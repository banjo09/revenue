import { Box, Text } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { mockRevenueData } from "../../data/dashboardMockData";

export const RevenueChart = () => {
  const formattedData = mockRevenueData.map((item) => ({
    ...item,
    formattedDate: format(new Date(item.date), "MMM d"),
  }));

  return (
    <Box mb={8} borderRadius="12px" p={0} overflow="hidden">
      <Box px={6} pt={6} pb={2}>
        {/* <ResponsiveContainer width="100%" height={280}> */}
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={formattedData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="0" stroke="#f5f5f5" vertical={false} />
            {/* <XAxis
              dataKey="formattedDate"
              stroke="#999"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            /> */}
            {/* <YAxis
              stroke="#999"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            /> */}
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                padding: "8px 12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              labelStyle={{ fontSize: "12px", color: "#666" }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FF6B35"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#FF6B35", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box display="flex" justifyContent="space-between" px={6} pb={4} pt={2}>
        <Text fontSize="xs" color="gray.500" fontWeight="normal">
          Apr 1, 2022
        </Text>
        <Text fontSize="xs" color="gray.500" fontWeight="normal">
          Apr 30, 2022
        </Text>
      </Box>
    </Box>
  );
};