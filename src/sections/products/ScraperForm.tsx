import { z } from "zod";
import { toast } from "sonner";
import { useState, useEffect } from "react";

import {
  Box,
  Card,
  Stack,
  TextField,
  CardHeader,
  CardContent,
  Button,
} from "@mui/material";
import { IProduct } from "../../types/product";
import { getASIN } from "../../utils/common";
import axios from "axios";
import { SCRAPER } from "../../graphql/scraper";

type Props = {
  onSubmit: (data: IProduct) => void;
  code?: string;
};

const ScraperForm = (props: Props) => {
  const { onSubmit, code } = props;

  const [url, setUrl] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidUrl = z.string().url().safeParse(url).success;
    if (!isValidUrl) {
      toast.error("Invalid URL. Please enter a valid URL.");
      return;
    }
    const asin = getASIN(url);
    const formattedUrl = `https://amazon.in/dp/${asin}`;
    setUrl(formattedUrl);
    try {
      const AUTH_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3Mzk1MzA5MzYsImV4cCI6MTc0MjEyMjkzNn0.pnrMXu8cptj_kyztPyYfzwB_urRj91Xy1Ns2oZpn6zg";
      const res = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: SCRAPER,
          variables: { url },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );

      const scrapedData = res.data?.data.scraper;
      console.log(scrapedData);
      onSubmit(scrapedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (code) {
      setUrl(`https://amazon.in/dp/${code}`);
    }
  }, [code]);

  return (
    <Box>
      <Card>
        <CardHeader title="Product URL" />
        <CardContent>
          <Stack
            component="form"
            onSubmit={handleSubmit}
            direction="row"
            spacing={2}
          >
            <TextField
              name="productURL"
              label="Product URL"
              fullWidth
              placeholder="https://example.com/product"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <Button type="submit" variant="contained">
              Fetch
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ScraperForm;
