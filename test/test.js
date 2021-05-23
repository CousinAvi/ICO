const { expect, use, should } = require('chai')

const pause_func = s => {
    const milliseconds = s * 1000
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const Token = artifacts.require('./Token')
const CrowdSale = artifacts.require('./TokenCrowdSale')
const EVM_REVERT = 'VM Exception while processing transaction: revert'

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token', ([deployer, user]) => {
    let token, crowdSale

    beforeEach(async ()=> {
        token = await Token.new("Token", "TKN", 18, {from: deployer})
        crowdSale = await CrowdSale.new(token.address, 1, 1000, 5000, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000) + 15, {from: deployer})
        await token.passMinterRole(crowdSale.address, {from: deployer})
        })

    describe('initial test', () => {
        it('test_for_name', async () => {
            expect(await token.name()).to.be.eq('Token')
        })

        it('test_for_symbol', async () => {
            expect(await token.symbol()).to.be.eq('TKN')
        })
        it('test_for_decimals', async () => {
            expect(Number(await token.decimals())).to.eq(18)
        })
        it('minter_is_crowdSale', async () => {
            expect(await token.minter()).to.be.eq(crowdSale.address)
        })
        it('initial_pause_is_true', async () => {
            expect(await token.paused()).to.be.eq(true)
        })
        it('owner_cannot_mint_tokens_after_deploy', async () => {
            await token.mint(user, 1000, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
        })
        it('owner_owner_can_finish_mint', async () => {
            await token.finishMint({from: user}).should.be.rejectedWith(EVM_REVERT)
        })
    })

    describe('test_for_allowance', () => {
        it('initial_allowance_is_0', async () => {
            expect(Number(await token.allowance(user, deployer))).to.eq(0)
        })
    })

    describe('ICO_successful', () => {
        it('user_buy_tokens', async () => {
            await pause_func(5)
            await crowdSale.buyTokens(user, {value: 2000, from: user})
            expect(Number(await token.balanceOf(user))).to.eq(2000)
        })
        it('cannot_buy_more_than_hardCap', async () => {
            await crowdSale.buyTokens(user, {value: 6000, from: user}).should.be.rejectedWith(EVM_REVERT)
        })
        it('owner_finalize_ico_and_token_unpaused', async () => {
            await crowdSale.buyTokens(user, {value: 2000, from: user})
            await pause_func(18)
            await crowdSale.finalization({from: deployer})
            expect(await token.paused()).to.be.eq(false)
        })
    })
})

contract('ICO_unsuccessful', ([deployer, user]) => {
    let token, crowdSale

    beforeEach(async ()=> {
        token = await Token.new("Token", "TKN", 18, {from: deployer})
        crowdSale = await CrowdSale.new(token.address, 1, 1000, 5000, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000) + 15, {from: deployer})
        await token.passMinterRole(crowdSale.address, {from: deployer})
        })

    describe('ICO_unsuccessful', () => {
        it('user_buy_tokens', async () => {
            await pause_func(5)
            await crowdSale.buyTokens(user, {value: 500, from: user})
            expect(Number(await token.balanceOf(user))).to.eq(500)
        })
        it('cannot_buy_more_than_hardCap', async () => {
            await crowdSale.buyTokens(user, {value: 6000, from: user}).should.be.rejectedWith(EVM_REVERT)
        })
        it('owner_finalize_ico_and_refund_open', async () => {
            await crowdSale.buyTokens(user, {value: 500, from: user})
            await pause_func(18)
            await crowdSale.finalization({from: deployer})
            expect(await crowdSale.allowRefunds()).to.be.eq(true)
        })
    })
})