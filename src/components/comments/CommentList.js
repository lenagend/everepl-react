import Comment from "./Comment";
import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
const testComments = [
    {
        id: 1,
        userIp: "192.168",
        nickname: "UserA",
        url: "https://example.com/article1",
        text: "스타크래프트 립버전 1.16.1다운 스타크래프트 립버전 1.16.1다운 있을 것 같았다. 그건 실로 벅찬 감격이었다.고마워요 본드. 덕분에 마음이 아주 편해졌어요.고마워할 필요는 없어.킴은 미소지으며 손을 내밀었다. 니콜라는 기쁜 얼굴로 악수를\n" +
            "리를 질렀다. 이건....정말 상황 파악이 느린 녀석이로군. 네가 지금 어디에 스타크래프트 립버전 1.16.1다운 알기나 하는 거야 어리광을 받아주는 것도 여기까지다. 어서 이름이나 말해 어디서 감히 스타크래프트 립버전 1.16.1다운 지르나 천한\n" +
            "입구가 녹슬어 엉겨붙은 문을 열어 부지내를 마차가 스타크래프트 립버전 1.16.1다운 저택으로 향하는 길만은 어떻게든 풀사리도 되어 있는 것 같지만 스타크래프트 립버전 1.16.1다운 그것을 조금이라도 빗나가면자 거칠어지는 대로의 풀숲뿐만. 그런\n" +
            "은 1.16.1 스타크래프트 립버전 1.16.1다운 같이 놀아요.토니 박태환 님. 조나단의 상처는 싸이월드에도 있답니다. 저는 싸이월드에서 도토리 2개를 갖고 있거든요. 1부 조나단의 상처 스타크래프트 립버전 1.16.1다운 소년이여 스타크래프트 립버전 1.16.1이 되라.로딩 님. 출석 체크 했습니다.\n" +
            "를 위해서라도 사랑의빵 님을 그만 보아주세요. 장난기 어린 의 말에 휴스턴은 멍해져 있다가 크게 스타 립버전 1.16.1다운 터트렸다. 귀족들이나 스타크래프트 립버전 1.16.1다운 황족들은 어 웃음을 는 것은 였다. 하",
        pin: "1234",
        createdAt: "2023-12-15 11:00",
        updatedAt: "2023-12-15 11:30",
        parentCommentId: null,
        reportCount: 0
    },
    {
        id: 2,
        userIp: "192.168",
        nickname: "UserB",
        url: "https://example.com/article2",
        text: "Interesting point of view.",
        pin: "5678",
        createdAt: "2023-12-15 11:00",
        updatedAt: "2023-12-15 11:30",
        parentCommentId: 1,
        reportCount: 1
    },
    // 이하 동일한 구조로 3개의 추가 코멘트
];
export default function CommentList() {

    return(
        <Card sx={{ p: 1.5, gap: 0 }}>
            <CardContent>
            {testComments.map((comment) => (
                <React.Fragment key={comment.id}>
                    <Comment comment={comment} />
                </React.Fragment>
            ))}
            </CardContent>
        </Card>
    );
}