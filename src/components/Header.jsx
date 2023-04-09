import React, { useState } from "react";
import {
  Avatar,
  Burger,
  createStyles,
  Flex,
  Header as HeaderMantine,
  MediaQuery,
  Text,
} from "@mantine/core";

const Header = ({ opened, setOpened }) => {
  const { classes } = makeStyles();
  return (
    <HeaderMantine height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color="gray"
            mr="xl"
          />
        </MediaQuery>
        <Flex className={classes.flex}>
          <Text className={classes.logo}>Meal Plans</Text>
          <Avatar size="md" />
        </Flex>
      </div>
    </HeaderMantine>
  );
};

const makeStyles = createStyles((theme) => ({
  logo: {
    fontWeight: 600,
  },
  flex: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default Header;
