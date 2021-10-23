import React, {useState} from "react";
import {Button, Checkbox, Text, VStack} from "@chakra-ui/react";
import CountryPicker from "./countryPicker";

export default function Form(props) {
    const [originalCountry, setOriginalCountry] = useState("");
    const [returnTrip, setReturnTrip] = useState(false);
    const handleSubmit = () => props.onSubmit({origin: originalCountry, returnTrip: returnTrip});
    const handleCheck = ({target}) => setReturnTrip(target.checked);

    return (
        <VStack
            spacing="16px"
            alignItems="left"
        >
            <Text
                size="lg"
            >
                Your current location:
            </Text>
            <CountryPicker
                placeholder="United Kingdom..."
                value={originalCountry}
                setValue={setOriginalCountry}
            />
            <Checkbox
                isChecked={returnTrip}
                onChange={handleCheck}
            >
                Return trip
            </Checkbox>
            <Button
                onClick={handleSubmit}
                colorScheme="blue"
                isLoading={props.isLoading}
                width="100%"
                isDisabled={originalCountry === ""}
            >
                Where can I travel?
            </Button>
        </VStack>
    );
}