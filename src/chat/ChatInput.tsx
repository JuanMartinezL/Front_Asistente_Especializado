import React, { useState, useRef } from 'react';
import { Send, Paperclip, FileText, Mic } from 'lucide-react';
import './ChatInput.css';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Enviando consulta médica:', message);
      setMessage('');
      adjustTextareaHeight();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log('Archivos médicos seleccionados:', Array.from(files));
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      console.log('Archivos médicos arrastrados:', Array.from(files));
    }
  };

  return (
    <div className="chat-input-container">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div 
            className={`chat-input-wrapper ${
              isDragging 
                ? 'border-blue-400 bg-blue-50' 
                : message.trim() 
                  ? 'border-blue-300' 
                  : 'border-gray-200'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Drag overlay */}
            {isDragging && (
              <div className="drag-overlay">
                <div className="text-center">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-700 font-medium">Suelta los archivos médicos aquí</p>
                </div>
              </div>
            )}

            <div className="flex items-end gap-3 p-4">
              {/* File upload button */}
              <button
                type="button"
                onClick={handleFileUpload}
                className="chat-button"
                title="Subir archivo médico"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {/* Text input */}
              <div className="flex-1 min-h-[44px] flex items-center">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe tu consulta..."
                  className="chat-textarea"
                  rows={1}
                />
              </div>

              {/* Voice recording button */}
              <button
                type="button"
                onClick={toggleRecording}
                className={`chat-button ${
                  isRecording 
                    ? 'text-red-600 bg-red-50 animate-pulse' 
                    : 'hover:text-red-600 hover:bg-red-50'
                }`}
                title={isRecording ? 'Detener grabación' : 'Grabar audio'}
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Send button */}
              <button
                type="submit"
                disabled={!message.trim()}
                className={`send-button ${
                  message.trim()
                    ? 'bg-blue-700 text-white hover:bg-blue-800 hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                title="Enviar consulta"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,text/*,.pdf,.doc,.docx,.csv,.xlsx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChatInput;