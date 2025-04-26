import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';

type ProfileType = 'coordinator' | 'teacher' | 'admin';

const ProfileSelection: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { api } = useApi();

  const handleProfileSelect = async (profile: ProfileType) => {
    setSelectedProfile(profile);
    setError('');
    setIsLoading(true);

    try {
      // Envia a seleção do perfil para a API
      const response = await api.post('/user/set-profile', { profile });
      
      // Armazena o perfil selecionado no localStorage
      localStorage.setItem('userProfile', profile);
      
      // Redireciona para a dashboard correspondente
      navigate(`/dashboard/${profile}`, {
        state: {
          profileDetails: response.profileDetails // Dados adicionais podem ser passados aqui
        }
      });
    } catch (err) {
      setError('Erro ao selecionar perfil. Tente novamente.');
      setSelectedProfile(null);
      console.error('Erro ao selecionar perfil:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Estilo base para os cards
  const baseCardStyle = "flex items-center p-6 space-x-4 rounded-lg shadow hover:shadow-lg transition-shadow border";
  const inactiveCardStyle = "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400";
  const activeCardStyle = "bg-indigo-50 dark:bg-indigo-900 border-indigo-500 dark:border-indigo-400";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
          Selecione seu Perfil
        </h2>
        
        {/* Mensagem de erro */}
        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          {/* Card Coordenador */}
          <button
            onClick={() => handleProfileSelect('coordinator')}
            disabled={isLoading}
            className={`${baseCardStyle} ${
              selectedProfile === 'coordinator' ? activeCardStyle : inactiveCardStyle
            } ${isLoading && selectedProfile !== 'coordinator' ? 'opacity-50' : ''}`}
          >
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Coordenador</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Acesso a relatórios e gestão de cursos</p>
            </div>
            {isLoading && selectedProfile === 'coordinator' && (
              <svg className="animate-spin ml-2 h-5 w-5 text-indigo-600 dark:text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>

          {/* Card Professor */}
          <button
            onClick={() => handleProfileSelect('teacher')}
            disabled={isLoading}
            className={`${baseCardStyle} ${
              selectedProfile === 'teacher' ? activeCardStyle : inactiveCardStyle
            } ${isLoading && selectedProfile !== 'teacher' ? 'opacity-50' : ''}`}
          >
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Professor</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Acesso a turmas e lançamento de notas</p>
            </div>
            {isLoading && selectedProfile === 'teacher' && (
              <svg className="animate-spin ml-2 h-5 w-5 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>

          {/* Card Administrador */}
          <button
            onClick={() => handleProfileSelect('admin')}
            disabled={isLoading}
            className={`${baseCardStyle} ${
              selectedProfile === 'admin' ? activeCardStyle : inactiveCardStyle
            } ${isLoading && selectedProfile !== 'admin' ? 'opacity-50' : ''}`}
          >
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Administrador</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Acesso completo ao sistema</p>
            </div>
            {isLoading && selectedProfile === 'admin' && (
              <svg className="animate-spin ml-2 h-5 w-5 text-red-600 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;