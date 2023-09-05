import { BrowserRouter, Route, Routes } from "react-router-dom"
import { memo, FC } from "react";
import { Home } from "../pages/Home";
import { Result } from "../pages/Result";
import { HeaderLayout } from "../templates/HeaderLayout";
import { Setting } from "../pages/Setting";
import { PhotoEdit } from "../pages/PhotoEdit";

export const Routers: FC = memo(() => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<><HeaderLayout /><Home /> </>}/>
                <Route path="/setting" element={<><HeaderLayout /><Setting /></>}/>
                <Route path="/result" element={<><HeaderLayout /><Result /></>}/>
                <Route path="/result/edit" element={<><HeaderLayout /><PhotoEdit /></>}/>
            </Routes>
        </BrowserRouter>
    )
})



{/* <BrowserRouter>
            <Routes>
                <Route path="/" element={<><HeaderLayout /><Home /> </>}/>
            </Routes>
            <Routes>
                <Route path="/setting" element={<><HeaderLayout /><Setting /></>}/>
            </Routes>
            <Routes>
                <Route path="/result" element={<><HeaderLayout /><Result /></>}/>
                    <Route path="/result" element={<><HeaderLayout /><Result /></>}/>
            </Routes>
            <Routes>
                <Route path="/result/edit" element={
                    <>
                        <HeaderLayout />
                        <PhotoEdit />
                    </>
                }/>
            </Routes>
        </BrowserRouter> */}