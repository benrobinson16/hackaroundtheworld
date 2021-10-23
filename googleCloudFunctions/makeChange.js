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

    const destination = req.body.to?.toLowerCase();
    const origin = req.body.from?.toLowerCase();
    const openClosed = req.body.openClosed;

    const doc = firestore
        .collection('countries')
        .doc(destination);

    doc
        .get()
        .then(snapshot => {
            const contents = snapshot.data();
            if (contents.closed) {
                const closedCodes = contents.closed;
                let closed = [];
                if (openClosed) {
                    // redlist scheme, remove from redlist
                    closed = closedCodes.filter(iso => iso !== origin);
                } else {
                    // redlist scheme, add to redlist
                    closed = closedCodes;
                    closed.push(origin);
                };
                doc.update({closed}).then(() => res.status(200).send("success"));
            } else if (contents.open) {
                const openCodes = contents.open;
                let open = [];
                if (openClosed) {
                    // greenlist scheme, add to greenlist
                    open = openCodes;
                    open.push(doc.id);
                } else {
                    // greenlist scheme, remove from greenlist
                    open = openCodes.filter(iso => iso !== origin);
                };
                doc.update({open}).then(() => res.status(200).send("success"));
            } else {
                // need to make document so ignore and redirect to making a country
                res.status(200).send("new-country");
            }
        });
};