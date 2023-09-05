//urlを参照して作成できたサムネイルを表示するコンポーネント
import { WrapItem, Box, Stack, Image, Spinner, Flex, Button } from "@chakra-ui/react"
import { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

type PhotoType = {
    url: string;
}

export const Photo = memo((props:PhotoType) => {
    const [ polling, setPolling ] = useState<boolean>(true);
    const { url } = props;
    const navigate = useNavigate();
    const onClickEdit = () => {
        navigate("/result/edit", { state: {url}  });
    }

    const onClickDownload = async () => {
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

    useEffect(() => {
        (async() => {
            const apiUrl = 'http://44.210.108.10:8080/vectorapp'
            const requestOptions ={
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({prompt: "機械学習", num: 4})
            };
            const res = await fetch(apiUrl, requestOptions); //バックエンドにPOSTしてる
            console.log("aaa")
            const j = await res.json(); //POSTして返ってきたやつ
            console.log(j.urls)
            setPolling(true);
        })();
    },[]);



    return(
        <>
        {polling ? (
            <WrapItem>
                <Box w="260px" h="260px" >
                    <Stack textAlign="center">
                        <Image w="260px" h="146px" src={url} m="auto" />
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