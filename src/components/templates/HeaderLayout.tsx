import { memo, FC } from "react";
import { Header } from "../organisms/layout/Header";

type Props = {
    alias: string
}

export const HeaderLayout: FC<Props> = memo(({alias}) => {
    return (
        <>
            <Header alias={alias} />
        </>
    )
}
)
