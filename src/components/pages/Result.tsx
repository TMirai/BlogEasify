//結果ページの大元
import { Wrap, WrapItem, Box, Flex, Heading, Spacer} from "@chakra-ui/react";
import { memo, FC, useEffect, useState } from "react";
import { Photo } from "../organisms/result/Photo";
import { Summary } from "../organisms/result/Summary";
import { Title } from "../store/Title";
import { useRecoilState } from "recoil";
import { Edit, Editurl } from "../store/Edit";
import { PhotoEdit } from "./PhotoEdit";
// import Slider from "react-slick";

export const Result= memo(() => {
    const [ inputtitle, setInputtitle ] = useRecoilState(Title);
    const [ photourls, setPhotourls ] = useState<string[]>([]);
    const [ edit, setEdit ] = useRecoilState(Edit);
    const [ editurl, setEditurl ] =useRecoilState(Editurl);

    useEffect(() => {
        (async() => {
            const apiUrl = 'http://44.210.108.10:8080/vectorapp'
            const requestOptions ={
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({prompt: inputtitle, num: 10})
            };
            const res = await fetch(apiUrl, requestOptions); //バックエンドにPOSTしてる
            const j = await res.json(); //POSTして返ってきたやつ
            setPhotourls([...photourls, j.urls[0], j.urls[1], j.urls[2], j.urls[3], j.urls[4], j.urls[5], j.urls[6], j.urls[7], j.urls[8], j.urls[9]])
        })();
    },[]);


    return (
        <Flex align="center" direction="column" justify="space-between">
            <Box bg="white" p={4} borderRadius="md" shadow="md" width="80%">
                <Heading as="h1" size="lg" textAlign="center">サムネイル</Heading>
                {edit ? (
                    <>
                        <PhotoEdit />
                    </>
                ):(
                <Wrap p={{ base: 4, md: 10 }}>
                    <Photo url={photourls[0]}/>
                    <Photo url={photourls[1]}/>
                    <Photo url={photourls[2]}/>
                    <Photo url={photourls[3]}/>
                    <Photo url={photourls[4]}/>
                    <Photo url={photourls[5]}/>
                    <Photo url={photourls[6]}/>
                    <Photo url={photourls[7]}/>
                    <Photo url={photourls[8]}/>
                    <Photo url={photourls[9]}/>
                </Wrap>
                )}
            </Box>
            <Spacer />
            <br />
            <Summary />
        </Flex>
    )
})