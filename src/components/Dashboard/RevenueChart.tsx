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
    <Box mb={8} bg="white" borderRadius="lg" p={6}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="formattedDate"
            stroke="#999"
            fontSize={12}
            tickLine={false}
          />
          <YAxis stroke="#999" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#FF6B35"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#FF6B35" }}
          />
        </LineChart>
      </ResponsiveContainer>
      <Box display="flex" justifyContent="space-between" mt={4} px={4}>
        <Text fontSize="sm" color="gray.600">
          Apr 1, 2022
        </Text>
        <Text fontSize="sm" color="gray.600">
          Apr 30, 2022
        </Text>
      </Box>
    </Box>
  );
};