import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import {Pagination, useMediaQuery} from "@mui/material";
import * as React from "react";

export default function UrlPagination({page, handlePageChange}){
    const isMobile = useMediaQuery('(max-width:600px)');

    return(
        <Card
            size="sm"
            orientation="horizontal"
            variant="outlined"
        >
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
                페이지
            </CardOverflow>
            <CardContent sx={{justifyContent: "center", alignItems : "center"}}>
                <Pagination count={isMobile ? 5 : 10} page={page} onChange={handlePageChange} />
            </CardContent>
        </Card>
    );
}