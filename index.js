'use strict'

/*
    GitHUb API: List user repositories
    GET /users/:username/repos
    Name        Type    Description
    type        string  Can be one of all, owner, member. Default: all
    sort        string  Can be one of created, updated, pushed, full_name. Default: full_name
    direction   string  Can be one of asc or desc. Default asc when using full_name, otherwise desc
*/