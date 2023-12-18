import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';

export default function UserCard() {
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
            <CardContent>
                <Typography fontWeight="md" textColor="success.plainColor">
                    박계장
                </Typography>
                <Typography level="body-sm">(192.08)</Typography>
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
