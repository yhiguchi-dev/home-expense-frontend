import { Link } from "@chakra-ui/next-js";
import { Box, Container, List, ListItem, Stack } from "@chakra-ui/react";
import React from "react";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Container bg="gray.100" maxWidth="container.lg">
      <Box padding={4}>
        <Stack direction="row">
          <Box
            bg="white"
            rounded="2xl"
            shadow="base"
            width="sm"
            height="100vh"
            padding={4}
          >
            <List spacing={4}>
              <ListItem>
                <Link href="/home">Home</Link>
              </ListItem>
              <ListItem>
                <Link href="/home/attribute">経費属性</Link>
              </ListItem>
              <ListItem>
                <Link href="/home/expense">経費</Link>
              </ListItem>
            </List>
          </Box>
          <Box width={`calc(100vw - 480px)`}>{children}</Box>
        </Stack>
      </Box>
    </Container>
  );
};
export default DashboardLayout;
