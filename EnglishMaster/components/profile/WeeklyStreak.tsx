import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Text as SvgText } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["Sa", "Su", "M", "Tu", "W", "Th", "F"],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 10], // XP của bạn trong tuần
      color: () => "#2196F3",
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#fff",
  },
};

export default function WeeklyXPChart() {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingHorizontal: 24, // giúp biểu đồ không sát mép
        borderRadius: 12,
        marginBottom: 20,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 12 }}>
        XP this week
      </Text>

      <LineChart
        data={data}
        width={screenWidth - 48} // giảm chiều rộng để tránh sát viền
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          borderRadius: 16,
        }}
        withDots
        withShadow={false}
        withInnerLines
        withOuterLines={false}
        fromZero
        renderDotContent={({ x, y, index, indexData }) => {
          const isLast = index === data.datasets[0].data.length - 1;
          const offsetX = isLast ? -screenWidth * 0.03 : 0;

          // Đảm bảo rằng vị trí y không bị cắt mất
          const safeY = y - 5; // Nếu y < 0, gán lại giá trị y hợp lý

          return (
            <SvgText
              key={index}
              x={x + offsetX}
              y={safeY}
              fontSize="12"
              fill="black"
              textAnchor="middle"
            >
              {indexData}
            </SvgText>
          );
        }}
        segments={5}
      />
    </View>
  );
}
