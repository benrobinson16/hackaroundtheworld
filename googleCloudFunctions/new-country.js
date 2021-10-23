const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

exports.helloWorld = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }

    const iso = req.body.iso?.toLowerCase();
    const scheme = req.body.scheme;
    const open = req.body.open;
    const closed = req.body.closed;

    if (scheme === "redlist") {
        firestore.collection('countries').doc(iso).set({closed}).then(() => res.status(200).send("success"));
    } else if (scheme === "greenlist") {
        firestore.collection('countries').doc(iso).set({open}).then(() => res.status(200).send("success"));
    } else {
        res.status(500).send("invalid scheme");
    }
};