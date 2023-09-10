//結果ページの大元
import { Wrap, WrapItem, Box, Flex, Heading, Spacer, Tab, Tabs, TabPanel, TabPanels, TabList, Center, Image, useClipboard} from "@chakra-ui/react";
import { memo, FC, useEffect, useState } from "react";
import { Photo } from "../organisms/result/Photo";
import { Summary } from "../organisms/result/Summary";
import { Title } from "../store/Title";
import { useRecoilState } from "recoil";
import { Edit, Editurl } from "../store/Edit";
import { PhotoEdit } from "./PhotoEdit";
import { Photos } from "../organisms/result/Photos";
// import Slider from "react-slick";
import { Text } from "../store/Text"

export const Result= memo(() => {
    const [ inputtitle, setInputtitle ] = useRecoilState(Title);
    const [ photourls, setPhotourls ] = useState<string[]>([]);
    const [ defaultphotourls, setDefaultPhotourls ] = useState<string[]>([]);
    const [ switchTab, setSwitchTab ] = useState<Number>(1); // 1: thumbnail 2: summary 
    const [ edit, setEdit ] = useRecoilState(Edit);
    const [ editurl, setEditurl ] =useRecoilState(Editurl);
    const [ inputtext, setInputtext ] = useRecoilState(Text);
    const [ polling, setPolling ] = useState<boolean>(false);
    const [ error, setError ] = useState<boolean>(false);
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
            if (result == 403 || result == 404){
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

    useEffect(() => {
        (async() => {
            const apiUrl = 'https://4p48gblcv2.execute-api.us-east-1.amazonaws.com/dev/vectorapp'
            const requestOptions ={
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({prompt: inputtitle, num: 10})
            };
            const res = await fetch(apiUrl, requestOptions); //バックエンドにPOSTしてる
            const j = await res.json(); //POSTして返ってきたやつ
            setPhotourls([...photourls, j.generate[0], j.generate[1], j.generate[2], j.generate[3], j.generate[4], j.generate[5], j.generate[6], j.generate[7], j.generate[8], j.generate[9]])
            setDefaultPhotourls([...defaultphotourls, j.aws_default[0], j.aws_default[1], j.aws_default[2]])
        
            const apiUrl2 = 'https://4p48gblcv2.execute-api.us-east-1.amazonaws.com/dev/summary/bedrock-sqs'
            const requestOptions2 ={
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({content: {inputtext}})
            };
            const res2 = await fetch(apiUrl2, requestOptions2);
            const j2 = await res2.json(); //POSTして返ってきたやつ
            const sumurl = await poling(j2); //要約のURL
            setValue(sumurl);
            setPolling(true);
        
        })();
    },[]);


    return (
        <>
            <div className="display_pc">
                <Flex align="center" direction="column" justify="space-between">
                    <Tabs m={5} colorScheme='teal'>
                        <TabList>
                            <Tab fontSize='2xl' style={{width: '180px'}} onClick={() => setSwitchTab(1)}>サムネイル</Tab>
                            <Tab fontSize='2xl' style={{width: '180px'}} onClick={() => setSwitchTab(2)}>要約</Tab>
                        </TabList>
                    </Tabs>
                    
                    {switchTab === 1 && 
                        <Photos photourls={photourls} defaultphotourls={defaultphotourls} />
                    }
                    {switchTab === 2 && 
                        <Summary error={error} value={value} polling={polling}  />
                    }
                </Flex>
            </div>
            <div className="display_sp">
                スマホには対応していません。
                PCでご確認ください。
            </div>  
        </>      
    )
})
