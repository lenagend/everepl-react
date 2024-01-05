import * as React from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Divider} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import LoadingUrlCard from "./LoadingUrlCard";

export default function LoadingUrlCardList() {
    return (
        <Card>
            <CardContent>
                <Stack sx={{ borderRadius: 3 }} divider={<Divider />}>
                    <LoadingUrlCard isListItem={true}/>
                    <LoadingUrlCard isListItem={true}/>
                    <LoadingUrlCard isListItem={true}/>
                    <LoadingUrlCard isListItem={true}/>
                    <LoadingUrlCard isListItem={true}/>
                    <LoadingUrlCard isListItem={true}/>
                    <LoadingUrlCard isListItem={true}/>
                    <LoadingUrlCard isListItem={true}/>
                    <LoadingUrlCard isListItem={true}/>
                    <LoadingUrlCard isListItem={true}/>
                </Stack>
            </CardContent>
        </Card>

    );
}