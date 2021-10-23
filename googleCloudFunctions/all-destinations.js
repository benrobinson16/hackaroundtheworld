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

    let from = req.body.from.toLowerCase();
    const returnTrip = req.body.returnTrip;

    const originDoc = await firestore.collection('countries').doc(from).get();
    const originDocData = originDoc.data();

    let checkOpenReturn = dest => "open";
    if (returnTrip) {
        checkOpenReturn = dest => {
            console.log("check open return: " + dest);
            if (originDocData.closed) {
                const closedCodes = originDocData.closed;
                if (closedCodes.includes(dest)) {
                    return "closed";
                } else {
                    return "open";
                };
            } else if (originDocData.open) {
                const openCodes = originDocData.open;
                if (openCodes.includes(dest)) {
                    return "open";
                } else {
                    return "closed";
                };
            }
            console.log("unknown");
            return "unknown";
        }
    }

    const docs = await firestore.collection('countries').listDocuments();

    let open = [];
    let closed = [];

    let count = 0;
    let target = docs.length;

    docs.forEach((doc) => {
        doc
            .get()
            .then(documentSnapshot => {
                const contents = documentSnapshot.data();
                if (contents.closed) {
                    const closedCodes = contents.closed;
                    if (closedCodes.includes(from)) {
                        closed.push(doc.id);
                    } else {
                        if (checkOpenReturn(doc.id) === "open") {
                            open.push(doc.id);
                        } else if (checkOpenReturn(doc.id) === "closed") {
                            closed.push(doc.id);
                        }
                    };
                } else if (contents.open) {
                    const openCodes = contents.open;
                    if (openCodes.includes(from)) {
                        if (checkOpenReturn(doc.id) === "open") {
                            open.push(doc.id);
                        } else if (checkOpenReturn(doc.id) === "closed") {
                            closed.push(doc.id);
                        }
                    } else {
                        closed.push(doc.id);
                    };
                }

                count += 1;
                if (count >= target) {
                    const response = {
                        open: open,
                        closed: closed
                    };
                
                    res.status(200).send(JSON.stringify(response));
                }
            });
    })
};
