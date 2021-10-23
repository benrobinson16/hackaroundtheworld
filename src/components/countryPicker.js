import {getData} from "country-list";
import {Select} from "@chakra-ui/react";

export default function CountryPicker(props) {
    const options = getData()
        .sort((lhs, rhs) => lhs.name > rhs.name)
        .map(({code, name}) => <option value={code}>{name}</option>);

    const handleChange = ({target}) => props.setValue(target.value);

    return (
        <Select
            onChange={handleChange}
            value={props.value}
            placeholder="Choose a country"
            size="lg"
            variant="outline"
            isFullWidth
        >
            {options}
        </Select>
    )
}