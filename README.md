<p align="center">
	<img width="240" src="https://github.com/mayur-ud/ieee-naari-arogya/blob/master/logo.png" />
	</p>

<p align="center">
	<h2 align="left"> NaariAarogyam </h2>
</p>

---

## Functionalities
- [ ]  Different Signup/Login functionality for Users and Hospitals. 
- [ ]  Users can view their report and exercise blogs, while Hospitals can View and Upload reports and exercise blogs.
- [ ]  Secure storage of reports on IPFS (Interplantery File System) with the help of ethereum blockchain.
- [ ]  All data of Users is stored on Ethereum blockchain(Goerli TestNet).
- [ ]  Special Workout Demonstration for Women .
- [ ]  Period Tracker with Custom Note adding.


------------

## Tech Stack
- [ ]  ReactJS
- [ ]  IPFS
- [ ]  Blockchain - Ethereum
- [ ]  Web3.Storage
- [ ]  Truffle
- [ ]  Replit
- [ ]  NodeJS
- [ ]  Goerli TestNet
- [ ]  Infura.io
- [ ]  Solidity

-------------

## How this DApp works ?
- [ ] Authentication is handled by backend and stored on MongoDB
- [ ] During Login of Users / Hospitals details are verified
- [ ] Post-Login all restricted routes are secured
#### User Reports Storage 
- [ ] To view Reports , either by User or Hospital(required to enter UserId) , ContentID are fetched for that user
- [ ] Reports are stored on IPFS using Web3.storage
- [ ] IPFS is a decentralised File System to store data securely
- [ ] ContentID is the unique identifier for each file uploaded on IPFS
- [ ] The data of CID's linked with UserId are stored on Ethereum blockchain
- [ ] For the purpose of testing Goerli TestNet is used
- [ ] To connect Node backend to Ethereum blockchain Infura.io API was called
- [ ] Upon Fetching data Frontend Displays it
#### Period Tracker
- [ ] Browse through the Calendar and add Date for periods
- [ ] With each Date you add(must be unique for user) , additional details can be added
- [ ] This can be used to get better evaluation of health


## Instructions to use DApp 
####Users
- [ ] Signup(or Login) as Patient
- [ ] View Reports at an Centralised place with absolute security
- [ ] Track Your Monthly periods to see any inconsistencies . Add optional detailed notes with each entry
- [ ] Browse through various health blogs uploaded by Verified hospitals 

####Hospitals
- [ ] Signup(or Login) as Hospital
- [ ] View Docs of any patient just by their UserID
- [ ] Browse through all patient history at centralised place to give accurate treatments
- [ ] Upload blogs that'll help patients to maintain/improve their health

## Deploys
- [ ] *Replit* -> [View](https://ieee-naari-arogya--sonkusaremayur0.repl.co/login/patient)
- [ ] *Vercel* -> [View](https://ieee-naari-aarogyam.vercel.app/)



## Contributors
* [Ankit Kumar](https://github.com/ankit-pn)
* [Mayur Sonkusare](https://github.com/mayur-ud)
* [Parag JhunjhunWala](https://github.com/paragjjw)

---
## Video Link
For the video demonstration, [click here](https://youtu.be/nsuzpy18ZJk)
---


