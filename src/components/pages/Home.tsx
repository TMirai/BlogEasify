//生成ページの大元
import { Box, Button, Divider, Flex, Heading, Stack} from "@chakra-ui/react";
import { memo, FC } from "react";
import { useNavigate } from "react-router-dom";
import { InputTitleArea } from "../molecules/InputTitleArea";
import { InputTextArea } from "../molecules/InputTextArea";

export const Home: FC = memo(() => {
    const navigate = useNavigate();
    const onClickResult = () => {
        navigate("/result");
    }

    return (
        <Flex align="center" justify="center" m={5}>
            <Box bg="white" w="80%" p={4} borderRadius="md" shadow="md">
                <Heading as="h1" size="lg" textAlign="center">サムネイルと要約生成</Heading>
                <Divider my={4} />
                <Stack spacing={6} py={4} px={10}>
                    <InputTitleArea input="タイトル"/>
                    <InputTextArea input="本文" />
                    <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={onClickResult}>生成</Button>
                </Stack>
            </Box>
        </Flex>
    )
})