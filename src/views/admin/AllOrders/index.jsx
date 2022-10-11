import React, { useEffect,useState } from "react";

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
import HistoryItem from "views/admin/AllOrders/components/HistoryItem";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [respo, setRespo] = React.useState([
    {
      id: 1,
      name: "Active classic boxers",
      description:
        'There\'s a reason why our boxers are a cult favorite - they keep their cool, especially in sticky situations. The quick-drying, lightweight underwear takes up minimal space in a travel pack. An exposed, brushed waistband offers next-to-skin softness, five-panel construction with a traditional boxer back for a classic fit, and a functional fly. Made of 3.7-oz 100% recycled polyester with moisture-wicking performance. Inseam (size M) is 4 1/2". Recyclable through the Common Threads Recycling Program.<br><br><b>Details:</b><ul> <li>"Silky Capilene 1 fabric is ultralight, breathable and quick-to-dry"</li> <li>"Exposed, brushed elastic waistband for comfort"</li> <li>5-panel construction with traditional boxer back</li> <li>"Inseam (size M) is 4 1/2"""</li></ul><br><br><b>Fabric: </b>3.7-oz 100% all-recycled polyester with Gladiodor natural odor control for the garment. Recyclable through the Common Threads Recycling Program<br><br><b>Weight: </b>99 g (3.5 oz)<br><br>Made in Mexico.',
      price: "20.00",
      quantity: 50,
      discount: 0,
      loyalty_points: 1,
      shelf: 1,
    },
    {
      id: 2,
      name: "Active sport boxer briefs",
      description:
        'Skinning up Glory requires enough movement without your boxers deciding to poach their own route. The form-fitting Active Sport Boxer Briefs are made from breathable 93% polyester (71% recycled) fabric that\'s fast-wicking, dries quickly and has 7% spandex for stretch; the seamless waistband and soft leg edges won\'t roll or bind. The gusseted, flat-sewn 6" inseam (size M) is offset to prevent inner-thigh chafe. Fly-free with a smooth front panel. Recyclable through the Common Threads Recycling Program.<br><br><b>Details:</b><ul> <li>"Stretch mesh provides support, open-weave mesh for airflow, wicks efficiently, dries fast"</li> <li>Seamless construction</li> <li>"Flat-sewn, gusseted inseam is set forward to prevent inner-thigh chafe"</li> <li>Fly-free support</li> <li>"Inseam (size M) is 6"""</li></ul><br><br><b>Fabric: </b>"4.6-oz 93% polyester (71% recycled)/7% spandex, with moisture-wicking performance. Recyclable through the Common Threads Recycling Program"<br><br><b>Weight: </b>(60 g 2.1 oz)<br><br>Made in Israel.',
      price: "30.00",
      quantity: 20,
      discount: 0,
      loyalty_points: 0,
      shelf: 1,
    },
    {
      id: 3,
      name: "Alpine guide pants",
      description:
        'Skin in, climb ice, switch to rock, traverse a knife-edge ridge and boogie back down - these durable, weather-resistant and breathable soft-shell pants keep stride on every mountain endeavor. The midweight stretch-woven polyester won\'t restrict your moves, and the brushed interior maintains next-to-skin comfort. A 2-way zippered fly keeps things easy with a harness on, and the gusseted, zippered cuffs have 2-position snaps and tie-down loops. With water-resistant zippered pockets: two front, two thigh, one back hip. Recyclable through the Common Threads Recycling Program.<br><br><b>Details:</b><ul> <li>Durable stretch-woven polyester (47% recycled) with DWR (durable water repellent) finish is water- and wind-resistant and highly breathable</li> <li>Brushed interior for next-to-skin comfort</li> <li>Waistband has belt loops and elastic on back</li> <li>2-way zippered fly</li> <li>"External pockets: two front slash, two glued-on thigh, one back hip - all with highly water-resistant, DWR-finished zippers"</li> <li>"Gusseted, zippered cuff with 2-position adjustable settings and tie-down loops"</li></ul><br><br><b>Fabric: </b>"7.6-oz 90-denier 92% polyester (47% recycled)/8% spandex, with Deluge DWR finish. Recyclable through the Common Threads Recycling Program"<br><br><b>Weight: </b>(597 g 20.7 oz)<br><br>Made in Vietnam.',
      price: "40.00",
      quantity: 70,
      discount: 0,
      loyalty_points: 0,
      shelf: 1,
    },
    {
      id: 4,
      name: "Active classic boxers",
      description:
        'THIS ONE There\'s a reason why our boxers are a cult favorite - they keep their cool, especially in sticky situations. The quick-drying, lightweight underwear takes up minimal space in a travel pack. An exposed, brushed waistband offers next-to-skin softness, five-panel construction with a traditional boxer back for a classic fit, and a functional fly. Made of 3.7-oz 100% recycled polyester with moisture-wicking performance. Inseam (size M) is 4 1/2". Recyclable through the Common Threads Recycling Program.<br><br><b>Details:</b><ul> <li>"Silky Capilene 1 fabric is ultralight, breathable and quick-to-dry"</li> <li>"Exposed, brushed elastic waistband for comfort"</li> <li>5-panel construction with traditional boxer back</li> <li>"Inseam (size M) is 4 1/2"""</li></ul><br><br><b>Fabric: </b>3.7-oz 100% all-recycled polyester with Gladiodor natural odor control for the garment. Recyclable through the Common Threads Recycling Program<br><br><b>Weight: </b>99 g (3.5 oz)<br><br>Made in Mexico.',
      price: "12.00",
      quantity: 24,
      discount: 0,
      loyalty_points: 0,
      shelf: 1,
    },
  ]);
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
  const [imgfile, uploadimg] = useState([])
  	console.log("Image FIles",imgfile);
  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      uploadimg(imgfile => [...imgfile, URL.createObjectURL(e.target.files[0])])
    }
  }
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
  const addOrder = async (id) => {
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("quantity", 4);
    try {
      const response = await axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/v1.0/order/${id}/`,
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
          {respo.map((text) => (
            <Flex>
              <Button
                mt="10px"
                onClick={() => {
                  addOrder(text.id);
                }}
                fontSize="sm"
                fontWeight="500"
                color="green"
                borderRadius="7px"
              >
                Add Product to Order
              </Button>
              <HistoryItem name={text.name} date={text.price} />
            </Flex>
          ))}
        </Flex>
      </Grid>
    </Box>
  );
}
