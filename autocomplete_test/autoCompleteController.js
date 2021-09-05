function autoCompleteController($timeout, $q, $log) {
    var self = this;
    // the self.{somethings} are varibales/functions that are two-way binded to the model, so the view (html) can access them
    self.simulateQuery = false;
    self.isDisabled = false;

    // list of states to be displayed
    self.states = loadStates();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    self.newState = newState;

    function newState(state) {
        alert("This functionality is yet to be implemented!");
    }

    function querySearch (query) {
        if (query) {
            var stop = true;
        }

        var results = query ? self.states.filter( createFilterFor(query)) : self.states, deferred;
        
        if (self.simulateQuery) {
            deferred = $q.defer();

            $timeout(function () {
                deferred.resolve( results); 
            },
            Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }
    
    function searchTextChange(text) {
        $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
    }

    // build list of states as map of key-value pairs
    function loadStates( ){
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
        Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
        Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
        Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
        North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
        South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
        Wisconsin, Wyoming';

        var res = allStates.split(/, +/g).map(function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });

        return res;
    }

    // filter function for search query
    // Basic search that pattern matches for string.contains()
    function createFilterFor(query) {
        var lowerCaseQuery = query.toLowerCase();
        return function filterFn(state) {
            // must be a javascript pattern match hack..
            // if you can find an index in the string where "part" is part of "multipartsmakeawhole".indexof("part") has "truthiness", then it must contain the string!
            return (state.value.indexOf(lowerCaseQuery) === 0);
        }
    }


}

