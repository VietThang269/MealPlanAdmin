import {
  createStyles,
  Flex,
  Pagination,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";

const Customers = () => {
  const { classes } = makeStyles();

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
  const elements = [
    { id: 1, join: "04/04/2023", email: "thangvui2002@gmail.com", action: "" },
    { id: 2, join: "04/04/2023", email: "thangvui2002@gmail.com", action: "" },
    { id: 3, join: "04/04/2023", email: "thangvui2002@gmail.com", action: "" },
    { id: 4, join: "04/04/2023", email: "thangvui2002@gmail.com", action: "" },
  ];
  const ths = (
    <tr>
      <th>ID</th>
      <th>JOINING DATE</th>
      <th>EMAIL</th>
      <th>ACTION</th>
    </tr>
  );

  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.join}</td>
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

      <Pagination total={10} />
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
