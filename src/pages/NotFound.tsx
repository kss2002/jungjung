import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4 bg-linear-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          페이지를 찾을 수 없어요.
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었어요.
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-primary text-white font-semibold rounded-lg transition-colors shadow-lg mx-auto"
        >
          <Home className="w-5 h-5" />
          <span>홈으로 돌아가기</span>
        </button>
      </div>
    </div>
  );
};
