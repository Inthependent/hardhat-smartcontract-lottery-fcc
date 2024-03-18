const { network } = require("hardhat")

const BASE_FEE = "250000000000000000" // It costs 0.25 LINK per request
const GAS_PRICE_LINK = 1e9 // calculated value based on the gas price of the chain

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (chainId == 31337) {
        log("Local network detected! Deploying mocks...")
        //deploy a mock vrfcoordinator...
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks Deployed!")
        log("-----------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
