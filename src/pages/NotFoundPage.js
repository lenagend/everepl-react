import Box from "@mui/material/Box";
import {CardContent, Container, Typography} from "@mui/joy";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";

export default function NotFoundPage() {
    return(
      <Box>
          <Container maxWidth="md">
              <Stack spacing={2} sx={{height: '100vh'}} justifyContent="center">
                  <Card>
                      <CardContent>
                          <Typography level="h1">
                              페이지를 찾을 수 없습니다.
                          </Typography>
                          <Typography level="body-lg">
                              잠시 후 홈페이지로 이동합니다...
                          </Typography>
                      </CardContent>
                  </Card>
              </Stack>
          </Container>
      </Box>
    );
}