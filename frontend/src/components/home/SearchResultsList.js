import React from 'react';

function SearchResultsList({results}) {
    return (
        <div className="results-list">
            {results.content.map((result, id) => <div key={result.id}
                                                      onClick={(e) => alert(`You selected ${result.name}!`)}
            >
                <p className={"text-black font-serif text-sm  px-3 hover:bg-gray-200 cursor-pointer py-2"}> {result.name}</p>
            </div>)}
        </div>
    );
}

export default SearchResultsList;