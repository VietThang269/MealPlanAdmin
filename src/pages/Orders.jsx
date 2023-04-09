import {
  Badge,
  Box,
  Button,
  createStyles,
  Flex,
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

  useEffect(() => {
    if (listData.length > 0) {
      const newData = listData?.map((item, _) => ({
        ...item,
        method: "COD",
        status: <Badge color="yellow">Pending</Badge>,
        action: "",
      }));

      setData(newData);
    }
  }, [listData]);

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

      <Pagination total={10} />
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
