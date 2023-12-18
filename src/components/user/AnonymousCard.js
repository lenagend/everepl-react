import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import {Input} from "@mui/joy";
import Button from "@mui/joy/Button";
import BadgeIcon from '@mui/icons-material/Badge';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Stack from "@mui/joy/Stack";

export default function AnonymousCard() {
    return (
        <Card orientation="horizontal" variant="outlined" sx={{mt: 2}}>
            <CardOverflow>
                <AspectRatio ratio="1" sx={{ width: 110 }}>
                    <img
                        src="/images/character/level2.png"
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent sx={{p: 0}}>
                <Stack  maxWidth={200}>
                    <Input
                        startDecorator={<BadgeIcon />}
                        endDecorator={<Button>저장</Button>}
                    />
                    <Input
                        startDecorator={<VpnKeyIcon />}
                        endDecorator={<Button>저장</Button>}
                    />
                </Stack>

            </CardContent>
            <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                    px: 0.2,
                    writingMode: 'vertical-rl',
                    textAlign: 'center',
                    fontSize: 'xs',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                }}
            >
                로그아웃
            </CardOverflow>
        </Card>
    );
}
