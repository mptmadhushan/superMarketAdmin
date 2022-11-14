import React, { useEffect, useState } from "react";
import Card from "components/card/Card.js";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Input,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import logoWhite from "assets/Capturesss.PNG";
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
        const newData = [
          {
            index: 1234,
            antecedents: "frozenset({'yogurt', 'sausage'})",
            consequents: "frozenset({'whole milk'})",
            "antecedent support": 0.005747510525964045,
            "consequent support": 0.15792287642852368,
            support: 0.0014702933903628951,
            confidence: 0.2558139534883721,
            lift: 1.6198663504217148,
            leverage: 0.0005626299957994361,
            conviction: 1.1315411347991713,
          },
          {
            index: 1210,
            antecedents: "frozenset({'sausage', 'rolls/buns'})",
            consequents: "frozenset({'whole milk'})",
            "antecedent support": 0.005346521419501437,
            "consequent support": 0.15792287642852368,
            support: 0.0011361358016440553,
            confidence: 0.2125,
            lift: 1.345593525179856,
            leverage: 0.0002917977601896749,
            conviction: 1.0693042839002875,
          },
          {
            index: 1228,
            antecedents: "frozenset({'sausage', 'soda'})",
            consequents: "frozenset({'whole milk'})",
            "antecedent support": 0.005948005079195348,
            "consequent support": 0.15792287642852368,
            support: 0.0010693042839002875,
            confidence: 0.17977528089887643,
            lift: 1.138373901011379,
            leverage: 0.0001299782127822893,
            conviction: 1.0266419725734437,
          },
        ];
        console.log(res.data.product_selling_counts);
        setAsso(newData);
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
          <Image
            src={logoWhite}
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            borderRadius="20px"
          />
        </div>
      </Grid>
    </Box>
  );
}
