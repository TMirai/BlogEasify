import { Flex, Heading, Box, Link, useDisclosure } from "@chakra-ui/react";
import { memo, FC, useCallback } from "react";
import { MenuIconButton } from "../../atoms/button/MenuLconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useNavigate } from "react-router-dom";

export const Header: FC = memo(() => {
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
        padding={{ base: 3, md: 5 }}
        >
            <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
                <Heading as="h1" fontSize={{base: "md", md: "lg"}}>BlogEasify</Heading>
            </Flex>
            <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
                <Box pr={4}>
                    <Link onClick={onClickHome}>作成</Link>
                </Box>
                <Link onClick={onClickSetting}>設定</Link>
            </Flex>
            <MenuIconButton onOpen={onOpen}/>
        </Flex>
        <MenuDrawer onClose={onClose} isOpen={isOpen} onClickHome={onClickHome} onClickSetting={onClickSetting}/>
        </>
    )
})