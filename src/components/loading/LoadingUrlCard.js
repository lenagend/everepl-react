import * as React from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";

export default function LoadingUrlCard() {
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                '&:hover': { boxShadow: 'md', borderColor: 'primary.outlinedHoverBorder' },
                '& .css-14d6vet-MuiCardContent-root:last-child': {
                    paddingBottom: 0
                },
                padding: 1.5,
                gap: {
                    xs: 0
                }
            }}
        >
            <CardContent sx={{p: 0, pb: 0}} >
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
                <Skeleton variant="rectangular" width={48} height={48} />
                <div>
                    <Skeleton variant="rectangular" width={{md: 700, sm: 400, xs: 200}} height="1em" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" width={{md: 500, sm: 300, xs: 100}} height="1em" sx={{ mb: 1 }}/>
                    <Skeleton variant="rectangular" width={{md: 400, sm: 300, xs: 80}} height="1em" />
                </div>
            </Box>
            </CardContent>
        </Card>
    );
}