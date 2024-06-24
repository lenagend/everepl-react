import {useAuth} from "../../security/AuthProvider";
import {useState} from "react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import {Input, Radio, RadioGroup} from "@mui/joy";
import {FormControlLabel} from "@mui/material";
import Button from "@mui/joy/Button";

const BlockUrlForm = () => {
    const { axiosInstance } = useAuth();
    const [url, setUrl] = useState("");
    const [blockType, setBlockType] = useState("url");

    const handleBlock = async () => {
        try {
            if (blockType === "domain") {
                await axiosInstance.patch("/admin/block-domain", null, { params: { url } });
                alert("도메인이 성공적으로 차단되었습니다.");
            } else if (blockType === "url") {
                await axiosInstance.patch("/admin/block-url", null, { params: { url } });
                alert("URL이 성공적으로 차단되었습니다.");
            }
            setUrl(""); // 입력 필드 초기화
        } catch (error) {
            alert("차단에 실패했습니다. " + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <Stack spacing={2} alignItems={'start'} sx={{ marginTop: 4 }}>
            <Typography level="h4">URL 차단/도메인 정지</Typography>
            <Input
                placeholder="URL 입력"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                sx={{ width: '100%' }}
            />
            <RadioGroup
                name="blockType"
                value={blockType}
                onChange={(e) => setBlockType(e.target.value)}
                row
            >
                <FormControlLabel value="url" control={<Radio />} label="URL 블럭" />
                <FormControlLabel value="domain" control={<Radio />} label="도메인 정지" />
            </RadioGroup>
            <Button onClick={handleBlock} color="primary">
                실행
            </Button>
        </Stack>
    );
};

export default BlockUrlForm;