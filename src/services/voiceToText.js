/**
 * Voice-to-Text Integration Example
 * 
 * This module demonstrates how to integrate speech recognition and
 * transcript parsing for the driver voice input feature.
 */

// Frontend: Record and send audio for transcription
export class VoiceRecorder {
  constructor() {
    this.mediaRecorder = null;
    this.chunks = [];
  }

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4',
    });

    this.chunks = [];
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };

    this.mediaRecorder.start(100);
  }

  stopRecording() {
    return new Promise((resolve) => {
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: this.mediaRecorder.mimeType });
        this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
        resolve(blob);
      };
      this.mediaRecorder.stop();
    });
  }
}

// Frontend: Send audio for transcription
export async function transcribeAudio(audioBlob, language = 'en') {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('language', language);

  const response = await fetch('/api/transcribe', {
    method: 'POST',
    body: formData,
  });

  return response.json();
}

// Frontend: Parse transcript to structured data
export async function parseTranscript(transcript) {
  const response = await fetch('/api/parse-transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript }),
  });

  return response.json();
}

/**
 * Backend Example: Speech-to-Text using Google Cloud Speech API
 * 
 * backend/routes/transcription.js
 */

/*
const speech = require('@google-cloud/speech');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
const speechClient = new speech.SpeechClient({
  keyFilename: 'service_account.json',
});

// Language codes mapping
const languageCodes = {
  en: 'en-IN',    // English (India)
  hi: 'hi-IN',    // Hindi
  kn: 'kn-IN',    // Kannada
  ta: 'ta-IN',    // Tamil
  te: 'te-IN',    // Telugu
};

router.post('/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const language = req.body.language || 'en';
    
    const [response] = await speechClient.recognize({
      config: {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        languageCode: languageCodes[language] || 'en-IN',
        enableAutomaticPunctuation: true,
      },
      audio: {
        content: req.file.buffer.toString('base64'),
      },
    });

    const transcript = response.results
      .map(result => result.alternatives[0].transcript)
      .join(' ');

    res.json({ transcript });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});
*/

/**
 * Backend Example: Parse Transcript using OpenAI GPT
 * 
 * This endpoint uses AI to extract structured data from natural language.
 */

/*
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/parse-transcript', async (req, res) => {
  try {
    const { transcript } = req.body;

    const prompt = `
      Extract structured pickup information from the following transcript.
      Return ONLY a JSON object with these fields (use null if not mentioned):
      - food_name: name/type of food collected
      - quantity_collected: amount with unit (e.g., "45 kg")
      - pickup_location: where food was picked from
      - drop_location: delivery address
      - hunger_spot: name of hunger spot/distribution center
      - estimated_delivery_time: when delivery will happen

      Transcript: "${transcript}"

      JSON:
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that extracts structured data from speech transcripts. Always respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1,
      max_tokens: 200,
    });

    const jsonText = completion.choices[0].message.content.trim();
    const parsed = JSON.parse(jsonText);

    res.json({
      food_name: parsed.food_name || '',
      quantity_collected: parsed.quantity_collected || '',
      pickup_location: parsed.pickup_location || '',
      drop_location: parsed.drop_location || '',
      hunger_spot: parsed.hunger_spot || '',
      estimated_delivery_time: parsed.estimated_delivery_time || '',
    });
  } catch (error) {
    console.error('Parse error:', error);
    res.status(500).json({ error: 'Failed to parse transcript' });
  }
});
*/

/**
 * Alternative: Python Backend for Transcript Parsing
 * 
 * backend/parse_transcript.py
 */

/*
from flask import Flask, request, jsonify
import spacy
import re
from dateparser import parse as parse_date

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

@app.route('/parse-transcript', methods=['POST'])
def parse_transcript():
    transcript = request.json.get('transcript', '')
    doc = nlp(transcript)
    
    result = {
        'food_name': '',
        'quantity_collected': '',
        'pickup_location': '',
        'drop_location': '',
        'hunger_spot': '',
        'estimated_delivery_time': ''
    }
    
    # Extract quantities (e.g., "45 kg", "50 kilograms")
    quantity_pattern = r'(\d+(?:\.\d+)?)\s*(kg|kilograms?|kilo|packets?|boxes?|bags?)'
    quantity_match = re.search(quantity_pattern, transcript, re.IGNORECASE)
    if quantity_match:
        result['quantity_collected'] = f"{quantity_match.group(1)} {quantity_match.group(2)}"
    
    # Extract food items
    food_keywords = ['rice', 'dal', 'vegetables', 'chapati', 'roti', 'curry', 
                     'biryani', 'pulao', 'sambar', 'bread', 'milk', 'fruits']
    found_foods = [word for word in food_keywords if word in transcript.lower()]
    if found_foods:
        result['food_name'] = ', '.join(found_foods).title()
    
    # Extract locations (using NER)
    locations = [ent.text for ent in doc.ents if ent.label_ in ['GPE', 'LOC', 'ORG', 'FAC']]
    if locations:
        result['pickup_location'] = locations[0] if len(locations) > 0 else ''
        result['drop_location'] = locations[1] if len(locations) > 1 else ''
    
    # Extract time mentions
    time_patterns = [
        r'by (\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?)',
        r'at (\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?)',
        r'around (\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?)'
    ]
    for pattern in time_patterns:
        time_match = re.search(pattern, transcript)
        if time_match:
            result['estimated_delivery_time'] = time_match.group(1)
            break
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)
*/

export default {
  VoiceRecorder,
  transcribeAudio,
  parseTranscript,
};
