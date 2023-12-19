import {Box, Container, Divider, Grid} from "@mui/joy";
import UrlCardContent from "../components/url/UrlCardContent";
import UserCard from "../components/user/UserCard";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CommentCardContent from "../components/comments/CommentCardContent";
import * as React from "react";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import UrlConsole from "../components/url/UrlConsole";

const HomePage = () => {
    return(
        <Box>
            <Container maxWidth="md">
                <UserCard/>
                <UrlConsole/>
                <Card sx={{p: 0, mt: 2}}>
                    <CardOverflow
                        variant="soft"
                        color="primary"
                        sx={{
                            px: 0.2,
                            textAlign: 'center',
                            fontSize: 'xl',
                            fontWeight: 'xl',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        인기
                    </CardOverflow>
                    <CardContent >
                        <Stack sx={{mt: 1, borderRadius: 3}} divider={<Divider/>}>
                            <UrlCardContent isViewPage={false}/>
                            <UrlCardContent isViewPage={false}/>
                            <UrlCardContent isViewPage={false}/>
                            <UrlCardContent isViewPage={false}/>
                            <UrlCardContent isViewPage={false}/>
                            <UrlCardContent isViewPage={false}/>
                            <UrlCardContent isViewPage={false}/>
                            <UrlCardContent isViewPage={false}/>
                            <UrlCardContent isViewPage={false}/>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

export default HomePage;