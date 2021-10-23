import {
    Button,
    FormControl,
    FormLabel,
    ModalBody, ModalCloseButton,
    ModalFooter, ModalHeader,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
    ModalContent
} from "@chakra-ui/react";
import CountryPicker from "./countryPicker";
import React, {useState} from "react";
import {MakeNewCountry} from "../data/api";
import {getCode} from "country-list";

export default function NewCountry(props) {
    const [country, setCountry] = useState(props.country);
    const [scheme, setScheme] = useState("redlist");
    const [list, setList] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleListChange = ({target}) => setList(target.value);

    const submit = async () => {
        const arr = list.split("\n").map(name => getCode(name));
        setIsLoading(true);
        await MakeNewCountry(country, scheme, arr);
        setIsLoading(false);
        props.onClose();
    }

    return (
        <ModalContent>
            <ModalHeader>Add a Country's Policy</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Stack direction="column" spacing="24px">
                    <FormControl>
                        <FormLabel>Country:</FormLabel>
                        <CountryPicker value={country} setValue={setCountry}/>
                    </FormControl>
                    <FormControl>
                        <RadioGroup onChange={setScheme} value={scheme}>
                            <Stack direction="row" spacing="16px">
                                <Radio value="redlist">Redlist</Radio>
                                <Radio value="greenlist">Greenlist</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>List:</FormLabel>
                        <Textarea
                            value={list}
                            onChange={handleListChange}
                            placeholder="List of countries. Please use full names and separate by new lines."
                            size="md"
                        />
                    </FormControl>
                </Stack>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={submit} isLoading={isLoading}>
                    Submit
                </Button>
            </ModalFooter>
        </ModalContent>
    );
}