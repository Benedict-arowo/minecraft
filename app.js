const ipAddressInput = document.getElementById('ipAddress');
const version = document.querySelectorAll('.radioBtnVersion');
const submitBtn = document.getElementById('submitBtn');

const serverStatus = document.querySelector('.serverStatus')
const serverIcon = serverStatus.querySelector('img');
const serverName = serverStatus.querySelector('h2');
const serverMotd = serverStatus.querySelector('#serverMotd')
const serverStats = serverStatus.querySelector('.serverStats');

let ipAddress = 'hypixel.net'

const updateDisplay = (data) => {
    console.log(data.icon)
    serverStatus.children[0].classList.remove('show')
    serverStatus.children[1].classList.add('show')
    if (data.icon == undefined) {
        serverIcon.src = 'invalid.png'
    }
    else {
        serverIcon.src = data.icon
    }
    serverName.textContent = ipAddress;
    serverMotd.innerHTML = '';
    for (line in data.motd.html) {
        serverMotd.innerHTML += data.motd.html[line]
        serverMotd.innerHTML += '\n';
    }
    serverStats.children[0].textContent = `Online: ${data.players.online} / ${data.players.max}`
    if (data.version.length == 0) {
        serverStats.children[1].textContent = ''
    }
    else {
        serverStats.children[1].textContent = `Version: ${data.version}`
    }

}

const updateDisplayOffline = (err) => {
    if (!err) {
        err = 'Server is offline or ip address is invalid'
    }
    serverStatus.children[0].children[0].textContent = err
    serverStatus.children[0].classList.add('show')
    serverStatus.children[1].classList.remove('show')
}

const fetchJavaServer = async () => {
    const response = await fetch(`https://api.mcsrvstat.us/2/${ipAddress}`)
    const data = await response.json()
    if (data.online == true){
        updateDisplay(data)
    }
    else {
            updateDisplayOffline();
    }
} 

const fetchBedrockServer = async () => {
    const response = await fetch(`https://api.mcsrvstat.us/bedrock/2/${ipAddress}`)
    const data = await response.json()
    if (data.online == true){
        updateDisplay(data)
    }
    else {
        updateDisplayOffline();
    }
}

submitBtn.addEventListener('click', e => {
    if (ipAddressInput.value.length > 0){
        ipAddress = ipAddressInput.value
        if (version[0].checked) {
            fetchJavaServer()
        }
        else {
            fetchBedrockServer();
        }
    }
    else {
        updateDisplayOffline('You havent inputted anything yet!')
    }
})

fetchJavaServer();
