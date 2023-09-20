

App = {
    init: () => {
        console.log('Loaded')
        App.loadContracts()
    },
    loadContracts: async () => {
        const res = await fetch("Contract.json")
        const contractJSON = await res.json()

        App.contracts.contract = TruffleContrac(contractJSON)

        App.contracts.contract.setProvider(App)
    }
}

App.init()