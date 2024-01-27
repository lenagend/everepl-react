import {Box, CardContent, Container} from "@mui/joy";
import * as React from "react";
import Stack from "@mui/joy/Stack";
import {Typography} from "@mui/material";
import Card from "@mui/joy/Card";

const PolicyPage = () => {
    return(
            <Container maxWidth="md" >
                <Card>
                    <CardContent>
                        <Stack spacing={2}  justifyContent="center">
                            <Typography variant="h4" gutterBottom>
                                개인정보처리방침
                            </Typography>
                            <Typography variant="body1" paragraph>
                                본 개인정보처리방침은 에브리플이 사용자의 개인정보를 어떻게 수집, 사용, 보관하는지에 대한 정보를 제공합니다.
                            </Typography>
                            <Typography variant="h6">
                                수집하는 개인정보
                            </Typography>
                            <Typography variant="body1" paragraph>
                                우리는 사용자 식별과 서비스 운영을 위해 IP 주소를 수집합니다. 다른 개인 식별 정보는 수집하지 않습니다.
                            </Typography>
                            <Typography variant="h6">
                                개인정보의 사용
                            </Typography>
                            <Typography variant="body1" paragraph>
                                수집된 IP 주소는 서비스 운영 및 유지보수, 사용자 경험 개선을 위해 사용됩니다.
                            </Typography>
                            <Typography variant="h6">
                                개인정보의 보유 및 보안
                            </Typography>
                            <Typography variant="body1" paragraph>
                                수집된 IP 주소는 필요한 기간 동안만 보관하며, 데이터 보안을 위해 최선을 다합니다.
                            </Typography>
                            <Typography variant="h6">
                                개인정보의 공유
                            </Typography>
                            <Typography variant="body1" paragraph>
                                우리는 어떠한 경우에도 수집된 IP 주소를 제3자와 공유하거나 판매하지 않습니다.
                            </Typography>
                            <Typography variant="h6">
                                사용자 권리
                            </Typography>
                            <Typography variant="body1" paragraph>
                                사용자는 언제든지 자신의 개인정보에 대한 접근, 수정, 삭제를 요청할 수 있습니다.
                            </Typography>
                            <Typography variant="h6">
                                연락처 정보
                            </Typography>
                            <Typography variant="body1" paragraph>
                                개인정보처리방침과 관련된 문의사항은 lenagend@naver.com으로 연락 주시기 바랍니다.
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
    )
}

export default PolicyPage;