import {
  Badge,
  Box,
  Button,
  createStyles,
  Flex,
  Image,
  Modal,
  Pagination,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestGetOrders,
  selectDataOrder,
} from "../features/order/orderSlice";
import IconDetail from "../assets/icons/IconDetail";
import { apiGet } from "../utils/https/request";

import Logo from "../assets/imgs/Logo.png";

const Orders = () => {
  const { classes } = makeStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestGetOrders());
  }, []);

  return (
    <Stack>
      <Text className={classes.title}>Orders</Text>
      <FilterOrder />
      <ListOrders />
    </Stack>
  );
};

const FilterOrder = () => {
  const { classes } = makeStyles();

  return (
    <Flex className={classes.flexFilter}>
      <Box className={classes.box}>
        <TextInput placeholder="Search..." />
      </Box>
      <Box className={classes.box}>
        <Select
          placeholder="Status"
          data={[
            { value: "react", label: "React" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
        />
      </Box>
      <Box className={classes.box}>
        <Select
          placeholder="Order limit"
          data={[
            { value: "react", label: "React" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
        />
      </Box>
      <Box className={classes.box}>
        <Button className={classes.button}>Dowload all Orders</Button>
      </Box>
    </Flex>
  );
};

export const ListOrders = () => {
  const listData = useSelector(selectDataOrder);
  const [data, setData] = useState([]);
  const [item, setItem] = useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (listData.length > 0) {
      const newData = listData?.map((item, _) => ({
        ...item,
        method: "COD",
        status: <Badge color="yellow">Pending</Badge>,
        action: (
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => handleDetail(item._id)}
          >
            <IconDetail />
          </Box>
        ),
      }));

      setData(newData);
    }
  }, [listData]);

  function handleDetail(id) {
    const newData = listData.find((item, _) => item._id === id);
    setItem(newData);
    setOpened(true);
  }

  const ths = (
    <tr>
      <th>ID</th>
      <th>SHIPPING ADDRESS</th>
      <th>METHOD</th>
      <th>AMOUNT</th>
      <th>STATUS</th>
      <th>ACTION</th>
    </tr>
  );

  const rows = data?.map((element) => (
    <tr key={element._id}>
      <td>{element._id}</td>
      <td>{element.address}</td>
      <td>{element.method}</td>
      <td>{element.total.toFixed(2)}</td>
      <td>{element.status}</td>
      <td>{element.action}</td>
    </tr>
  ));
  return (
    <Stack>
      <Table captionSide="bottom" withBorder>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
      <ModalOrderDetail data={item} opened={opened} setOpened={setOpened} />
    </Stack>
  );
};

const ModalOrderDetail = ({ data, opened, setOpened }) => {
  function calcTotal(data) {
    if (data) {
      const listTotal = data.list?.map((item, _) => item.price * item.quanity);
      const total = listTotal.reduce((a, b) => a + b);

      return total;
    }
    return 0;
  }

  return (
    <Modal centered size={800} opened={opened} onClose={() => setOpened(false)}>
      <Flex gap={20}>
        <Stack
          sx={{
            flex: 1,
          }}
        >
          <Text
            align="center"
            sx={{
              fontWeight: "bold",
              fontSize: 32,
            }}
          >
            Order
          </Text>
          {data?.list.map((item, index) => (
            <ItemOrderDetail data={item} key={index} />
          ))}
          <Text>
            Total:{" "}
            <Text display="inline" fw="bold">
              ${calcTotal(data)}
            </Text>
          </Text>
        </Stack>

        <Stack
          sx={{
            flex: 1,
          }}
          align="center"
        >
          <Box>
            <Image src={Logo} width={75} />
          </Box>
          <Stack w="100%" spacing={0}>
            <Text fw="bold">
              Customer name:{" "}
              <Text display="inline" fw="normal">
                Thắng nè
              </Text>
            </Text>
          </Stack>
          <Stack w="100%" spacing={0}>
            <Text fw="bold">
              Address:{" "}
              <Text display="inline" fw="normal">
                {data?.address}
              </Text>
            </Text>
          </Stack>
          <Stack w="100%" spacing={0}>
            <Text fw="bold">
              Status:{" "}
              <Text display="inline" fw="normal">
                Pending
              </Text>
            </Text>
          </Stack>
          <Button w="100%">Checkout</Button>
        </Stack>
      </Flex>
    </Modal>
  );
};

const ItemOrderDetail = ({ data }) => {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const getDataProduct = async () => {
      const response = await apiGet(`product/${data?.id}`, {});
      setProduct(response.data);
    };

    getDataProduct();
  }, [data]);

  return (
    <Stack
      sx={{
        borderBottom: "1px solid #ccc",
      }}
    >
      <Flex gap={10}>
        <Box
          style={{
            width: 75,
            height: 75,
          }}
        >
          <Image src={product?.image} />
        </Box>

        <Stack>
          <Text>{product?.name}</Text>
          <Text>
            Quanity:{" "}
            <Text display="inline" fw="bold">
              {data?.quanity}
            </Text>
          </Text>
        </Stack>
      </Flex>
      <Text align="end" fw="bold">
        ${data?.quanity * data?.price}
      </Text>
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  box: {
    flex: 1,
  },

  flexFilter: {
    alignItems: "center",
    justifyContent: "spact-between",
    gap: 10,
    border: "1px solid #e5e7eb",
    padding: 40,
    borderRadius: 15,
  },

  button: {
    width: "100%",
  },
}));

export default Orders;
