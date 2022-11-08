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
    getProducts();
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
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <div>
          <Button
            mt="82px"
            onClick={() => {
              getAssociation();
            }}
            fontSize="sm"
            fontWeight="500"
            variant="brand"
            borderRadius="7px"
          >
            Association Rules
          </Button>
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
                          direction="column"
                          w={{ base: "90%", md: "100%" }}
                          me={{
                            base: "4px",
                            md: "32px",
                            xl: "10px",
                            "3xl": "32px",
                          }}
                        >
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
                              me="14px"
                            >
                              - {text}
                            </Text>
                          ))}
                          {/* <Flex
                            direction="row"
                            w={{ base: "90%", md: "100%" }}
                            me={{
                              base: "4px",
                              md: "32px",
                              xl: "10px",
                              "3xl": "32px",
                            }}
                          >
                            {association.detail?.antecedents.map((text) => (
                              <Text
                                color="secondaryGray.600"
                                fontSize={{
                                  base: "sm",
                                }}
                                ml="5px"
                                fontWeight="400"
                                me="14px"
                              >
                                - {text}
                              </Text>
                            ))}
                            {association.product_selling_counts?.count.map(
                              (text) => (
                                <Text
                                  color="secondaryGray.600"
                                  fontSize={{
                                    base: "sm",
                                  }}
                                  ml="5px"
                                  fontWeight="400"
                                  me="14px"
                                >
                                  - {text}
                                </Text>
                              )
                            )}
                          </Flex> */}
                        </Flex>
                      </Flex>
                
                    </Flex>
                  )}
                </Card>
              </Flex>
            </div>
          )}
        </div>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Flex direction="row">
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
              <HistoryItem
                name={text.name}
                author={text.loyalty_points}
                date={text.price}
              />
              <Input
                isRequired={true}
                fontSize="sm"
                mt="22px"
                type="number"
                onChange={(e) => setQty(e.target.value)}
                placeholder="quantity"
                width="20%"
                fontWeight="500"
                size="sm"
              />
              <Button
                mt="18px"
                ml="18px"
                onClick={() => {
                  addOrder(text.id);
                }}
                fontSize="sm"
                w="50%"
                variant="brand"
                fontWeight="500"
                borderRadius="7px"
              >
                Add Product
              </Button>
            </Flex>
          ))}
          {orders.length > 0 && (
            <Text
              color={textColor}
              fontSize={{
                base: "xl",
              }}
              mb="5px"
              fontWeight="bold"
              me="24px"
            >
              Order Details
            </Text>
          )}
          {orders.map((text) => (
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
                <Flex direction={{ base: "column" }} justify="center">
                  <Flex position="relative" align="center">
                    <Flex
                      direction="column"
                      w={{ base: "90%", md: "100%" }}
                      me={{
                        base: "4px",
                        md: "32px",
                        xl: "10px",
                        "3xl": "32px",
                      }}
                    >
                      <Text
                        color={textColor}
                        fontSize={{
                          base: "md",
                        }}
                        mb="5px"
                        fontWeight="bold"
                        me="14px"
                      >
                        {text.name}
                      </Text>

                      <div
                        dangerouslySetInnerHTML={{ __html: text.description }}
                      />
                    </Flex>
                  </Flex>
                  <Flex position="relative" align="center">
                    <Flex
                      direction="column"
                      w={{ base: "90%", md: "100%" }}
                      me={{
                        base: "4px",
                        md: "32px",
                        xl: "10px",
                        "3xl": "32px",
                      }}
                    >
                      <Text
                        color={textColor}
                        fontSize={{
                          base: "md",
                        }}
                        mb="5px"
                        fontWeight="bold"
                        me="14px"
                      >
                        loyalty points : {text.loyalty_points}
                      </Text>{" "}
                      <Text
                        color={textColor}
                        fontSize={{
                          base: "md",
                        }}
                        mb="5px"
                        fontWeight="bold"
                        me="14px"
                      >
                        Price :{text.price}
                      </Text>
                      <Text
                        color={textColor}
                        fontSize={{
                          base: "md",
                        }}
                        mb="5px"
                        fontWeight="bold"
                        me="14px"
                      >
                        Discount :{text.price}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
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
              variant="brand"
              borderRadius="7px"
            >
              Get Discount
            </Button>
          )}
          {discount.loyalty_discount && (
            <Text
              color={textColor}
              fontSize={{
                base: "xl",
              }}
              mb="5px"
              mt="15px"
              ml="50px"
              fontWeight="bold"
              me="24px"
            >
              loyalty discount: {discount.loyalty_discount}
            </Text>
          )}
        </Flex>
      </Grid>
    </Box>
  );
}
