document.addEventListener('DOMContentLoaded', function() {
    
    // 1. LOGIC ĐĂNG NHẬP
    const loginBtn = document.getElementById('login-btn');
    const loginScreen = document.getElementById('login-screen');
    const mainDashboard = document.getElementById('main-dashboard');
    const errorMsg = document.getElementById('login-error');

    function handleLogin() {
        const user = document.getElementById('username').value.trim();
        const pass = document.getElementById('password').value.trim();
        if (user === 'quanly' && pass === '1') {
            loginScreen.classList.add('hidden');
            mainDashboard.classList.remove('hidden');
            mainDashboard.classList.add('flex'); 
            renderChatPrompts('page-dashboard');
        } else {
            errorMsg.classList.remove('hidden');
            loginBtn.classList.add('bg-rose-600');
            setTimeout(() => loginBtn.classList.remove('bg-rose-600'), 500);
        }
    }
    loginBtn.addEventListener('click', handleLogin);
    window.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });
    document.getElementById('logout-btn').addEventListener('click', () => { location.reload(); });

    // 2. LOGIC CHUYỂN TRANG
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page-section');
    const headerTitle = document.getElementById('header-title');

    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const pageTitle = this.innerText.trim();

            navButtons.forEach(b => {
                b.classList.remove('active-nav', 'text-white', 'bg-blue-600/10', 'border-blue-500');
                b.classList.add('text-gray-400', 'border-transparent');
                const icon = b.querySelector('i');
                if(!icon.classList.contains('text-rose-400') && !icon.classList.contains('text-yellow-400') && !icon.classList.contains('text-pink-500')) icon.classList.remove('text-blue-500');
            });
            this.classList.add('active-nav', 'text-white', 'bg-blue-600/10', 'border-blue-500');
            this.classList.remove('text-gray-400', 'border-transparent');
            const activeIcon = this.querySelector('i');
            if(!activeIcon.classList.contains('text-rose-400') && !activeIcon.classList.contains('text-yellow-400')) activeIcon.classList.add('text-blue-500');

            headerTitle.innerText = pageTitle;
            pages.forEach(page => { page.classList.remove('block'); page.classList.add('hidden'); });
            document.getElementById(targetId).classList.remove('hidden');
            document.getElementById(targetId).classList.add('block');
            renderChatPrompts(targetId);
        });
    });

    // 3. LOGIC MỞ RỘNG CHATBOT BỀ NGANG
    const toggleChatBtn = document.getElementById('toggle-chat-width');
    const chatAside = document.getElementById('chat-aside');
    let isChatExpanded = false;

    toggleChatBtn.addEventListener('click', () => {
        if(!isChatExpanded) {
            chatAside.classList.remove('w-[340px]');
            chatAside.classList.add('w-[550px]'); // Mở rộng ra 550px đọc cho sướng
        } else {
            chatAside.classList.remove('w-[550px]');
            chatAside.classList.add('w-[340px]');
        }
        isChatExpanded = !isChatExpanded;
    });

    // 4. LOGIC CHATBOT (GỌI API)
    const chatContent = document.getElementById('chat-content');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const aiPromptsContainer = document.getElementById('ai-prompts');

    // Cập nhật câu hỏi gợi ý phù hợp với dữ liệu mới
    const chatPrompts = {
        'page-dashboard': ['Tóm tắt các chỉ số quan trọng hôm nay', 'Lọc danh sách KH có tỷ lệ rời bỏ cao'],
        'page-strategy': ['Phân tích lỗ hổng Cross-sell ở Gen Z', 'Tại sao giao dịch cuối tuần lại rủi ro?', 'Phân tích Rủi ro nợ xấu chéo'],
        'page-recommendations': ['Có nên tăng hạn mức tín dụng tự động?', 'Tạo kịch bản Telesale cứu VIP', 'Tạo Jira Ticket dời lịch bảo trì'],
        'page-notifications': ['Đánh giá mức độ nghiêm trọng của Churn', 'Kiểm tra log server thanh toán']
    };

    function renderChatPrompts(pageId) {
        const prompts = chatPrompts[pageId] || [];
        aiPromptsContainer.style.display = 'flex';
        aiPromptsContainer.innerHTML = prompts.map(text => 
            `<button class="prompt-btn text-left bg-[#1e293b] border border-blue-500/30 text-blue-400 px-3 py-2.5 rounded-xl hover:bg-[#253347] transition text-xs shadow-sm w-full">${text}</button>`
        ).join('');
        document.querySelectorAll('.prompt-btn').forEach(btn => btn.addEventListener('click', function() { handleUserMessage(this.innerText); }));
    }

    function scrollToBottom() { chatContent.scrollTop = chatContent.scrollHeight; }

    async function handleUserMessage(text) {
        if (!text.trim()) return;
        if (aiPromptsContainer) aiPromptsContainer.style.display = 'none';

        chatContent.insertAdjacentHTML('beforeend', `<div class="flex space-x-2 justify-end mt-4"><div class="bg-blue-600 text-white rounded-2xl rounded-tr-none p-3 shadow-md text-xs max-w-[85%] leading-relaxed">${text}</div></div>`);
        chatInput.value = '';
        scrollToBottom();

        const loadingId = 'loading-' + Date.now();
        chatContent.insertAdjacentHTML('beforeend', `<div id="${loadingId}" class="flex space-x-3 mt-5"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0 text-xs font-bold shadow-lg mt-1"><i class="fa-solid fa-spinner fa-spin"></i></div><div class="bg-[#1e293b] border border-gray-700 text-gray-400 rounded-2xl rounded-tl-none p-3 shadow-md text-xs italic">AI đang truy vấn SQL...</div></div>`);
        scrollToBottom();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await response.json();
            document.getElementById(loadingId).remove();
            
            chatContent.insertAdjacentHTML('beforeend', `<div class="flex space-x-3 mt-5"><div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0 text-xs font-bold shadow-lg mt-1">A|</div><div class="bg-[#1e293b] border border-gray-700 text-gray-200 rounded-2xl rounded-tl-none p-3 shadow-md text-xs max-w-[85%] leading-relaxed">${data.reply}</div></div>`);
            scrollToBottom();
        } catch (error) {
            document.getElementById(loadingId).remove();
            chatContent.insertAdjacentHTML('beforeend', `<div class="flex space-x-3 mt-5 text-rose-400 text-xs italic">Lỗi kết nối máy chủ Python!</div>`);
            scrollToBottom();
        }
    }

    sendBtn.addEventListener('click', () => handleUserMessage(chatInput.value));
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserMessage(chatInput.value); });
});