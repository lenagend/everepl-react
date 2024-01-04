import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import UrlCard from "./UrlCard";
import CardOverflow from "@mui/joy/CardOverflow";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import {Divider} from "@mui/joy";
import {Pagination} from "@mui/material";

export default function UrlListCard(){
    return(
        <Card sx={{p: 0, mt: 2, gap: 0}}>
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
            <CardContent>
                <Stack sx={{borderRadius: 3}} divider={<Divider/>}>
                    <UrlCard isListItem={true}/>
                    <UrlCard isListItem={true}/>
                    <UrlCard isListItem={true}/>
                    <UrlCard isListItem={true}/>
                    <UrlCard isListItem={true}/>
                    <UrlCard isListItem={true}/>
                    <UrlCard isListItem={true}/>
                    <UrlCard isListItem={true}/>
                    <UrlCard isListItem={true}/>
                    <UrlCard isListItem={true}/>
                </Stack>
            </CardContent>
        </Card>
    )
}