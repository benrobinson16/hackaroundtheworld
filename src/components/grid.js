import {getName, getCodes} from "country-list";
import {Box, Text, SimpleGrid, VStack} from "@chakra-ui/react";

function CountryCard(props) {
    const handleSelect = () => props.handleSelect(props.code, props.color);

    return (
        <Box
            padding="16px"
            backgroundColor="gray.50"
            borderRadius="xl"
            width="100%"
            onClick={handleSelect}
        >
            <Text
                color={props.color}
                fontSize="xl"
                opacity={props.opacity}
            >
                {getName(props.code)}
            </Text>
        </Box>
    )
}

export default function Grid(props) {
    const handleSelect = (code, color) => {
        const name = getName(code);

        let text;
        if (props.returnTrip) {
            text = "There are unknown travel restrictions between " + name + " and " + props.originName + ".";
            if (color === "green") {
                text = "Return travel between " + name + " and " + props.originName + " is largely open.";
            } else if (color === "red") {
                text = "Return travel between " + name + " and " + props.originName + " is largely closed.";
            }
        } else {
            text = "There are unknown travel restrictions to " + name + " from " + props.originName + ".";
            if (color === "green") {
                text = name + " is largely open to travellers from " + props.originName + ".";
            } else if (color === "red") {
                text = name + " is largely closed to travellers from " + props.originName + ".";
            }
        }

        props.didSelect({
            iso: code,
            name: name,
            color: color,
            text: text
        });
    }

    const getColor = iso => {
        if (props.closed.includes(iso)) return "red";
        if (props.open.includes(iso)) return "green";
        return "gray";
    };

    const greenCards = getCodes()
        .map(code => code.toLowerCase())
        .filter(code => getColor(code) === "green")
        .map(code => <CountryCard code={code} color="green" opacity="0.7" handleSelect={handleSelect} />);

    const grayCards = getCodes()
        .map(code => code.toLowerCase())
        .filter(code => getColor(code) === "gray")
        .map(code => <CountryCard code={code} color="gray" handleSelect={handleSelect} />);

    const redCards = getCodes()
        .map(code => code.toLowerCase())
        .filter(code => getColor(code) === "red")
        .map(code => <CountryCard code={code} color="red" opacity="0.7" handleSelect={handleSelect} />);

    return (
        <SimpleGrid
            columns={3}
            spacing="16px"
            width={["95vw", "85vw", "75vw", "50vw"]}
            height="50vh"
            padding="16px"
            overflow="scroll"
            borderWidth="1px"
            borderColor="gray.100"
            borderRadius="lg"
        >
            <VStack
                spacing="16px"
            >
                {greenCards}
            </VStack>
            <VStack
                spacing="16px"
            >
                {grayCards}
            </VStack>
            <VStack
                spacing="16px"
            >
                {redCards}
            </VStack>
        </SimpleGrid>
    )
}