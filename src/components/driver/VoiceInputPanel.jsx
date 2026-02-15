import { useState } from 'react';
import { useVoiceRecording } from '../../hooks/useVoiceRecording';
import { Button, Textarea } from '../common';
import { Mic, MicOff, Languages, Volume2, Activity, Loader2 } from 'lucide-react';

export function VoiceInputPanel({ onDataParsed, disabled = false }) {
  const [language, setLanguage] = useState('en');
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transcribing, setTranscribing] = useState(false);

  const {
    isRecording,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    clearRecording,
  } = useVoiceRecording();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
  ];

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      clearRecording();
      setTranscript('');
      startRecording();
    }
  };

  const handleTranscribe = async () => {
    if (!audioBlob) return;

    setTranscribing(true);
    try {
      // Simulate transcription API call
      // In production, this would call: transcriptionApi.transcribe(audioBlob, language)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulated transcript based on language
      const mockTranscripts = {
        en: 'I have collected 45 kilograms of rice and dal from Grand Hyatt. Will deliver to Community Kitchen Whitefield by 11 AM.',
        hi: 'Maine Grand Hyatt se 45 kilo chawal aur daal liya hai. Community Kitchen Whitefield mein 11 baje tak pahuncha dunga.',
      };

      setTranscript(mockTranscripts[language] || mockTranscripts.en);
    } catch (err) {
      console.error('Transcription error:', err);
    } finally {
      setTranscribing(false);
    }
  };

  const handleProcessVoiceInput = async () => {
    if (!transcript) return;

    setProcessing(true);
    try {
      // Simulate parsing API call
      // In production, this would call: transcriptionApi.parseTranscript(transcript)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulated parsed data
      const parsedData = {
        foodName: 'Rice and Dal',
        quantityCollected: '45 kg',
        pickupLocation: 'Grand Hyatt',
        hungerSpotName: 'Community Kitchen Whitefield',
        estimatedDeliveryTime: new Date(
          Date.now() + 2 * 60 * 60 * 1000
        ).toISOString().slice(0, 16),
      };

      onDataParsed(parsedData);
    } catch (err) {
      console.error('Parsing error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Voice Input Assistance
        </h3>
        <p className="text-sm text-gray-500">
          Use voice to fill the form. Speak clearly in your preferred language.
        </p>
      </div>

      {/* Language Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Languages className="w-4 h-4 inline mr-1" />
          Select Language
        </label>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              disabled={disabled}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${
                  language === lang.code
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Record Button */}
      <div className="text-center">
        <button
          onClick={handleRecordToggle}
          disabled={disabled}
          className={`
            w-24 h-24 rounded-full flex items-center justify-center mx-auto
            transition-all duration-300 shadow-lg
            ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isRecording ? (
            <MicOff className="w-10 h-10 text-white" />
          ) : (
            <Mic className="w-10 h-10 text-white" />
          )}
        </button>
        <p className="mt-3 text-sm text-gray-600">
          {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
        </p>
      </div>

      {/* Waveform Animation */}
      {isRecording && (
        <div className="flex items-center justify-center gap-1 h-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-1 bg-emerald-500 rounded-full waveform-bar"
              style={{ height: '8px' }}
            />
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Transcribe Button */}
      {audioBlob && !isRecording && (
        <Button
          onClick={handleTranscribe}
          variant="secondary"
          className="w-full"
          loading={transcribing}
          disabled={transcribing}
        >
          <Volume2 className="w-4 h-4 mr-2" />
          Transcribe Audio
        </Button>
      )}

      {/* Transcript Display */}
      {transcript && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transcript
          </label>
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={4}
            placeholder="Transcript will appear here..."
          />
        </div>
      )}

      {/* Process Voice Input Button */}
      {transcript && (
        <Button
          onClick={handleProcessVoiceInput}
          variant="primary"
          className="w-full"
          loading={processing}
          disabled={processing}
        >
          Process Voice Input
        </Button>
      )}

      {/* Help Text */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          How to use voice input:
        </h4>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Select your preferred language</li>
          <li>Tap the microphone to start recording</li>
          <li>Speak clearly about the pickup details</li>
          <li>Tap again to stop recording</li>
          <li>Click "Transcribe Audio" to convert speech to text</li>
          <li>Review and click "Process Voice Input" to fill the form</li>
        </ol>
      </div>
    </div>
  );
}

export default VoiceInputPanel;
