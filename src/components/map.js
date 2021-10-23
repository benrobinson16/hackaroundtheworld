import React from "react";
import {WorldMap} from "react-svg-worldmap";
import {getCodes} from "country-list";

export default function Map(props) {
    const getColor = iso => {
        if (props.closed.includes(iso)) return "red";
        if (props.open.includes(iso)) return "green";
        return "gray";
    };

    const stylingFunction = ({countryCode}) => {
        return {
            fill: getColor(countryCode.toLowerCase()),
            fillOpacity: 0.5,
            stroke: 'gray',
            strokeWidth: 1,
            strokeOpacity: 0.2,
            cursor: 'pointer',
        };
    };

    const textFunction = iso => {
        return "";
    };

    const data = getCodes().map(iso => ({country: iso, value: 1}));
    const clickAction = ({countryCode, countryName}) => {
        const color = getColor(countryCode.toLowerCase());

        let text;
        if (props.returnTrip) {
            text = "There are unknown travel restrictions between " + countryName + " and " + props.originName + ".";
            if (color === "green") {
                text = "Return travel between " + countryName + " and " + props.originName + " is largely open.";
            } else if (color === "red") {
                text = "Return travel between " + countryName + " and " + props.originName + " is largely closed.";
            }
        } else {
            text = "There are unknown travel restrictions to " + countryName + " from " + props.originName + ".";
            if (color === "green") {
                text = countryName + " is largely open to travellers from " + props.originName + ".";
            } else if (color === "red") {
                text = countryName + " is largely closed to travellers from " + props.originName + ".";
            }
        }

        props.didSelect({
            iso: countryCode,
            name: countryName,
            color: color,
            text: text
        });
    };

    return (
        <WorldMap
            color="red"
            size="lg"
            data={data}
            onClickFunction={clickAction}
            styleFunction={stylingFunction}
            tooltipTextFunction={textFunction}
        />
    );
}