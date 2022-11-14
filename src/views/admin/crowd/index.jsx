import React, { useEffect } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import WeeklyRevenue from "views/admin/crowd/components/WeeklyRevenue";
import Webcam from "react-webcam";
export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [crowd, setCrowd] = React.useState(null);
  const [respo, setRespo] = React.useState({
    crowd_count: 0,
  });
  const MINUTE_MS = 6000;

  useEffect(() => {
    getForcast();
    const interval = setInterval(() => {
      capture();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);
  const getForcast = () => {
    axios
      .get(
        "http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/crowd-forecast"
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        console.log("🚀 ~ file: index.js ~ line 84 ~ .then ~ file", file);
        setSelectedFile(file);
        handleSubmission(file);
      });
  }, [webcamRef]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const handleSubmission = (file) => {
    const formData = new FormData();

    formData.append("image", file);
    // formData.append("image", selectedFile);

    axios
      .post(
        "http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/crowd/",
        formData
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setRespo(res.data.detail);
      });
  };
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={780}
            videoConstraints={videoConstraints}
          />

          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                crowd count {respo.crowd_count}
              </Text>
            </Flex>
          </Flex>
          {/* <ReactApexChart
            options={this.state.chartOptions}
            series={this.state.chartData}
            type="line"
            width="100%"
            height="100%"
          /> */}
          <WeeklyRevenue />
        </Flex>
      </Grid>
    </Box>
  );
}
