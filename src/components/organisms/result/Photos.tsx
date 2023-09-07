//urlを参照して作成できたサムネイルを表示するコンポーネント
import { WrapItem, Box, Stack, Image, Spinner, Flex, Button, Center } from "@chakra-ui/react"
import { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Title } from "../../store/Title";
import { useRecoilState } from "recoil";
import { Edit, Editurl } from "../../store/Edit";
import { PhotoEdit } from "../../pages/PhotoEdit";

type Props = {
  photourls: string[];
  defaultphotourls: string[];
}

export const Photos = memo((props: Props) => {
  const initOriginalImages = props.photourls.slice(0, 10);
  const initAWSImages = props.defaultphotourls.slice(0, 3);
  const photos = initOriginalImages.concat(initAWSImages);
  const [ selectedNumber, setSelectedNumber ] = useState<number>(0); 

  return(
    <>
      <Box bg="white" p={4} borderRadius="md" shadow="md" width="98%" height={'600px'}>
        <Flex color='white'>
          <Box flex='85%'>
            <Center>
              <PhotoEdit imageUrl={photos[selectedNumber]} />
            </Center>
          </Box>
          <Box flex='15%' style={{height: "550px", overflow: "scroll"}}>
            <img src={photos[0]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(0)} />   
            <img src={photos[1]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(1)} />   
            <img src={photos[2]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(2)} />   
            <img src={photos[3]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(3)} />  
            <img src={photos[4]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(4)} />   
            <img src={photos[5]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(5)} />   
            <img src={photos[6]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(6)} />  
            <img src={photos[7]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(7)} />   
            <img src={photos[8]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(8)} />   
            <img src={photos[9]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(9)} />  
            <img src={photos[10]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(10)} />  
            <img src={photos[11]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(11)} />  
            <img src={photos[12]} crossOrigin="anonymous" style={{marginTop: '5px', cursor: 'pointer'}} onClick={() => setSelectedNumber(12)} />                              
          </Box>                        
        </Flex>                    
      </Box>     
    </>
  )
}
)