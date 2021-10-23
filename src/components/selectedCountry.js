import React from "react";
import {Button, Heading, HStack, Text, VStack} from "@chakra-ui/react";

export default function SelectedCountry(props) {
    const name = props.name;
    const color = props.color;
    const text = props.text;

    return (
        <VStack
            spacing="16px"
            alignItems="left"
        >
            <Heading
                size="2xl"
                color={color}
            >
                {name}
            </Heading>
            <Text
                fontSize="xl"
            >
                {text}
            </Text>
            <Text
                fontSize="sm"
                color="gray.600"
            >
                Note that this advice assumes you are double vaccinated and happy to take COVID-19 testing before or after travelling. WhereCanITravel.tech cannot guarantee the results to be 100% accurate. You should always check on the relevant official government websites before you travel.
            </Text>
            <HStack>
                <Button
                    colorScheme="gray"
                    variant="link"
                    onClick={props.suggestChange}
                >
                    Suggest a change
                </Button>
                {/*<Button*/}
                {/*    colorScheme="gray"*/}
                {/*    variant="link"*/}
                {/*    onClick={props.addCountry}*/}
                {/*>*/}
                {/*    Add a country's policy*/}
                {/*</Button>*/}
            </HStack>
        </VStack>
    );
}