//生成画面でタイトルを入れるためのtextareaコンポーネント
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import { useRecoilState } from "recoil";
import { useState } from "react";
import { Title } from "../store/Title";

type InputType = {
    input: string;
}

export const InputTitleArea = (props:InputType) => {
    const { input } = props;
    const [ inputtitle, setInputtitle ] = useRecoilState(Title);
    const [value, setValue] = useState('')
    const handleInputChange = async (e:any) => {
        let inputValue = e.target.value
        setValue(inputValue)
        setInputtitle(inputValue)
      }
    return(
        <FormControl>
            <FormLabel>{input}</FormLabel>
            <Textarea placeholder={input} value={value} onChange={handleInputChange}/>
        </FormControl>
    )
}