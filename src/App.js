import React, {useState, useRef} from "react";
import {
    Box,
    Center,
    VStack,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    Button,
    ModalBody,
    ModalContent,
    Stack,
    Text,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    Heading,
    Collapse, HStack
} from "@chakra-ui/react";
import Map from "./components/map";
import Form from "./components/form";
import {getName} from "country-list";
import {AllDestinations, MakeChange} from "./data/api";
import SelectedCountry from "./components/selectedCountry";
import CountryPicker from "./components/countryPicker";
import NewCountry from "./components/newCountry";
import Grid from "./components/grid";

function App() {
    const [closed, setClosed] = useState([]);
    const [open, setOpen] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [originName, setOriginName] = useState("");
    const [showOverlay, setShowOverlay] = useState(false);
    const [suggestedState, setSuggestedState] = useState("1");
    const [suggestedOriginCountry, setSuggestedOriginCountry] = useState("");
    const [suggestedDestCountry, setSuggestedDestCountry] = useState("");
    const [suggestionIsLoading, setSuggestionIsLoading] = useState(false);
    const [showNewCountry, setShowNewCountry] = useState(false);
    const [returnTrip, setReturnTrip] = useState(false);

    const mapRef = useRef(null);
    const cardRef = useRef(null);

    const handleSubmit = async ({origin, returnTrip}) => {
        setIsLoading(true);
        setSelectedCountry("");
        setShowMap(false);
        setReturnTrip(returnTrip);

        // Call API
        const response = await AllDestinations(origin, returnTrip);
        console.log(response);

        // Update UI
        setClosed(response.closed);
        setOpen(response.open);
        setShowMap(true);
        setIsLoading(false);
        setOriginName(getName(origin));
        setSuggestedOriginCountry(origin);

        mapRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const handleSelectCountry = country => {
        setSelectedCountry(country);
        setSuggestedDestCountry(country.iso);
        // cardRef.current?.scrollIntoView({behavior: "smooth"});
    }

    const suggestChange = () => {
        if (selectedCountry.color === "gray") {
            setShowNewCountry(true);
        } else {
            setShowOverlay(true);
        }
    }

    const onClose = () => {
        setShowOverlay(false);
        setShowNewCountry(false);
    };

    const onSubmitChange = async () => {
        setSuggestionIsLoading(true);
        let res = await MakeChange(suggestedOriginCountry, suggestedDestCountry, suggestedState);
        setSuggestionIsLoading(false);
        if (res === "new-country") {
            // Show alert to say new country
        } else {
            window.location.reload(false);
        }
    }

    const clickAddCountry = () => setShowNewCountry(true);

    return (
        <>
            <Center
                minHeight="100vh"
                width="100vw"
            >
                <VStack
                    spacing="8vh"
                    width="100vw"
                    marginTop="20vh"
                    marginBottom="20vh"
                >
                    <Heading
                        fontSize="5xl"
                    >
                        WhereCanITravel.tech
                    </Heading>
                    <VStack
                        spacing="2vh"
                    >
                        <Center
                            padding={["8px", "16px", "24px"]}
                            borderRadius="xl"
                            backgroundColor="red.100"
                            width={["95vw", "85vw", "75vw", "50vw"]}
                        >
                            <Text
                                textAlign="center"
                            >
                                <b>Wherecanitravel.tech is now out of date. Please do not use it for the latest COVID-19 travel advice.</b>
                            </Text>
                        </Center>
                        <Box
                            padding="48px"
                            backgroundColor="gray.50"
                            borderRadius="xl"
                            width={["95vw", "85vw", "75vw", "50vw"]}
                        >
                            <Form onSubmit={handleSubmit} isLoading={isLoading}/>
                        </Box>
                    </VStack>
                    <Collapse in={showMap} animateOpacity>
                        <Map
                            closed={closed}
                            open={open}
                            didSelect={handleSelectCountry}
                            originName={originName}
                            ref={mapRef}
                            returnTrip={returnTrip}
                        />
                    </Collapse>
                    <Collapse in={selectedCountry} animateOpacity>
                        <Box
                            padding="48px"
                            backgroundColor="gray.50"
                            borderRadius="xl"
                            width={["95vw", "85vw", "75vw", "50vw"]}
                            ref={cardRef}
                        >
                            <SelectedCountry
                                iso={selectedCountry.iso}
                                name={selectedCountry.name}
                                color={selectedCountry.color}
                                text={selectedCountry.text}
                                suggestChange={suggestChange}
                                addCountry={clickAddCountry}
                            />
                        </Box>
                    </Collapse>
                    <Collapse in={showMap} animateOpacity>
                        <Grid
                            closed={closed}
                            open={open}
                            didSelect={handleSelectCountry}
                            originName={originName}
                            returnTrip={returnTrip}
                        />
                    </Collapse>
                    <Box
                        width={["95vw", "85vw", "75vw", "50vw"]}
                    >
                        <HStack
                            marginBottom="16px"
                        >
                            <Button
                                colorScheme="gray"
                                variant="link"
                                onClick={suggestChange}
                            >
                                Suggest a change
                            </Button>
                            <Button
                                colorScheme="gray"
                                variant="link"
                                onClick={clickAddCountry}
                            >
                                Add a country's policy
                            </Button>
                        </HStack>
                        <Text
                            as="i"
                            fontSize="sm"
                            color="gray.500"
                            width={["95vw", "85vw", "75vw", "50vw"]}
                            fontDecoration="italic"
                            paddingTop="20vh"
                        >
                            Notes: WhereCanITravel.tech cannot guarantee the accuracy of any travel advice - please refer to the relevant official government websites before booking or travelling to a destination. Provided advice assumes you are double vaccinated with a widely accepted vaccine and happy to take tests for COVID-19. Largely open means most travellers are allowed in and do not have to quarantine. Largely closed indicates mandatory quarantine or a travel ban.
                        </Text>
                    </Box>
                </VStack>
            </Center>

            <Modal isOpen={showOverlay} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Suggest a Change</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack direction="column" spacing="24px">
                        <FormControl>
                            <FormLabel>From:</FormLabel>
                            <CountryPicker value={suggestedOriginCountry} setValue={setSuggestedOriginCountry} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>To:</FormLabel>
                            <CountryPicker value={suggestedDestCountry} setValue={setSuggestedDestCountry} />
                        </FormControl>
                        <FormControl>
                            <RadioGroup onChange={setSuggestedState} value={suggestedState}>
                                <Stack direction="row" spacing="16px">
                                    <Radio value="1">Largely open</Radio>
                                    <Radio value="2">Largely closed</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onSubmitChange} isLoading={suggestionIsLoading} >
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={showNewCountry} onClose={onClose}>
                <ModalOverlay />
                <NewCountry onClose={onClose} />
            </Modal>
        </>
    );
}

export default App;
