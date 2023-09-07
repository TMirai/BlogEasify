//urlを参照して作成できたサムネイルを表示するコンポーネント
import { WrapItem, Box, Stack, Image, Spinner, Flex, Button } from "@chakra-ui/react"
import { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Title } from "../../store/Title";
import { useRecoilState } from "recoil";
import { Edit, Editurl } from "../../store/Edit";

type PhotoType = {
    url: string;
}

export const Photo = memo((props:PhotoType) => {
    const [ polling, setPolling ] = useState<boolean>(true);
    const [ edit, setEdit ] = useRecoilState(Edit);
    const [ editurl, setEditurl ] =useRecoilState(Editurl);
    const { url } = props;
    const navigate = useNavigate();
    const onClickEdit = () => {
        // navigate("/result/edit", { state: {url}  });
        setEdit(true)
        setEditurl(url)
    }

    const onClickDownload = async () => {
        // console.log(url)
        const response = await fetch(url);
        const blob = await response.blob();
        const newBlob = new Blob([blob]);
        const objUrl = window.URL.createObjectURL(newBlob);
        const link = document.createElement("a");
        link.href = objUrl;
        link.download = "thumbnail.jpg";
        link.click();
        setTimeout(() => {
        window.URL.revokeObjectURL(objUrl);
        }, 250);
    };

    return(
        <>
        {polling ? (
            <WrapItem>
                <Box w="260px" h="260px" >
                    <Stack textAlign="center">
                        <Image w="260px" h="146px" src={url} m="auto" crossOrigin="anonymous" />
                        <Flex align="center" fontSize="sm" flexGrow={2}>
                            <Box pr={4}>
                            <Button size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={onClickEdit}>編集</Button>
                            </Box>
                            <Button size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={onClickDownload}>ダウンロード</Button>
                        </Flex>
                    </Stack>
                </Box>
            </WrapItem>
          )  : (
            <Spinner />
        )}
        </>
    )
}
)