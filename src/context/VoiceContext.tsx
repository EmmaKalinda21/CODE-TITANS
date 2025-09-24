import React, { useEffect, useState, createContext, useContext } from 'react';
interface VoiceContextType {
  listening: boolean;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  selectedVoice: SpeechSynthesisVoice | null;
  availableVoices: SpeechSynthesisVoice[];
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
  lastCommand: string;
}
const VoiceContext = createContext<VoiceContextType | undefined>(undefined);
export const VoiceProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [lastCommand, setLastCommand] = useState('');
  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.onresult = event => {
        const command = event.results[0][0].transcript;
        setLastCommand(command);
        // Process command here
        console.log('Voice command:', command);
      };
      recognitionInstance.onend = () => {
        setListening(false);
      };
      setRecognition(recognitionInstance);
    }
    // Initialize speech synthesis voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        setSelectedVoice(voices[0]);
      }
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);
  const startListening = () => {
    if (recognition) {
      recognition.start();
      setListening(true);
    }
  };
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };
  return <VoiceContext.Provider value={{
    listening,
    startListening,
    stopListening,
    speak,
    selectedVoice,
    availableVoices,
    setSelectedVoice,
    lastCommand
  }}>
      {children}
    </VoiceContext.Provider>;
};
export const useVoice = (): VoiceContextType => {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};