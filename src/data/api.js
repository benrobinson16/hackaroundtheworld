const baseUrl = "https://us-central1-hackaroundtheworld.cloudfunctions.net/";

export function AllDestinations(from, returnTrip) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: from,
            returnTrip: returnTrip
        })
    };

    console.log(options);

    return fetch(baseUrl + "all-destinations", options)
        .then(res => res.json());
}

export function MakeChange(from, to, state) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: to.toLowerCase(),
            from: from.toLowerCase(),
            openClosed: (state === "1")
        })
    };

    console.log(options);

    return fetch(baseUrl + "make-change", options)
        .then(res => res.text());
}

export function MakeNewCountry(country, scheme, arr) {
    const formattedArr = arr
        .filter(code => code)
        .map(code => code.toLowerCase());

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            iso: country,
            scheme: scheme,
            open: scheme === "greenlist" ? formattedArr : null,
            closed: scheme === "redlist" ? formattedArr : null
        })
    };

    console.log(options);

    return fetch(baseUrl + "new-country", options)
        .then(res => res.text());
}