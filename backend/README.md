# Blockchain Inbox Backend
An inbox that is keyed on blockchain public keys.

## Setup
* You need to install Nodejs with at least [Node v16.5.0](https://nodejs.org/en/).
* After installation of nodejs, you need to run ```npm install``` from the terminal/command prompt, inside the [root directory](./) of this project.


## Development
* From the terminal/command prompt inside the root  directory of this project, if you only want to run the app, then run the ```npm run dev```  , if you want to make changes to the app and want them to be reflected immediately, then run ```npm run dev:watch```.

## Production
* From the terminal/command prompt inside the root  directory of this project, if you only want to build the app, then run the ```npm run build```  , if you want to make changes to the app and want them to be reflected immediately, then run ```npm run build:watch```.

## Configuration
* Refer to [config.ts](src/config.ts) file.

## Flow
The app uses two Databases i.e. Mongodb and Bluzelle.
The intent of the Mongodb is to maintain User`s session and the messages(Outbox) which are yet not sent. (In scenarios where User doesn't approve gas fees or some other unknown error).
As soon as the frontend claims that the user has paid gas fee, then the message is moved from Mongodb's Database to Bluzelle's Blockchain, with two copies i.e. A copy for the Creator(Sent) and a copy for the Recipient(Inbox). The format used for saving the messages in Bluzelle's is as follows
* For Msg Creator, uuid is ```CreatorPublicKey:CreatorChainName:sent```
* For Msg Recipient, uuid is ```RecipientPublicKey:RecipientChainName:inbox```



