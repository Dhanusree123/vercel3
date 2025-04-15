// import Chart from 'react-apexcharts';
import { useTheme } from "@emotion/react";

import type { Theme } from "@mui/material";
import { Card, Stack, Typography, CardContent } from "@mui/material";
import { IPriceHistory } from "../../types/product";
import { currencyFormatter } from "../../utils/common";
import Chart from "react-apexcharts";

type Props = {
  data: IPriceHistory[];
};

const PriceHistory = (props: Props) => {
  const { data } = props;

  const theme = useTheme() as Theme;
  const themeMode = theme.palette.mode;

  const fullDates = data.map((item) =>
    new Date(item.date).toLocaleDateString()
  );
  const dealPrices = data.map((item) => item.dealPrice);
  const listPrices = data.map((item) => item.listPrice);
  const mrps = data.map((item) => item.mrp);
  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={1}>
          <Typography variant="h5">Price History</Typography>
          {data.length ? (
            <Chart
              type="area"
              width="100%"
              height="320"
              series={[
                {
                  name: "Deal Price",
                  data: dealPrices,
                  color: "#ff333d",
                },
                {
                  name: "List Price",
                  data: listPrices,
                  color: "#3f33ff",
                },
                {
                  name: "MRP",
                  data: mrps,
                  color: "#73ff33",
                },
              ]}
              options={{
                theme: {
                  mode: themeMode,
                },
                chart: {
                  background: "transparent",
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  categories: data.map((item) =>
                    new Date(item.date).toLocaleString("default", {
                      month: "short",
                    })
                  ),
                  title: {
                    text: "Date",
                  },
                },
                yaxis: {
                  title: {
                    text: "Price",
                  },
                  labels: {
                    formatter: (value) => {
                      return currencyFormatter.format(value);
                    },
                  },
                },
                stroke: {
                  curve: "smooth",
                },
                dataLabels: {
                  enabled: false,
                },
                tooltip: {
                  x: {
                    formatter: (_value, { dataPointIndex }) =>
                      fullDates[dataPointIndex],
                  },
                },
              }}
            />
          ) : (
            <Typography sx={{ opacity: 0.3 }}>
              Price History not found.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PriceHistory;
