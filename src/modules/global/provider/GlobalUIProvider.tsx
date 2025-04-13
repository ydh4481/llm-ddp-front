// src/modules/global/provider/GlobalUIProvider.tsx

'use client';

import { createContext, useState } from 'react';
import { GlobalModal } from '../components/GlobalModal';
import { GlobalToast } from '../components/GlobalToast';

interface GlobalUIContextType {
  showToast: (message: string, severity?: 'success' | 'info' | 'warning' | 'error') => void;
  showModal: (content: React.ReactNode, title?: string) => void;
  closeModal: () => void;
}

export const GlobalUIContext = createContext<GlobalUIContextType | null>(null);

export const GlobalUIProvider = ({ children }: { children: React.ReactNode }) => {
  // ✅ Toast 상태
  const [toast, setToast] = useState<{ message: string; severity: string } | null>(null);

  // ✅ Modal 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const showToast = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error' = 'info',
  ) => {
    setToast({ message, severity });
  };

  const showModal = (content: React.ReactNode, title = '알림') => {
    setModalContent(content);
    setModalTitle(title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <GlobalUIContext.Provider value={{ showToast, showModal, closeModal }}>
      {children}

      {/* ✅ 분리된 Toast 컴포넌트 */}
      {toast && (
        <GlobalToast
          message={toast.message}
          onClose={() => setToast(null)}
          open={!!toast}
          severity={toast.severity as 'success' | 'info' | 'warning' | 'error'}
        />
      )}

      {/* ✅ 분리된 Modal 컴포넌트 */}
      <GlobalModal
        content={modalContent}
        onClose={closeModal}
        open={modalOpen}
        title={modalTitle}
      />
    </GlobalUIContext.Provider>
  );
};
