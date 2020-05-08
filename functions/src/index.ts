import * as functions from 'firebase-functions'
import {createTransport} from 'nodemailer'
import {Options} from 'nodemailer/lib/smtp-transport'
import {google} from 'googleapis'

const OAuth2 = google.auth.OAuth2
const user = functions.config().gmail.user
const clientId = functions.config().gmail.client_id
const clientSecret = functions.config().gmail.client_secret
const refreshToken = functions.config().gmail.refresh_token

export const sendEmail = functions.firestore.document('emails/{emailId}').onCreate(async (snapshot) => {
  const oauth2Client = new OAuth2(clientId, clientSecret, 'https://developers.google.com/oauthplayground')

  oauth2Client.setCredentials({
    // eslint-disable-next-line @typescript-eslint/camelcase
    refresh_token: refreshToken,
  })
  const tokens = await oauth2Client.refreshAccessToken()
  const accessToken = tokens.credentials.access_token

  const smtpTransport = createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user,
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  } as Options)

  const data = snapshot.data()
  if (data) {
    smtpTransport.sendMail(
      {
        from: 'Testastic',
        to: data.to,
        subject: data.subject,
        text: data.text,
      },
      (error, response) => {
        if (error) {
          console.error(error)
          smtpTransport.close()
        } else {
          console.log('Message sent: ' + response.message)
        }
      },
    )
  }
})
