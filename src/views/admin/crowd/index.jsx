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
  const [respo, setRespo] = React.useState({
    alert: true,
    predictions: "with_mask",
    detail: "Crowd",
  });
  const MINUTE_MS = 6000;

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        console.log("🚀 ~ file: index.js ~ line 84 ~ .then ~ file", file);
        setSelectedFile(file);
        handleSubmit();
      });
  }, [webcamRef]);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/v1.0/crowd/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRespo({
        alert: true,
        predictions: "with_mask",
        detail: "Not wearing a mask!",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
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
                {respo.detail}
              </Text>
            </Flex>
          </Flex>
          <WeeklyRevenue />
        </Flex>
      </Grid>
    </Box>
  );
}
