import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import {
    StackDivider,
    Box,
    Badge,
    Text,
    Heading,
    Stack,
    CardBody, Spinner,
    Card, CardHeader
} from '@chakra-ui/react';
export const Singlebook = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);


    const [books, setBooks] = useState([]);
    const FetchData = () => {

        fetch(`https://fine-robe-moth.cyclic.app/api/v1/books/${id}`)
            .then(response => { return response.json() })

            .then(response => {
                setBooks(response)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            });
    }
    document.title = `${books.title}`;
    useEffect(() => {
        FetchData()

    }, []);

    if (loading) {
        return <div><Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        /></div>;
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <Heading size='md'>Book Detail</Heading>
                </CardHeader>

                <CardBody>
                    <div style={{ float: "right", display: "flex" }}>
                        <Badge colorScheme='green'>Author : {books.author}</Badge>
                    </div>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                {books.title}
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {books.summary}
                            </Text>
                        </Box>

                    </Stack>

                </CardBody>
            </Card>
        </div>
    )
}
