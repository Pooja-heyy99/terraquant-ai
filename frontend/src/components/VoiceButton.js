import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff } from 'lucide-react';
import api from '../api/api';

const VoiceButton = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const handleVoiceCommand = useCallback(async (text) => {
    try {
      const res = await api.post('/voice', { text });
      console.log('Voice command response:', res.data);
      
      setResponse(res.data.response);
      
      // Navigate if route is provided
      if (res.data.route) {
        setTimeout(() => {
          navigate(res.data.route);
        }, 500);
      }
      
      // Speak the response if available
      if (res.data.response && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(res.data.response);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
        
        // Clear response after speaking
        utterance.onend = () => {
          setTimeout(() => setResponse(''), 2000);
        };
      }
    } catch (error) {
      console.error('Error processing voice command:', error);
      setResponse('Error processing voice command');
      setTimeout(() => setResponse(''), 3000);
    }
  }, [navigate]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Display interim results immediately
        if (interimTranscript) {
          setTranscript(interimTranscript);
        }
        
        // Process final results
        if (finalTranscript) {
          setTranscript(finalTranscript);
          handleVoiceCommand(finalTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setTranscript('');
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        // Clear transcript after a delay
        setTimeout(() => setTranscript(''), 5000);
      };

      setRecognition(recognitionInstance);
    }
  }, [handleVoiceCommand]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={toggleListening}
        className={`relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group ${
          isListening
            ? 'bg-gradient-to-br from-red-500 to-pink-600 animate-pulse'
            : 'bg-gradient-to-br from-green-500 to-cyan-400 hover:scale-110'
        }`}
        title={isListening ? 'Stop listening' : 'Start voice command'}
      >
        {isListening ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
        
        {/* Ripple effect when listening */}
        {isListening && (
          <>
            <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-pulse" />
          </>
        )}
        
        {/* Tooltip */}
        <span className="absolute bottom-full mb-2 right-0 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700">
          {isListening ? 'Listening...' : 'Voice Command'}
        </span>
      </button>

      {/* Transcript and Response Display */}
      {(transcript || response) && (
        <div className="absolute bottom-20 right-0 glass-card p-4 max-w-sm animate-slide-up space-y-3">
          {transcript && (
            <div>
              <p className="text-xs text-gray-400 mb-1">You said:</p>
              <p className="text-sm text-white font-medium">{transcript}</p>
            </div>
          )}
          {response && (
            <div className="border-t border-gray-700 pt-3">
              <p className="text-xs text-cyan-400 mb-1">AI Response:</p>
              <p className="text-sm text-gray-300">{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceButton;
