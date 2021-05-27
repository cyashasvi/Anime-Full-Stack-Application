async function getGridImage(atitle, cTitle) {
    var imgLoc = document.getElementById(`g-img-${cTitle}`)
    var query = `
query ($search: String) { # Define which variables will be used in the query (id)
  Media (search:$search, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    coverImage {
      large
    }
  }
}
`;

    // Define our query variables and values that will be used in the query request
    var variables = {
        search: atitle
    };
    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };
    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);
    // Handles the fetch
    function handleResponse(response) {
        return response.json().then(function(json) {
            return response.ok ? json : Promise.reject(json);
        });
    }
    // What runs if fetch is successful
    function handleData(data) {
        console.log(data);
        // If the title / cover image is not null, the code inside try will run
        imgLoc.src = data.data.Media.coverImage.large

    }
    // This runs if fetch results in a 404 / 400 error
    function handleError(error) {
        console.error(error);
        imgLoc.src = "/images/blingachu.jpeg"
    }
};