'use client';

import { ChatResultMessage } from '@/modules/chat/components/ChatResultMessage';
import { ChatSkeletonMessage } from '@/modules/chat/components/ChatSkeletonMessage';
import { useChat } from '@/store/useChat';
import { useSidebar } from '@/store/useSidebar';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, List, ListItem, TextField, Typography } from '@mui/material';

export const RightSidebar = () => {
  const { rightSidebarOpen, setRightSidebarOpen } = useSidebar();
  const { messages, input, setInput, sendMessage } = useChat();

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out h-screen shadow-lg border-l bg-white flex flex-col ${
        rightSidebarOpen ? 'w-[40%]' : 'w-0'
      }`}
    >
      {rightSidebarOpen && (
        <>
          {/* Header */}
          <Box alignItems="center" display="flex" justifyContent="space-between" p={2}>
            <Typography variant="h6">📌 DDP Assistant</Typography>
            <IconButton onClick={() => setRightSidebarOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box flex={1} overflow="auto" px={2}>
            <List>
              {messages.map((msg, idx) => (
                <ListItem
                  disablePadding
                  key={idx}
                  sx={{
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    display: 'flex',
                  }}
                >
                  {msg.role === 'user' ? (
                    <Box
                      sx={{
                        bgcolor: '#1A73E8',
                        color: '#fff',
                        p: 1.5,
                        borderRadius: 2,
                        maxWidth: '75%',
                        m: 1,
                        fontSize: '0.95rem',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        boxShadow: 1,
                      }}
                    >
                      {msg.content}
                    </Box>
                  ) : msg.content === 'loading' ? (
                    <ChatSkeletonMessage />
                  ) : (
                    <Box
                      sx={{
                        bgcolor: '#F5F5F5',
                        color: '#111',
                        p: 1.5,
                        borderRadius: 2,
                        maxWidth: '75%',
                        m: 1,
                        fontSize: '0.95rem',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        boxShadow: 1,
                        border: '1px solid #e0e0e0',
                      }}
                    >
                      <ChatResultMessage
                        chart={msg.chart}
                        data={msg.data}
                        message={msg.content}
                        sql={msg.sql}
                      />
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Input */}
          <Box display="flex" gap={1} p={2}>
            <TextField
              fullWidth
              maxRows={6} // 최대 6줄까지만 확장
              minRows={2} // 최소 2줄부터 시작
              multiline
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(); // Enter → 전송
                }
              }}
              placeholder="메시지를 입력하세요. Shift+Enter로 줄바꿈"
              size="small"
              value={input}
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </>
      )}
    </div>
  );
};
