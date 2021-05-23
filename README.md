# Test project for ICO

# For Vezdekod
- Token (ERC-20 based) address in Ropsten: 0xc2c7f01C39B650daCeb1c4DCc91e43c4BA13C406 
- ICO contract address in Ropsten: 0x4C4cc9F8C5BC6186379Ac0450e651e978447e01D


# 1) Run test blockchain Ganache
GUI - will be running on 7545 port (localhost)
command line version will be running on 8545 port (localhost)

In this case we need GUI version, but you can use command line version, for this purpose you need just change truffle-config.js in ROOT folder.

# 2) Compile contracts

- truffle compile

# 3) Deploy contracts

- truffle deploy

Now you can interract with contracts (get TKN balance of deployer account):
- truffle console
- token = await Token.deployed()
- balance_of_token = await token.balanceOf(accounts[0])
- balance_of_token.toNumber()

# 4) Information about contracts


# TOKEN TKN

ERC-20 based contract

# Crowdsale

- Capped
- Has opening and closing time
- Refundable



# 6) WEB RESOURCE
(For future development)
- cd client 
- npm run start
After all checks, the web resource will be running on 3000 port (localhost)
To interract with web resource you need browser with plugin Metamask connected to your local blockchain (Ganache in this case)

So open your browser and go to localhost:3000
Page will automatically connect to your Metamask plugin in browser.

The same functionality but on web. 
You can borrow DBK tokens or deposit your eth.
In addition you can get information about your borrow or deposit (Button 'get info about borrow' and 'get info about borrow').

# 7) TESTS
in test folder you can see 'test.js' file with tests for this project
Run next command:
- truffle test

P.S.
app.py file in ROOT folder is for develop purpose - you can interract with contracts with the help of functions inside it.
