// https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
const express = require('express')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node');
const app = express()
const port = 3000

app.use(cors())

const scopes = [
        'user-read-private',
        'user-read-email',
        'user-read-currently-playing',
        'user-read-playback-state',
        'user-modify-playback-state'
    ],
    redirectUri = process.env.APP_URL + `/callback`,
    clientId = process.env.SPOTIFY_CLIENT_ID,
    clientSecret = process.env.SPOTIFY_CLIENT_SECRET,
    state = 'vispotify';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
    redirectUri
});


app.get('/login', function (_, res) {
    console.log('/login')
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
    console.log(authorizeURL)
    res.redirect(authorizeURL);
});

app.get('/callback', function (req, res) {
    console.log('/callback')
    const code = req.query.code || null;
    // const state = req.query.state || null;

    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(
        function (data) {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);
            res.json({
                expires_in: data.body['expires_in'],
                access_token: data.body['access_token'],
                refresh_token: data.body['refresh_token'],
            });
        },
        function (err) {
            console.log('Something went wrong!', err);
            res.json({})
        }
    );
});

app.get('/refresh_token', function (req, res) {

    const refresh_token = req.query.refresh_token;
    spotifyApi.setRefreshToken(refresh_token)
    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    spotifyApi.refreshAccessToken().then(
        function (data) {
            console.log('The access token has been refreshed!');

            // Save the access token so that it's used in future calls
            res.status(200).json({access_token: data.body['access_token']})
        },
        function (err) {
            console.log('Could not refresh access token', err);
        }
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
