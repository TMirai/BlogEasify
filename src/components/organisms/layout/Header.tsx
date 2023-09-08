import { Flex, Heading, Box, Link, useDisclosure } from "@chakra-ui/react";
import { memo, FC, useCallback } from "react";
import { MenuIconButton } from "../../atoms/button/MenuLconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useNavigate } from "react-router-dom";

type Props = {
    alias: string
}

export const Header: FC<Props> = memo(({alias}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const onClickHome = useCallback( () => navigate("/"), []);
    const onClickSetting = useCallback( () => navigate("/setting"), []);

    return (
        <>
            <Flex 
            as="nav" 
            bg="teal.500" 
            color="gray.50" 
            align="center" 
            justify="space-between"
            padding={{ base: 3, md: 2 }}
            >
                <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
                    <Heading as="h1" fontSize={{base: "md", md: "lg"}}> <Link onClick={onClickHome}>BlogEasify</Link></Heading>
                </Flex>
                <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
                    <Box pr={4}>
                        <Link onClick={onClickHome}>作成</Link>
                    </Box>
                    {/* <Link onClick={onClickSetting}>設定</Link> */}
                </Flex>
                <MenuIconButton onOpen={onOpen}/>
                <img
                    src={`https://internal-cdn.amazon.com/badgephotos.amazon.com/?uid=${alias}`}
                    alt="alias"
                    className="midway-img-circle"
                />
            </Flex>
            <MenuDrawer onClose={onClose} isOpen={isOpen} onClickHome={onClickHome} onClickSetting={onClickSetting}/>
        </>
    )
})