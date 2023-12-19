import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import UrlCardContent from "./UrlCardContent";

export default function UrlCard({ isViewPage }){
    return(
        <Card sx={{p: 0}}>
            <CardContent>
                <UrlCardContent isViewPage={isViewPage}/>
            </CardContent>
        </Card>
    )
}