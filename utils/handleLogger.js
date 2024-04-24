const { IncomingWebhook } = require("@slack/webhook")
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

//captura lo que morganbody haya filtrado y lo manda a slack
const loggerStream = {
    write: message => {
        webHook.send({
            text: message
        })
    }
}

module.exports = loggerStream