import React, { useEffect } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Input,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

import Webcam from "react-webcam";
import HistoryItem from "views/admin/behavior/components/HistoryItem";
import Card from "components/card/Card.js";

export default function Marketplace() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [respo, setRespo] = React.useState({
    incident: true,
    top_3_predictions: ["none", "none", "none"],
    detail: {
      id: 7,
      type: "none",
      media_file: "/media/uploads/1243dcv_Td0RdMp.PNG",
      date_time: "2022-10-09",
      camera_id: 1,
    },
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
        const file = new File([blob], "Filename", { type: "image/png" });
        console.log("🚀 ~ file: index.js ~ line 84 ~ .then ~ file", file);
        setSelectedFile(file);
        handleSubmission(file);
      });
  }, [webcamRef]);
  const handleSubmission = (file) => {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("camera_id", 1);

    axios
      .post(
        "http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/fraud-prediction/",
        formData
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setRespo(res.data);
      });
  };
  const handleSubmissionVideo = () => {
    const formData = new FormData();

    formData.append("camera_id ", 1);
    formData.append("video", selectedFile);

    axios
      .post(
        "http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/fraud-prediction-by-video/",
        formData
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setRespo(res.data);
      });
  };
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
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
          <Input
            type="file"
            mt="15px"
            mb="10px"
            variant="auth"
            pa="20px"
            name="file"
            onChange={changeHandler}
          />
          <Button onClick={handleSubmissionVideo}>Submit</Button>
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Behavior : {respo.detail.type}
              </Text>
            </Flex>
          </Flex>
          <Card p="0px">
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="space-between"
              w="100%"
              px="22px"
              py="18px"
            >
              <Text color={textColor} fontSize="xl" fontWeight="600">
                Top Predictions
              </Text>
              <Button variant="action">See all</Button>
            </Flex>
            {respo.top_3_predictions.map((text) => (
              <HistoryItem name={text} date="30s ago" />
            ))}
          </Card>
        </Flex>
      </Grid>
    </Box>
  );
}
