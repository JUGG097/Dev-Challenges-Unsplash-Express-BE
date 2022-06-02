# Unsplash Express Backend Project (The backend for the Unsplash Website deployed [here](https://unsplash-adeoluwa.netlify.app/))

This project was developed using `Node` v "^16.13.0", `Express` v "^4.18.1", `Express-validator` v "^6.14.1", and `Mongoose` v "^6.3.4" libraries.

Deployed on a `Digital Oceans` Droplet using `Github Actions` for CI/CD.

The Image Uploader Website was deployed with `Netlify` link [here](https://unsplash-adeoluwa.netlify.app/).

Figma design was provided by [devChallenges.io](https://devchallenges.io/).

You can clone project and customise at your end.

### API Documentation

- 'http://localhost:8000/api/v1/images' Endpoint

METHOD: 'POST'

BODY: {'img_url': '', 'label': ''}

SUCCESS RESPONSE (200): {'success': true, 'data': '**********'}

ERROR RESPONSE (4**, 5**): {'success': false, 'message': '***********'}


- 'http://localhost:8000/api/v1/images' Endpoint

METHOD: 'GET'

SUCCESS RESPONSE (200): {'success': true, 'data': '**********'}

ERROR RESPONSE (4**, 5**): {'success': false, 'message': '***********'}


- 'http://localhost:8000/api/v1/images/*******' Endpoint

METHOD: 'DELETE'

SUCCESS RESPONSE (200): {'success': true, 'message': '**********'}

ERROR RESPONSE (4**, 5**): {'success': false, 'message': '***********'}


