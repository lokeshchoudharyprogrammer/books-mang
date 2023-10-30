import React, { useState, useEffect } from 'react';
import {
    Badge,
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter, Spinner,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Divider,
    CardFooter,
    ButtonGroup,
    Text,
    Heading,
    Stack,
    CardBody,
    Card, useToast, Textarea
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function BookManagementPage() {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState({});
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [summary, setSummary] = useState('');
    const toast = useToast()
    const [loading, setLoading] = useState(true);


    const FetchData = () => {

        fetch('https://fine-robe-moth.cyclic.app/api/v1/books')
            .then(response => response.json())

            .then(response => {
                setBooks(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            });
    }
    useEffect(() => {
        FetchData()
    }, []);

    const handleAdd = () => {
        setIsAddModalOpen(true);
    };

    const handleUpdate = (book) => {
        setSelectedBook(book);
        setTitle(book.title);
        setAuthor(book.author);
        setSummary(book.summary);
        setIsUpdateModalOpen(true);
    };

    const handleAddBook = () => {

        fetch("https://fine-robe-moth.cyclic.app/api/v1/books", {
            method: "POST",
            body: JSON.stringify({ title, author, summary }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => {
            setIsAddModalOpen(false);
            toast({
                title: 'Book created.',
                description: "We've created book for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: "top"
            })
            setTitle();
            setAuthor();
            setSummary();
            FetchData()
        }).catch(error => console.error(error));

    };

    const handleUpdateBook = () => {
        console.log(selectedBook)
        fetch(`https://fine-robe-moth.cyclic.app/api/v1/books/${selectedBook._id}`, {
            method: "PUT",
            body: JSON.stringify({ title, author, summary }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((r) => {
            setIsAddModalOpen(false);
            toast({
                title: 'book update.',
                description: "We've update book for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: "top",
            })
            FetchData()

        }).catch(error => console.error(error));
    };


    const handleDeleteBook = (id) => {
        console.log(id)
        fetch(`https://fine-robe-moth.cyclic.app/api/v1/books/${id}`, {
            method: "DELETE"

        }).then((r) => {
            setIsAddModalOpen(false);
            toast({
                title: 'book Delete.',
                description: "We've Delete book for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: "top",
            })
            FetchData()
            console.log()

        }).catch(error => console.error(error));
    };

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
        <Box>
            
            <br />
            <br />
            <Button onClick={handleAdd}>Add Book</Button>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "23px", margin: "40px 12px 12px 25px" }}>
                {books && books.map(book => (
                    <Card maxW='sm' key={books._id}>
                        <CardBody>
                            <Stack mt='6' spacing='3'>
                                <Link to={`/${book._id}`}>

                                    <Heading size='md'>{book.title} by <Badge colorScheme='green'>{book.author}</Badge> </Heading>
                                    <Text>
                                        Summary : -   {book.summary.slice(0, 25)}....
                                    </Text>
                                </Link>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button onClick={() => handleUpdate(book)} variant='solid' colorScheme='green'>
                                    Edit
                                </Button>
                                <Button onClick={() => handleDeleteBook(book._id)} variant='ghost' colorScheme='red'>
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                ))}

            </div>
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Book</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="title">
                            <FormLabel>Title</FormLabel>
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormControl>
                        <FormControl id="author">
                            <FormLabel>Author</FormLabel>
                            <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </FormControl>
                        <FormControl id="summary">
                            <FormLabel>Summary</FormLabel>


                            <Textarea value={summary} onChange={(e) => setSummary(e.target.value)}

                                placeholder='Write your summary'
                                size='sm'
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleAddBook}>Add Book</Button>
                        <Button onClick={() => setIsAddModalOpen(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Book</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="title">
                            <FormLabel>Title</FormLabel>
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormControl>
                        <FormControl id="author">
                            <FormLabel>Author</FormLabel>
                            <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </FormControl>
                        <FormControl id="summary">
                            <FormLabel>Summary</FormLabel>
                            <Input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleUpdateBook}>Update Book</Button>
                        <Button onClick={() => setIsUpdateModalOpen(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default BookManagementPage;
