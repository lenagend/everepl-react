import * as React from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {Chip, List, ListItem, ListItemButton, ListItemContent, Typography} from "@mui/joy";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import CampaignIcon from "@mui/icons-material/Campaign";
import {truncateString} from "../../utils/stringUtils";

export default function LoadingAnnouncementList({isListItem}) {
    return (
        <Card sx={{p: 0}}>
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemButton color="primary">
                            <ListItemDecorator>
                                <Skeleton variant="rectangular" width={60} height="1em" sx={{mr:1}}/>
                            </ListItemDecorator>
                            <ListItemContent>
                                <Skeleton variant="rectangular" width={{md: 700, sm: 400, xs: 250}} height="1em"  />
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton color="primary">
                            <ListItemDecorator>
                                <Skeleton variant="rectangular" width={60} height="1em" sx={{mr:1}}/>
                            </ListItemDecorator>
                            <ListItemContent>
                                <Skeleton variant="rectangular" width={{md: 700, sm: 400, xs: 250}} height="1em"  />
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton color="primary">
                            <ListItemDecorator>
                                <Skeleton variant="rectangular" width={60} height="1em" sx={{mr:1}}/>
                            </ListItemDecorator>
                            <ListItemContent>
                                <Skeleton variant="rectangular" width={{md: 700, sm: 400, xs: 250}} height="1em"  />
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}