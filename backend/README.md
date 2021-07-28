# Blockchain Inbox
An inbox that is keyed on blockchain public keys.


## Mission
The mission of this app is that it should be securely and reliably, be able to send the message from one blockchain user to another blockchain user, independent to which blockchain they belong to.

## Structure of the Project
The project is split into two sub-projects/apps, the frontend and the backend.<br>


## Flow
The user is asked to provide his Private Key and Chain Name on the frontend side.The frontend app request a token from the backend by providing a Public Key and Chain Name, this token is then signed by the frontend app using Private Key and the signature is sent to the backend along with the token. The backend verifies the signature using Public Key previously provided.
The backend then sends an auth token and this way a secure connection is created between frontend and backend.
At this point the user should be able to view his Inbox Messages, no matter what blockchain he belongs to.
Now if the user wants to send a message to another user, then the user requires [Curium  Browser Extension](https://github.com/bluzelle/blz-extension). The app prompts the user to login with Bluzelle Account if he wants to send the message. After installing the Curium Extension, the app prompts the user to login with the same account used with Curium Extension. If all goes well, then the User can now compose the message by providing recipient's Public Key and Chain Name. The composed message is encrypted with both User's and Recipient's Public Key.
The app then ask the backend to save the encrypted message, followed by prompt from the Curium Extension. If User approves the message by paying the gas fee for the transaction, then the app provides the proof of transaction to the backend. The backend then saves those messages at the Bluzelle Blockchain.
In case If the User disapprove the prompt from the Curium Extension, then the message remains in the outbox.

## Backend Project
The backend is created using Typescript 

## Frontend Project

###### Note
<strong>The Private Key is never sent to the backend or anywhere else. It only remains on the frontend side.</strong>
