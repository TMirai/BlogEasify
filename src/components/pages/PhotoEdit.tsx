import { Box, Button, Divider, Flex, Heading, Img, Stack, Radio, RadioGroup, Center} from "@chakra-ui/react";
import { memo, useEffect, useRef, useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil"
import { Title } from "../store/Title";
import { Edit, Editurl } from "../store/Edit";
import wait from "../../../src/images/wait.png"

type Props = {
    imageUrl: string;
}

export const PhotoEdit = memo((props: Props) => {
    const canvasRef = useRef(null);
    const [colorvalue, setColorValue] = useState('black')
    const [positionvalue, setPositionValue] = useState('center')
    const [ inputtitle, setInputitle ] = useRecoilState(Title);
    const [ edit, setEdit ] = useRecoilState(Edit);
    const [ editurl, setEditurl ] =useRecoilState(Editurl);
    const photosurl = props.imageUrl;
    const text = inputtitle;

    function loadImage(){
        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        //image.setAttribute('width', "100%");
        // image.setAttribute('height', "5px");
        image.crossOrigin = "Anonymous";
        // image.src = "https://source.unsplash.com/random"
        // image.src = wait
        image.src = photosurl;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        };
    }
    function onClickDownload(){
        const canvas:any = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = "thumbnail.jpg";
        link.click();
    };
    const onClickInTitle = () =>{
        //キャンバスにテキストを描画する
        const canvas:any = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let fontColor = "#fff";
        let backgroundColor = '#000';
        if (colorvalue == "white"){
            fontColor = "#000";
            backgroundColor = '#fff';
        } 
        let y = canvas.height/2;
        if(positionvalue == 'up'){
            y = 50;
        }else if(positionvalue == "down"){
            y = 350;
        }

        const txw = ctx.measureText(text);
        ctx.font = '25px Roboto medium';
        // 背景を描画
        ctx.fillStyle = backgroundColor;
        ctx.fillRect((canvas.width - txw.width) / 2 - txw.width, y-30, 3*txw.width, 50);
        ctx.fillStyle = fontColor;
        ctx.textBaseline = 'center';
        ctx.textAlign = 'center';
        const x = canvas.width / 2;
        ctx.fillText(text, x, y, canvas.width);
    }

    const onClickBack = () => {
        setEdit(false);
    }

    useEffect(() => {
        loadImage();
    }, [photosurl]);

    return (
        <div>
            <div>
                <canvas ref={canvasRef} id='preview' style={{width: '700px'}}></canvas>
            </div>
            <div style={{textAlign: 'right', marginTop: '10px'}}>
                <RadioGroup onChange={setColorValue} value={colorvalue}>
                    <Center>
                        <Stack direction='row'>
                            <span style={{color: 'black'}}>色：</span>
                            <Radio value='black'><span style={{color: 'black'}}>黒ベース</span></Radio>
                            <Radio value='white'><span style={{color: 'black'}}>白ベース</span></Radio>
                        </Stack>
                    </Center>
                </RadioGroup>
                <RadioGroup onChange={setPositionValue} value={positionvalue}>    
                    <Center>           
                        <Stack direction='row'>
                            <span style={{color: 'black'}}>位置：</span>     
                            <Radio value='up'><span style={{color: 'black'}}>上</span></Radio>
                            <Radio value='center'><span style={{color: 'black'}}>真ん中</span></Radio>
                            <Radio value='down'><span style={{color: 'black'}}>下</span></Radio>
                        </Stack>
                    </Center>
                </RadioGroup>
                <p>
                    <Button size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={onClickInTitle}>タイトル挿入</Button>
                    <Button size='xs' bg="teal.400" ml={3} color="white" _hover={{ opacity: 0.8 }} onClick={loadImage}>タイトル削除</Button>   
                </p>
                <br />
                <p>
                    <Button width='100%' size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} id='download-button' onClick={onClickDownload}>ダウンロード</Button>
                </p>
                {/* <p>
                    <Button size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={onClickBack}>画像一覧に戻る</Button>
                </p> */}
            </div>
            {/* <p>
                <Button id='title-on-button' onClick={onClickonTitle}>タイトルON(デフォルト色)</Button>
                <Button id='reversal-button' onClick={onClickonTitleReverse}>タイトルON(反転色)</Button>
                <Button id='title-off-button' onClick={loadImage}>タイトルOFF</Button>
            </p>
            <p>
                <Button id='title-on-button' onClick={onClickLetterUp}>文字の位置(上)</Button>
                <Button id='reversal-button' onClick={onClickLetterCenter}>文字の位置(真ん中)</Button>
                <Button id='title-off-button' onClick={onClickLetterDown}>文字の位置(下)</Button>
            </p>
            <Button id='download-button' onClick={onClickDownload}>ダウンロード</Button> */}
        </div>
    )
})