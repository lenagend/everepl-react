import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BallotIcon from '@mui/icons-material/Ballot';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { AspectRatio } from '@mui/joy';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function CommentCard({ comment }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 'auto', mt: 2 }} color="primary">
            <CardContent>
                <Typography level="body-sm">
                    스타크래프트 립버전 1.16.1다운 스타크래프트 립버전 1.16.1다운 있을 것 같았다. 그건 실로 벅찬 감격이었다.고마워요 본드. 덕분에 마음이 아주 편해졌어요.고마워할 필요는 없어.킴은 미소지으며 손을 내밀었다. 니콜라는 기쁜 얼굴로 악수를
                    리를 질렀다. 이건....정말 상황 파악이 느린 녀석이로군. 네가 지금 어디에 스타크래프트 립버전 1.16.1다운 알기나 하는 거야 어리광을 받아주는 것도 여기까지다. 어서 이름이나 말해 어디서 감히 스타크래프트 립버전 1.16.1다운 지르나 천한
                    입구가 녹슬어 엉겨붙은 문을 열어 부지내를 마차가 스타크래프트 립버전 1.16.1다운 저택으로 향하는 길만은 어떻게든 풀사리도 되어 있는 것 같지만 스타크래프트 립버전 1.16.1다운 그것을 조금이라도 빗나가면자 거칠어지는 대로의 풀숲뿐만. 그런
                    은 1.16.1 스타크래프트 립버전 1.16.1다운 같이 놀아요.토니 박태환 님. 조나단의 상처는 싸이월드에도 있답니다. 저는 싸이월드에서 도토리 2개를 갖고 있거든요. 1부 조나단의 상처 스타크래프트 립버전 1.16.1다운 소년이여 스타크래프트 립버전 1.16.1이 되라.로딩 님. 출석 체크 했습니다.
                    를 위해서라도 사랑의빵 님을 그만 보아주세요. 장난기 어린 의 말에 휴스턴은 멍해져 있다가 크게 스타 립버전 1.16.1다운 터트렸다. 귀족들이나 스타크래프트 립버전 1.16.1다운 황족들은 어 웃음을 는 것은 였다. 하
                    잖아. 어차피 그들이 우리를 데려가지 못한다고 해도 처벌받거나 하는 스타크래프트 립버전 1.16.1다운 없습니다. 엘프들은 서로를 처벌한다는 것에 익숙하지 못하니까요. 그래도. 어정쩡한 블리자드의 대꾸에 스타크래프트 립버전 1.16.1다운 잠시 머리에 손을
                </Typography>
            </CardContent>
            <Card
                orientation="horizontal"
                size="sm"
                sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1 }}
            >
                <CardOverflow>
                    <AspectRatio
                        ratio="1"
                        sx={{ minWidth: 70, '& img[data-first-child]': { p: 1.5 } }}
                    >
                        <img src="/images/character/level1.png" alt="" />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level="title-md">익명1(192.08)</Typography>
                    <Typography level="body-sm">20분전 작성</Typography>
                </CardContent>

            </Card>
            <CardOverflow
                variant="soft"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    justifyContent: 'space-around',
                    py: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography startDecorator={<ThumbUpIcon color="danger" />} level="title-sm">
                    13
                </Typography>
                <Divider orientation="vertical" />
                <Typography startDecorator={<ThumbDownIcon />} level="title-sm">
                    32
                </Typography>
                <Divider orientation="vertical" />
                <Typography startDecorator={<CommentOutlinedIcon />} level="title-sm">
                    9
                </Typography>
            </CardOverflow>
        </Card>
    );
}
