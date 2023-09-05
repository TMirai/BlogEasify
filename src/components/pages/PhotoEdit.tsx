import { Box, Button, Divider, Flex, Heading, Img, Stack, Radio, RadioGroup} from "@chakra-ui/react";
import { memo, useEffect, useRef, useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil"
import { Title } from "../store/Title";


export const PhotoEdit = memo(() => {
    const location = useLocation();
    const photosurl = location.state;
    const canvasRef = useRef(null);
    const [colorvalue, setColorValue] = useState('black')
    const [positionvalue, setPositionValue] = useState('center')
    const [ inputtitle, setInputitle ] = useRecoilState(Title);
    const text = inputtitle;
    const navigate = useNavigate();

    function loadImage(){
        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.setAttribute('width', "640px");
        image.setAttribute('height', "340px");
        image.crossOrigin = "Anonymous";
        image.src = photosurl.url;
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
            y = 30;
        }else if(positionvalue == "down"){
            y = 300;
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
        navigate("/result");
    }

    // function onClickonTitleReverse(){
    //     const canvas:any = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    //     setFontColor('#000');
    //     setBackColor("#fff");
    //     const fontColor = '#000';
    //     const backgroundColor = "#fff";
    //     const txw = ctx.measureText(text);
    //     ctx.font = '25px';
    //     // 背景を描画
    //     ctx.fillStyle = backgroundColor;
    //     ctx.fillRect((canvas.width - txw.width) / 2 - 5, y-30, txw.width + 10, 50);
    //     ctx.fillStyle = fontColor;
    //     ctx.textBaseline = 'center';
    //     ctx.textAlign = 'center';
    //     const x = canvas.width / 2;
    //     ctx.fillText(text, x, y);
    // }

    // const onClickonTitle = () =>{
    //     //キャンバスにテキストを描画する
    //     const canvas:any = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    //     setFontColor("#fff");
    //     setBackColor('#000')
    //     const fontColor = "#fff";
    //     const backgroundColor = '#000';
    //     const txw = ctx.measureText(text);
    //     ctx.font = '25px';
    //     // 背景を描画
    //     ctx.fillStyle = backgroundColor;
    //     ctx.fillRect((canvas.width - txw.width) / 2 - 5, y-30, txw.width + 10, 50);
    //     ctx.fillStyle = fontColor;
    //     ctx.textBaseline = 'center';
    //     ctx.textAlign = 'center';
    //     const x = canvas.width / 2;
    //     ctx.fillText(text, x, y);
    // }
    // const onClickLetterUp = () =>{
    //     const canvas:any = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    //     const fontColor = fontcolor;
    //     const backgroundColor = backcolor;
    //     const txw = ctx.measureText(text);
    //     ctx.font = '25px';
    //     // 背景を描画
    //     setY(30);
    //     const inY = 30;
    //     ctx.fillStyle = backgroundColor;
    //     ctx.fillRect((canvas.width - txw.width) / 2 - 5, inY-30, txw.width + 10, 50);
    //     ctx.fillStyle = fontColor;
    //     ctx.textBaseline = 'center';
    //     ctx.textAlign = 'center';
    //     const x = canvas.width / 2;
    //     ctx.fillText(text, x, y);
    // }

    // const onClickLetterDown = () =>{
    //     const canvas:any = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    //     const fontColor = fontcolor;
    //     const backgroundColor = backcolor;
    //     const txw = ctx.measureText(text);
    //     ctx.font = '25px';
    //     // 背景を描画
    //     setY(300);
    //     const inY = 300;
    //     ctx.fillStyle = backgroundColor;
    //     ctx.fillRect((canvas.width - txw.width) / 2 - 5, inY-30, txw.width + 10, 50);
    //     ctx.fillStyle = fontColor;
    //     ctx.textBaseline = 'center';
    //     ctx.textAlign = 'center';
    //     const x = canvas.width / 2;
    //     ctx.fillText(text, x, y);
    // }

    // const onClickLetterCenter = () =>{
    //     const canvas:any = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    //     const fontColor = fontcolor;
    //     const backgroundColor = backcolor;
    //     const txw = ctx.measureText(text);
    //     ctx.font = '25px';
    //     // 背景を描画
    //     setY(canvas.height/2);
    //     const inY = canvas.height/2;
    //     ctx.fillStyle = backgroundColor;
    //     ctx.fillRect((canvas.width - txw.width) / 2 - 5, inY-30, txw.width + 10, 50);
    //     ctx.fillStyle = fontColor;
    //     ctx.textBaseline = 'center';
    //     ctx.textAlign = 'center';
    //     const x = canvas.width / 2;
    //     ctx.fillText(text, x, y);
    // }

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