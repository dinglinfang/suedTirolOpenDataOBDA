const Parser = SparqlParser.Parser;
Parser.options = {};

const parser = new Parser();


function drawSparqlGraph(q, container) {
    const parsedQuery = parser.parse(q);

    const prefixes = parsedQuery.prefixes;

    const base = parsedQuery.base;

    prefixes['xsd'] = 'http://www.w3.org/2001/XMLSchema#';

    const subjects = parsedQuery.where[0].triples.map(tp => tp.subject);

    const objects = parsedQuery.where[0].triples.map(tp => tp.object);

    const subjectsAndObjects = _.uniqBy(_.union(subjects, objects));

    const nodes = subjectsAndObjects.map(t => createNode(t, prefixes, base));

    const edges = parsedQuery.where[0].triples.map(function (tp) {
        return createEdge(tp, prefixes, base)
    });

//    const container = document.getElementById('graphSector');

    const data = {
        nodes: nodes,
        edges: edges
    };

    const options = {
        edges: {
            color: 'black'
        },
        nodes: {
            //inheritColors: false
        }
    };
    const network = new vis.Network(container, data, options);
}


function createNode(rdfTerm, prefixes, base) {

    if (rdfTerm.startsWith("?")) {
        // variable
        return {
            id: rdfTerm,
            label: rdfTerm,
            shape: 'ellipse',
            color: {border: 'red', background: 'white'}
            //color: {color: 'red', opacity: 0.3}
        };
    } else if (rdfTerm.startsWith("\"")) {
        // literal
        return {
            id: rdfTerm,
            label: getLabel(rdfTerm, prefixes, base),
            shape: 'box',
            color: {color: 'blue', opacity: 0.3}
        };
    } else if (rdfTerm.startsWith("_:")) {
        // BNodes
        return {
            id: rdfTerm,
            label: getLabel(rdfTerm, prefixes, base),
            shape: 'box'
        };
    } else {
        // iri
        return {
            id: rdfTerm,
            label: getLabel(rdfTerm, prefixes, base),
            //shape: 'ellipse',
            shape: 'box',
            color: {color: 'blue', opacity: 0.3}
        };
    }
}

function getShortIriForm(iri, prefixes, base) {
    if (iri === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
        return 'a';
    }

    if(iri.startsWith(base)){
        return  `<${iri.substring(base.length)}>`;
    }

    for (const [key, value] of Object.entries(prefixes)) {
        if (iri.startsWith(value)) {
            return key + ":" + iri.substring(value.length)
        }
    }
    return iri;
}

function getLabel(rdfTerm, prefixes, base) {
    if (rdfTerm.startsWith("\"")) {
        // literal
        if (rdfTerm.indexOf("^^") > 0) {
            const idx = rdfTerm.indexOf("^^");
            return rdfTerm.substring(0, idx) + "^^" + getShortIriForm(rdfTerm.substring(idx + 2), prefixes);
        } else {
            return rdfTerm;
        }

    } else if (rdfTerm.startsWith("_:")) {
        // BNodes
        return rdfTerm;
    } else {
        // iri
        return getShortIriForm(rdfTerm, prefixes, base);
    }
}

function createEdge(tp, prefixes, base) {
    return {
        from: tp.subject,
        to: tp.object,
        label: getShortIriForm(tp.predicate, prefixes, base),
        arrows: 'to',
        color: 'black'

    };
}
