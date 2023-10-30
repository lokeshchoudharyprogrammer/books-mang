import React from 'react'
import { Flex, Spacer, Box, Heading, ButtonGroup, Button, AvatarGroup, Avatar, AiOutlineUser, Badge } from '@chakra-ui/react'
export const Navbar = () => {
    return (
        <div>
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box p='2'>
                    <Heading size='md'>  <Badge variant='outline' colorScheme='green'>
                        Book Management System
                    </Badge></Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    <AvatarGroup size='md' max={2}>
                        <Avatar name='Math ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM5feGAGEJ3DMLSCLG-xhp1Ku3AFU25b2zxg&usqp=CAU' />
                        <Avatar name='English ' src='https://qph.cf2.quoracdn.net/main-qimg-4117d358ffd991e5a4133df361960823' />
                        <Avatar name='Hindi ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MZuyZ4jYRhiC3d7UgzAoFvrFgd5xS_qIyBaOuffTRhi-vG8XuV8mATUUqYXsmGQBG2c&usqp=CAU' />
                        <Avatar name='Science ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MZuyZ4jYRhiC3d7UgzAoFvrFgd5xS_qIyBaOuffTRhi-vG8XuV8mATUUqYXsmGQBG2c&usqp=CAU' />
                        
                    </AvatarGroup>
                </ButtonGroup>
            </Flex>
        </div>
    )
}
