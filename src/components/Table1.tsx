import React, { useMemo } from "react";
import { DataType } from "../../types/DataType";
import dataJson from "../../data/a.json";
import { Table } from "@mantine/core";



function Table1() {
  const aggregatedData1 = useMemo(() => {
    const groupedByYear: { [key: string]: DataType[] } = {};

    // Clean Year field and group data by Year
    (dataJson as DataType[]).forEach((item) => {
      const cleanYear = item.Year.replace("Financial Year (Apr - Mar), ", "");
      if (!groupedByYear[cleanYear]) {
        groupedByYear[cleanYear] = [];
      }

      groupedByYear[cleanYear].push({
        ...item,
        "Crop Production (UOM:t(Tonnes))":
          item["Crop Production (UOM:t(Tonnes))"] || 0,
      });
    });

    // console.log('groupedByYear', groupedByYear);

    // Create aggregated data
    return Object.keys(groupedByYear).map((year) => {
      const crops = groupedByYear[year];

      // console.log("crops", crops);

      // Calculate both max and min production crops in a single iteration
      let maxProductionCrop = crops[0];
      let minProductionCrop = crops[0];

      crops.forEach((crop) => {
        const production = crop["Crop Production (UOM:t(Tonnes))"];
        if (production > maxProductionCrop["Crop Production (UOM:t(Tonnes))"]) {
          maxProductionCrop = crop;
        }
        if (production < minProductionCrop["Crop Production (UOM:t(Tonnes))"]) {
          minProductionCrop = crop;
        }
      });

      return {
        Year: year,
        MaxProductionCrop: maxProductionCrop["Crop Name"],
        MinProductionCrop: minProductionCrop["Crop Name"],
      };
    });
  }, [dataJson]);

  const row1 = aggregatedData1.map((item) => (
    <Table.Tr key={item.Year}>
      <Table.Td>{item.Year}</Table.Td>
      <Table.Td>{item.MaxProductionCrop}</Table.Td>
      <Table.Td>{item.MinProductionCrop}</Table.Td>
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
          {" "}
          Table-1: Crop with Maximum/Minimum
          Production in that Year
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
                Year
              </Table.Th>
              <Table.Th
                style={{
                  textAlign: "center",
                }}
              >
                Crop with Maximum
                Production in that Year
              </Table.Th>
              <Table.Th
                style={{
                  textAlign: "center",
                }}
              >
                Crop with Minimum
                Production in that Year
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody
            style={{
              textAlign: "center",
            }}
          >
            {row1}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}

export default Table1;
