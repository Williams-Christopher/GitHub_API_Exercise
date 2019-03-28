'use strict'


    const apiUrl = 'https://api.github.com';
    const options = {
        headers: new Headers(
            {'Accept': 'application/vnd.github.v3+json'},
            {'User-Agent': 'Williams-Christopher:GitHubUserRepoSearch'}
        )
    };

/*
    Encouraged to explicity request v3 in the accept header:
    Accept: application/vnd.github.v3+json

    List user repositories
    GET /users/:username/repos
    Name        Type    Description
    type        string  Can be one of all, owner, member. Default: all
    sort        string  Can be one of created, updated, pushed, full_name. Default: full_name
    direction   string  Can be one of asc or desc. Default asc when using full_name, otherwise desc
*/

function updateResults(results) {
    //console.log(results);

    cleanUpResultsDisplay();

    // append new results
    // Are there results?
    if(results.length === 0) {
        $('#js-results').append(
            `<li>The handle has no respositories or no public respositiories.</li>`
        )
    } else {
        // Display avatar image if available
        // Since we know the owner has at least one public repo and we know the owner
        // object is the same for all the repos, 
        if(results[0].owner.avatar_url !== '') {
            $('#js-result-image').attr("src", results[0].owner.avatar_url).removeClass("hidden")
        }

        // Display repo names and descriptions as href anchor text
        results.forEach(result => {
            $('#js-results').append(
                `<li><a href="${result.html_url}" target='_empty'>${result.full_name} :: ${result.description}</a></li>`
            )
        });
    }

    // Unhide #js-results (Why am I even hiding it to begin with?)
    //$('#js-results').removeClass('hidden');
}

function cleanUpResultsDisplay() {
    // clear any existing error message
    $('#js-error').text('');

    // empty any existing results
    $('#js-results').empty();

    // Hide the image element just in case the handle in the new query doens't have
    // an avatar image or there's another problem
    $('#js-result-image').addClass("hidden");
}

function updateError(errorMessage) {
    cleanUpResultsDisplay();
    
    $('#js-error').text(`An error occurred: ${errorMessage}`);
}

function performAPIRequest(gitHandle) {
    // Create url
    let requestUrl = apiUrl + '/users/' + gitHandle + '/repos';
    console.log(requestUrl);
    
    // make async request
    // display result or error
    fetch(requestUrl, options)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => updateResults(responseJson))
    .catch(e => updateError(e.message));
}

function handleClick() {
    $('form').submit(event => {
        event.preventDefault();
        let gitHandle = $('#js-user-handle').val();
        
        performAPIRequest(gitHandle);    
    })
}

$(handleClick);