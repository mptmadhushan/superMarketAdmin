import React, { useEffect, useState } from "react";

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
import swal from "sweetalert";
export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [respo, setRespo] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [discount, setDiscount] = React.useState([]);
  const MINUTE_MS = 6000;

  useEffect(() => {
    getProducts();
  }, []);
  const getOrders = () => {
    axios
      .get(
        "http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/order/1/"
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setOrders(res.data.detail.product);
      });
  };
  const getDiscount = () => {
    axios
      .get(
        "http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/discount/1/"
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        swal("loyalty discoun!", "added successfuly", "success");
        setDiscount(res.data);
      });
  };
  const getProducts = () => {
    axios
      .get(
        "http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/product"
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setRespo(res.data);
      });
  };
  const addOrder = async (id) => {
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("quantity", 4);
    try {
      const response = await axios({
        method: "post",
        url: `http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/order/1/`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("response", response);
      swal("Product added!", "added successfuly", "success");
      getOrders();
    } catch (error) {
      console.log(error);
    }
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
              {respo && (
                <Text
                  color={textColor}
                  fontSize="2xl"
                  ms="24px"
                  fontWeight="700"
                >
                  {respo.detail}
                </Text>
              )}
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
          {orders.length > 0 && <h1>Order Details</h1>}
          {orders.map((text) => (
            <Flex>
              <HistoryItem name={text.name} date={text.price} />
            </Flex>
          ))}
          {orders.length > 0 && (
            <Button
              mt="10px"
              onClick={() => {
                getDiscount();
              }}
              fontSize="sm"
              fontWeight="500"
              color="green"
              borderRadius="7px"
            >
              Get Discount
            </Button>
          )}
          {discount.loyalty_discount && (
            <p>loyalty discount: {discount.loyalty_discount}</p>
          )}
        </Flex>
      </Grid>
    </Box>
  );
}
