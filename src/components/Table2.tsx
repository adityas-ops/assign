import React, { useMemo } from "react";
import { DataType } from "../../types/DataType";
import dataJson from "../../data/a.json";
import { Table } from "@mantine/core";


function Table2() {
  const aggregatedData2 = useMemo(() => {
    const groupedByCrop: {
      [key: string]: { yieldSum: number; areaSum: number; count: number };
    } = {};

    // Iterate through all data to calculate sums and counts
    (dataJson as DataType[]).forEach((item) => {
      const cropName = item["Crop Name"];
      const cropYield =
        item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0;
      const cropArea = item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0;

      if (!groupedByCrop[cropName]) {
        groupedByCrop[cropName] = { yieldSum: 0, areaSum: 0, count: 0 };
      }

      groupedByCrop[cropName].yieldSum += cropYield;
      groupedByCrop[cropName].areaSum += cropArea;
      groupedByCrop[cropName].count += 1;
    });

    // Calculate averages and prepare the aggregated data
    return Object.keys(groupedByCrop).map((crop) => {
      const { yieldSum, areaSum, count } = groupedByCrop[crop];
      return {
        Crop: crop,
        AvgYield: parseFloat((yieldSum / count).toFixed(3)), // Average Yield (rounded to 3 decimal places)
        AvgCultivationArea: parseFloat((areaSum / count).toFixed(3)), // Average Cultivation Area (rounded to 3 decimal places)
      };
    });
  }, [dataJson]); // Recalculate only if dataJson changes

  const row2 = aggregatedData2.map((item) => (
    <Table.Tr key={item.Crop}>
      <Table.Td>{item.Crop}</Table.Td>
      <Table.Td>{item.AvgYield}</Table.Td>
      <Table.Td>{item.AvgCultivationArea}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <div
        style={{
          width: "100%",
        }}
      >
        <h3
          style={{
            textAlign: "center",
          }}
        >
          Table-2: Average Yield and Cultivation Area (1950-2020)
        </h3>
        <Table
          withTableBorder
          withColumnBorders
           borderColor="dark"
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th
                style={{
                  textAlign: "center",
                }}
              >
                Crop
              </Table.Th>
              <Table.Th
                style={{
                  textAlign: "center",
                }}
              >
                Average Yield of the Crop between 1950-2020
              </Table.Th>
              <Table.Th
                style={{
                  textAlign: "center",
                }}
              >
                Average Cultivation Area of the Crop between 1950-2020
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
            style={{
              textAlign: "center",
            }}
          >
            {row2}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}

export default Table2;
