import { Box, Button, Divider, Flex, Heading, Img, Stack, Radio, RadioGroup} from "@chakra-ui/react";
import { memo, useEffect, useRef, useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil"
import { Title } from "../store/Title";
import { Edit, Editurl } from "../store/Edit";
import wait from "../../../src/images/wait.png"


export const PhotoEdit = memo(() => {
    const canvasRef = useRef(null);
    const [colorvalue, setColorValue] = useState('black')
    const [positionvalue, setPositionValue] = useState('center')
    const [ inputtitle, setInputitle ] = useRecoilState(Title);
    const [ edit, setEdit ] = useRecoilState(Edit);
    const [ editurl, setEditurl ] =useRecoilState(Editurl);
    const photosurl = editurl;
    const text = inputtitle;

    function loadImage(){
        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        // image.setAttribute('width', "5px");
        // image.setAttribute('height', "5px");
        image.crossOrigin = "Anonymous";
        // image.src = "https://source.unsplash.com/random"
        // image.src = wait
        // image.src = "https://blog-easify-background-images.s3.us-east-1.amazonaws.com/4.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0xIkYwRAIgEetGJ6M6EjjmC3OkPkXq2AMiaM63zGcF6gZz7bSsVLYCIFtEiYT5U%2Bl25pAyAL%2BtBuf0WodatlY4rKXX0yJAKh%2BdKuYCCFoQABoMMzM3Njg1MDU5MDM5Igy%2BzAlwOSkcmBDzwjcqwwLP7RLXbzAYrJJP6VpS57iAUgjqljCMxieYjYNXmBX%2FIc%2FlAoyA0mL0bCDQsqmkOA2CdC2p7OX97OSzKAtmbwGb%2FgVQfzAtJBG4hfynV%2FTv9SL0jl4Z4xUQ%2F2CVsTBy34iwbTgYodH9I7XkmY9jeNMdlVWaQ7X1G%2BZuff2XCRwVOJZTFRhW%2BCh6yKzuksFG9%2FjwR62sTgwP7eI%2BaAAoyHGKcnApL8utuJo58LGoLDFquG%2FCYbKYGOFvaKj23rqSSnX2FoqGOyvVLz4GgQYg1JKYBX5YuYscmbIYPHWWKOOvKD8rO3aPOguOWE8VW1AZ0C7gr%2FnjEKA8iVEYf4nA%2FoOmztTLq%2FrBfQ7Iw%2FPLmvRKPzMj98DFaK452US9WuEcAkkPgfM%2B9lr%2FMsrqor1TGckJN43MeFxJ052h9PWGJF84fWCvLjCr%2F9qnBjqIAkVv5XSdOnAZ15ezEG2Y7fHDCno1ptma7JvHPpGrxAMomuaLlYUcdqkSfog%2BszvKU9%2FEbc5yz1scaXyvLsK1G7Olb%2BacPMNROWrRbtMxkr3VE9bAZ%2FjzHzinW0jxrXNEN%2BTZIPwMLmeFMWhFHGGkI2vGjpa8idqwRsQY4VsMYPva3QPHvesMN%2FcEBnxT%2Bd6DQIP4o52HcZazgKoQdZ%2Fj1SyCV6PXrzlDF8rRh0JIEF14Ampo4iy5nWFjN3YX%2BP9sawbaa6Gy5XjgBe1hWZLK5ae%2Bg61Dg%2F2sO4GyKo59Hp39oqEeIVsjRs0LHfXWdtk9udU0zabN%2BlV1jsk4y3hRJE5R0YLWJ4S2sg%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230905T105258Z&X-Amz-SignedHeaders=host&X-Amz-Expires=720&X-Amz-Credential=ASIAU5H4ZCXPZMBW4MYH%2F20230905%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=666d18866cc0bdf2d9f1261cdb7c6e440185b800ff5ff9eb438981db08ebde05";
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
        console.log((canvas.width - txw.width) / 2)
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
        // 初回描画
        loadImage();
  }, []);

    return (
        <div>
        <canvas ref={canvasRef} id='preview'></canvas>
        <RadioGroup onChange={setColorValue} value={colorvalue}>
            <Stack direction='row'>
            <Radio value='black'>黒ベース</Radio>
            <Radio value='white'>白ベース</Radio>
            </Stack>
        </RadioGroup>
        <RadioGroup onChange={setPositionValue} value={positionvalue}>
            <Stack direction='row'>
            <Radio value='up'>上</Radio>
            <Radio value='center'>真ん中</Radio>
            <Radio value='down'>下</Radio>
            </Stack>
        </RadioGroup>
        <p>
            <Button size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={onClickInTitle}>タイトル挿入</Button>
            <Button size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={loadImage}>タイトル削除</Button>   
        </p>
        <br />
        <p>
            <Button size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} id='download-button' onClick={onClickDownload}>ダウンロード</Button>
        </p>
        <p>
            <Button size='xs' bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={onClickBack}>画像一覧に戻る</Button>
        </p>
        
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