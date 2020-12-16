import express, { Application, response } from 'express';
import axios from 'axios';

import Routes from './routes';
import errorHandling from './shared/errorHandling';
import middleware from './shared/middleware';
import e from 'express';


// Create an Express instance
const app: Application = express();

app.use(express.urlencoded());
app.use(express.json());

// Add any middleware
middleware(app);

// Set up appropriate routes

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.post('/credit-search', async function(req, res) {
    const surname = req.body.surname;
    const address = req.body.address;
    const postcode = req.body.postcode;
    const addressId = req.body.addressId;
    
    const userAddress = await axios.post('https://developer-test-service-2vfxwolfiq-nw.a.run.app/addresses', {
        address1: address,
        address2: "",
        postcode: postcode
    }, {
        headers: {
            'Content-Type': 'application/json'
          }
    });
    
    console.log(userAddress);

    const userCreditors = await axios.post('https://developer-test-service-2vfxwolfiq-nw.a.run.app/creditors', {
        surname: surname,
        addressId: addressId

    }, {
        headers: {
            'Content-Type': 'application/json'
          }
    });

    console.log(userCreditors);

    res.json({
        totalCreditorValue: '',
        "securedCreditorValue": '',
        "unsecuredCreditorValue": '',
        "qualifies": ''
        
    });
         
});

Routes(app);

app.listen(3000, function() {
    console.log('server running on port 3000...');
});

// Add any error handling
errorHandling(app);

export default app;
