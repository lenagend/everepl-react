import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export default function SiteInfoCard() {
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
            }}
        >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
                <img
                    src="/images/favicon/naver_favicon.ico"
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <CardContent>
                <Typography level="title-md" id="card-description">
                    지석진, 건강 문제로 '런닝맨' 잠시 하차 "치료 필요" [공식입장]
                </Typography>
                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                    <Link
                        overlay
                        underline="none"
                        href="https://entertain.naver.com/read?oid=076&aid=0004089955"
                        sx={{ color: 'text.tertiary' }}
                    >
                        https://entertain.naver.com/read?oid=076&aid=0004089955
                    </Link>
                </Typography>
                <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none' }}
                >
                   바로가기
                </Chip>
            </CardContent>
        </Card>
    );
}
