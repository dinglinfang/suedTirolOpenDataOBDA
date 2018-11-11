const Parser = SparqlParser.Parser;
Parser.options = {};
const parser = new Parser();


function drawSparqlGraph(q, container) {
    const parsedQuery = parser.parse(q);

    const prefixes = parsedQuery.prefixes;

    prefixes['xsd'] = 'http://www.w3.org/2001/XMLSchema#';

    const subjects = parsedQuery.where[0].triples.map(tp => tp.subject);

    const objects = parsedQuery.where[0].triples.map(tp => tp.object);

    const subjectsAndObjects = _.uniqBy(_.union(subjects, objects));

    const nodes = subjectsAndObjects.map(t => createNode(t, prefixes));

    const edges = parsedQuery.where[0].triples.map(function (tp) {
        return createEdge(tp, prefixes)
    });

//    const container = document.getElementById('graphSector');

    const data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges)
    };

    const options = {
        // edges: {
        //     color: 'black'
        // },
        // nodes: {
        //     //inheritColors: false
        // }
    };
    const network = new vis.Network(container, data, options);
}


function createNode(rdfTerm, prefixes) {

    if (rdfTerm.startsWith("?")) {
        // variable
        return {
            id: rdfTerm,
            label: rdfTerm,
            shape: 'ellipse',
            color: '#FF0000', background: '#000000', opacity: 0.3
            //color: {color: 'red', opacity: 0.3}
        };
    } else if (rdfTerm.startsWith("\"")) {
        // literal
        return {
            id: rdfTerm,
            label: getLabel(rdfTerm, prefixes),
            shape: 'box',
            color: '#0000FF', opacity: 0.3
        };
    } else if (rdfTerm.startsWith("_:")) {
        // BNodes
        return {
            id: rdfTerm,
            label: getLabel(rdfTerm, prefixes),
            shape: 'box'
        };
    } else {
        // iri
        return {
            id: rdfTerm,
            label: getLabel(rdfTerm, prefixes),
            shape: 'ellipse',
            color: '#0000FF', opacity: 0.3
        };
    }
}

function getShortIriForm(iri, prefixes) {
    if (iri === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
        return 'a';
    }
    for (const key in prefixes) {
        // skip loop if the property is from prototype
        if (!prefixes.hasOwnProperty(key)) continue;

        value = prefixes[key];
        if (iri.startsWith(value)) {
            return key + ":" + iri.substring(value.length)
        }
    }
    return iri;
}

function getLabel(rdfTerm, prefixes) {
    if (rdfTerm.startsWith("\"")) {
        // literal
        if (rdfTerm.indexOf("^^") > 0) {
            idx = rdfTerm.indexOf("^^");
            return rdfTerm.substring(0, idx) + "^^" + getShortIriForm(rdfTerm.substring(idx + 2), prefixes);
        } else {
            return rdfTerm;
        }

    } else if (rdfTerm.startsWith("_:")) {
        // BNodes
        return rdfTerm;
    } else {
        // iri
        return getShortIriForm(rdfTerm, prefixes);
    }
}

function createEdge(tp, prefixes) {
    return {
        from: tp.subject,
        to: tp.object,
        label: getShortIriForm(tp.predicate, prefixes),
        arrows: 'to',
        color: {color: '#ff0000', opacity: 0.3}

    };
}