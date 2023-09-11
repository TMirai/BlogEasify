//生成したサマリーを持ってきて表示するためのコンポーネント
import { WrapItem, Box, Spinner, Heading, Wrap, useClipboard, Button, Stack, Flex, Alert, AlertIcon, AlertTitle, AlertDescription, Image, Img } from "@chakra-ui/react"
import { memo, useEffect, useState, FC } from "react"
import { useRecoilState } from "recoil"
import { Text } from "../../store/Text"
import wait from "../../../../src/images/wait.png"

type Props = {
    error: boolean;
    polling: boolean;
    summary: string;
}

export const Summary: FC<Props> = memo(({error, polling, summary}) => {
    const { onCopy, hasCopied, value, setValue } = useClipboard("");
        
    useEffect(() => {
        setValue(summary);
    }, []);

    return(
        <>
        {polling? (
            <Box bg="white" p={4} borderRadius="md" shadow="md" width="98%" style={{maxWidth: '1000px'}}>
                <Heading as="h1" size="lg" textAlign="center">要約</Heading>
                {/* <Wrap p={{ base: 4, md: 10 }}> */}
                    {/* <WrapItem> */}
                        <Flex mb={2} alignItems="center" flexDirection="column">
                            {/* <Stack spacing={6} py={4} px={10} alignItems="center" flexDirection="column"> */}
                                <p style={{marginTop: '20px'}}>{summary}</p>
                                <Button m={3} size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={onCopy}>{hasCopied ? "コピーしたよ!" : "コピー"}</Button>
                            {/* </Stack> */}
                        </Flex>
                    {/* </WrapItem> */}
                {/* </Wrap> */}
            </Box>
          )  : (
            <>
            {error? (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Your browser is outdated!</AlertTitle>
                    <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
                </Alert>
                ) : (
                    <Box bg="white" p={4} borderRadius="md" shadow="md" width="80%">
                        {/* <Wrap p={{ base: 4, md: 10 }}> */}
                            {/* <WrapItem> */}
                                <Flex mb={2} alignItems="center" flexDirection="column">
                                    <Img src={wait} boxSize='60%' />
                                </Flex>
                            {/* </WrapItem> */}
                        {/* </Wrap> */}
                    </Box>
                //<Spinner />
                )
            }
            </>
        )}
        </>
    )
}
)