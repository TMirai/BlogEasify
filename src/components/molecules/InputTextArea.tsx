//生成画面で本文を入れるためのtextareaコンポーネント
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import { useRecoilState } from "recoil";
import { Text } from "../store/Text";
import { useState } from "react";

type InputType = {
    input: string;
}

export const InputTextArea = (props:InputType) => {
    const { input } = props;
    const [ inputtext, setInputtext ] = useRecoilState(Text);
    const [value, setValue] = useState('')
    const handleInputChange = async (e:any) => {
        let inputValue = e.target.value
        setValue(inputValue)
        setInputtext(inputValue)
      }
    return(
        <FormControl>
            <FormLabel>{input}</FormLabel>
            <Textarea placeholder={input} value={value} onChange={handleInputChange}/>
        </FormControl>
    )
}