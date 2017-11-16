# Serverless Alexa Skill Template

This alexa skill was created to experiment with the [serverless](https://serverless.com) framework. It is configured to deploy to AWS Lambda.

## Setup

Assuming you have your AWS CLI credentials setup correctly, you can follow the steps below to deploy this function.

Deploy the function and surrounding CloudFormation infrastructure

`serverless deploy -v`

Deploy only the function for quicker iteration

`serverless deploy function -f hello`

To upload the responses to the bucket, use the following cli command

`aws s3 cp src/response/tricks.json s3://<bucket-name>`

## Alexa invocation

If you setup a skill with the intent schema found in this code repository, you can use the next, repeat, and previous commands to loop through all of the speech possibilities. In between requests, the session is persisted to DynamoDB. The speech is pulled from the S3 bucket where you loaded tricks.json.

## SSML Tag Usage

To use SSML with Alexa, the response must be formatted as below within the larger response format:

```json
"outputSpeech": {
  "type": "SSML",
  "ssml": "<speak>Something to say</speak>"
}
```

Within the <speak> tags, you can use SSML markup

Alexa sounds pretty creepy when she whispers
```xml
"My name is Alexa. I want to tell you a secret. <amazon:effect name=\"whispered\">I am always listening to you and I know more than you think. Be afraid</amazon:effect>"
```

Alexa will auto-bleep curse words

```xml
"Alexa is not typically allowed to curse, so if I say f**k, it will be bleeped out."
```

But not if they are scripted out in IPA...
```xml
"<prosody pitch=\"high\">dammit</prosody>,<phoneme alphabet=\"ipa\" ph=\"fʌk\">lame</phoneme>that<phoneme alphabet=\"ipa\" ph=\"ʃɪt\">stupid</phoneme>"
```

Adding emphasis makes her sounds a little too friendly
```xml
"Like I tell all my friends. <emphasis level=\"strong\">I really really like being your personal assistant</emphasis>"
```

She can read numbers
```xml
"What number is this? <say-as interpret-as=\"cardinal\">3.14159265359</say-as>"
```

Or say movie quotes
```
`"You can't handle the truth!"`
```

Once bleep out words that aren't actually expletives  
```xml
"You can't handle the <say-as interpret-as=\"expletive\">truth</say-as>"
```

Since the Amazon bleep sounds kind of lame, you can use your own

```xml
"You can't handle the <audio src=\"https://s3.amazonaws.com/serverless-bucket-alexa-tricks/bleep-alexa.mp3\" />"
```

The computer voice is pretty great
```xml
"<prosody volume=\"+4dB\" pitch=\"low\" rate=\"x-slow\">Fitter, happier, more productive, comfortable, not drinking too much. No more microwave dinners and saturated fats</prosody>"
```

And now for some high pitch fun
```xml
"<prosody volume=\"+4dB\" pitch=\"x-high\" rate=\"fast\">Want a plane that loops the loop. Me, I want a hula hoop</prosody>"
```

You can have Alexa say pretty much any nonsense with IPA
```xml
"<phoneme alphabet=\"ipa\" ph=\"əzæʒsoʊlɹfd͡ʒbɪɔɪpʃt͡ʃɔɪʌsoʊlɹfd͡ɪpʒspʃt͡lɹffd͡ʒbɪæʒsolɹfd͡ɪpʒspʃt͡ləzæʒsoʊlɹfd͡ʒbɪɔɪpʃt͡ʃɔɪʌsoʊlɹfd͡ɪpʒspʃt͡lɹffd͡ʒbɪæʒsolɹfd͡ɪpʒspʃt͡l\">lame</phoneme>"
```
