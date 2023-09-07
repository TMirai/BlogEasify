import { BrowserRouter, Route, Routes } from "react-router-dom"
import { memo, FC } from "react";
import { Home } from "../pages/Home";
import { Result } from "../pages/Result";
import { HeaderLayout } from "../templates/HeaderLayout";
import { Setting } from "../pages/Setting";
import { PhotoEdit } from "../pages/PhotoEdit";

type Props = {
    alias: string
}

export const Routers: FC<Props> = memo(({alias}) => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<><HeaderLayout alias={alias} /><Home /> </>}/>
                <Route path="/setting" element={<><HeaderLayout alias={alias} /><Setting /></>}/>
                <Route path="/result" element={<><HeaderLayout alias={alias} /><Result /></>}/>
                {/* <Route path="/result/edit" element={<><HeaderLayout alias={alias} /><PhotoEdit /></>}/> */}
            </Routes>
        </BrowserRouter>
    )
})
