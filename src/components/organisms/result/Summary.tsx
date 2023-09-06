//生成したサマリーを持ってきて表示するためのコンポーネント
import { WrapItem, Box, Spinner, Heading, Wrap, useClipboard, Button, Stack, Flex, Alert, AlertIcon, AlertTitle, AlertDescription, Image, Img } from "@chakra-ui/react"
import { memo, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { Text } from "../../store/Text"
import wait from "../../../../src/images/wait.png"

export const Summary = memo(() => {
    const [ polling, setPolling ] = useState<boolean>(false);
    const [ error, setError ] = useState<boolean>(false);
    const [ inputtext, setInputtext ] = useRecoilState(Text);
    const { onCopy, value, setValue, hasCopied } = useClipboard("");

    const checkS3Resolve = async (url:string) => {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return res
      }
    
    const poling = async (url:string) => {
        // ポーリング
        const delay = (ms:number) => new Promise(res => setTimeout(res, ms))
        let result = 403 //404
        while (1) {
            if (result == 403){
                await delay(1500)
                result = (await checkS3Resolve(url)).status;
            }
            else if(result == 200){
                const a = await checkS3Resolve(url);
                return a.json()
            }else{
                setError(true);
            }
        }
    }
    

    // useEffect(() => {
    //     (async() => {
    //         const apiUrl = 'https://4p48gblcv2.execute-api.us-east-1.amazonaws.com/dev/summary/bedrock-async'
    //         const requestOptions ={
    //             method: 'POST',
    //             headers:{'Content-Type': 'application/json'},
    //             body: JSON.stringify({content: {inputtext}})
    //         };
    //         const res = await fetch(apiUrl, requestOptions); //バックエンドにPOSTしてる
    //         const j = await res.json(); //POSTして返ってきたやつ
    //         const sumurl = await poling(j); //要約のURL
    //         setValue(sumurl);
    //         setPolling(true);
            
    //     })();
    // },[]);

    return(
        <>
        {polling? (
            <Box bg="white" p={4} borderRadius="md" shadow="md" width="80%">
                <Heading as="h1" size="lg" textAlign="center">要約</Heading>
                <Wrap p={{ base: 4, md: 10 }}>
                    <WrapItem>
                        <Flex mb={2} alignItems="center" flexDirection="column">
                            {/* <Stack spacing={6} py={4} px={10} alignItems="center" flexDirection="column"> */}
                                <p>{value}</p>
                                <Button size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={onCopy}>{hasCopied ? "コピーしたよ!" : "コピー"}</Button>
                            {/* </Stack> */}
                        </Flex>
                    </WrapItem>
                </Wrap>
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
                        <Heading as="h1" size="lg" textAlign="center">要約</Heading>
                        <Wrap p={{ base: 4, md: 10 }}>
                            <WrapItem>
                                <Flex mb={2} alignItems="center" flexDirection="column">
                                    <Img src={wait} boxSize='60%' />
                                </Flex>
                            </WrapItem>
                        </Wrap>
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