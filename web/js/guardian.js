let key = '05097053-d9bf-435d-abe0-5270003c738b';
let page_size = '50';
let q = 'bolzano';
let page = 1;
let url = 'http://content.guardianapis.com/search?q=' + q + '&api-key=' +
    key + '&page-size=' + page_size + '&page=' + page;
fetch(url, {method: 'GET'})
    .then(response => response.json())
    .then(j => res = j)