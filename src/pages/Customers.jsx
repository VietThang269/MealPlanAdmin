import {
  createStyles,
  Flex,
  Pagination,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestGetCustomers,
  selectDataCustomer,
} from "../features/customer/customerSlice";

const Customers = () => {
  const { classes } = makeStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestGetCustomers());
  }, []);

  return (
    <Stack>
      <Text className={classes.title}>Customers</Text>
      <SearchCustomer />
      <ListCustomers />
    </Stack>
  );
};

const SearchCustomer = () => {
  const { classes } = makeStyles();

  return (
    <Flex className={classes.flex}>
      <TextInput placeholder="Search..." className={classes.input} />
    </Flex>
  );
};

const ListCustomers = () => {
  const listData = useSelector(selectDataCustomer);

  const ths = (
    <tr>
      <th>ID</th>
      <th>EMAIL</th>
      <th>ACTION</th>
    </tr>
  );

  const rows = listData?.map((element) => (
    <tr key={element._id}>
      <td>{element._id}</td>
      <td>{element.email}</td>
      <td>{element.action}</td>
    </tr>
  ));

  return (
    <Stack>
      <Table captionSide="bottom" withBorder>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 700,
  },

  flex: {
    border: "1px solid #e5e7eb",
    padding: 40,
    borderRadius: 15,
  },

  input: {
    width: "100%",
  },
}));

export default Customers;
