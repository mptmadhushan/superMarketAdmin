import React, { useEffect, useState } from "react";
import Card from "components/card/Card.js";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
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
  const [id, setId] = React.useState([]);
  const [association, setAsso] = React.useState({});
  const [discount, setDiscount] = React.useState([]);
  const [qty, setQty] = React.useState("");
  const MINUTE_MS = 6000;
  const textColorDate = useColorModeValue("secondaryGray.600", "white");
  useEffect(() => {
    getAssociation();
    const items = JSON.parse(localStorage.getItem("rememberMe"));
    if (items) {
      console.log("🚀 ~ rememberMe", items);
      setId(items);
    }
  }, []);
  const getOrders = () => {
    axios
      .get(
        `http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/order/1/`
        // `http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/order/${id}/`
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
        `http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/discount/1/`
        // `http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/discount/${id}/`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        swal(
          "loyalty discount!",
          `Amount : ${res.data.loyalty_discount}`,
          "success"
        );
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
  const getAssociation = () => {
    axios
      .get(
        "http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/association-rules"
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.product_selling_counts);
        setAsso(res.data);
      });
  };
  const addOrder = async (id) => {
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("quantity", qty);
    try {
      const response = await axios({
        method: "post",
        url: `http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/order/1/`,
        // url: `http://ec2-54-242-87-59.compute-1.amazonaws.com:8000/api/v1.0/order/${id}/`,
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
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        // gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <div>
          {association && (
            <div>
              <Flex>
                {/* <HistoryItem name={text.name} date={text.price} /> */}
                <Card
                  _hover={bgItem}
                  bg="transparent"
                  boxShadow="unset"
                  px="24px"
                  py="21px"
                  transition="0.2s linear"
                >
                  {association && (
                    <Flex direction={{ base: "column" }} justify="center">
                      <Flex position="relative" align="center">
                        <Flex
                          direction="row"
                          w={{ base: "100%", md: "100%" }}
                          me={{}}
                        >
                          <div>
                            {association.detail && (
                              <Text
                                color={textColor}
                                fontSize={{
                                  base: "md",
                                }}
                                mb="5px"
                                fontWeight="bold"
                                me="14px"
                              >
                                Antecedents
                              </Text>
                            )}
                            {association.detail?.antecedents.map((text) => (
                              <Text
                                color="secondaryGray.600"
                                fontSize={{
                                  base: "sm",
                                }}
                                ml="5px"
                                fontWeight="400"
                                me="4px"
                              >
                                {text}
                              </Text>
                            ))}
                          </div>{" "}
                          <div>
                            {association.detail && (
                              <Text
                                color={textColor}
                                fontSize={{
                                  base: "md",
                                }}
                                mb="5px"
                                fontWeight="bold"
                                me="14px"
                              >
                                confidence
                              </Text>
                            )}
                            {association.detail?.confidence.map((text) => (
                              <Text
                                color="secondaryGray.600"
                                fontSize={{
                                  base: "sm",
                                }}
                                ml="5px"
                                fontWeight="400"
                                me="14px"
                              >
                                {text}
                              </Text>
                            ))}
                          </div>
                          <div>
                            {association.detail && (
                              <Text
                                color={textColor}
                                fontSize={{
                                  base: "md",
                                }}
                                mb="5px"
                                fontWeight="bold"
                                me="14px"
                              >
                                consequent
                              </Text>
                            )}
                            {association.detail?.consequents.map((text) => (
                              <Text
                                color="secondaryGray.600"
                                fontSize={{
                                  base: "sm",
                                }}
                                ml="5px"
                                fontWeight="400"
                                me="14px"
                              >
                                {text}
                              </Text>
                            ))}
                          </div>
                          <div>
                            {association.detail && (
                              <Text
                                color={textColor}
                                fontSize={{
                                  base: "md",
                                }}
                                mb="5px"
                                fontWeight="bold"
                                me="14px"
                              >
                                lift
                              </Text>
                            )}
                            {association.detail?.lift.map((text) => (
                              <Text
                                color="secondaryGray.600"
                                fontSize={{
                                  base: "sm",
                                }}
                                ml="5px"
                                fontWeight="400"
                                me="14px"
                              >
                                {text}
                              </Text>
                            ))}
                          </div>
                          <div>
                            {association.detail && (
                              <Text
                                color={textColor}
                                fontSize={{
                                  base: "md",
                                }}
                                mb="5px"
                                fontWeight="bold"
                                me="14px"
                              >
                                support
                              </Text>
                            )}
                            {association.detail?.support.map((text) => (
                              <Text
                                color="secondaryGray.600"
                                fontSize={{
                                  base: "sm",
                                }}
                                ml="5px"
                                fontWeight="400"
                                me="14px"
                              >
                                {text}
                              </Text>
                            ))}
                          </div>
                        </Flex>
                      </Flex>
                    </Flex>
                  )}
                </Card>
              </Flex>
            </div>
          )}
        </div>
      </Grid>
    </Box>
  );
}
