      function getBotInfoAndMessages() {
            const botToken = document.getElementById('bot_token').value;

            if (!botToken) {
                alert("Please enter a bot token.");
                return;
            }

            // 获取 Bot 信息
            fetch(`https://api.telegram.org/bot${botToken}/getMe`)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        document.getElementById('bot-username').innerText = data.result.username;
                    } else {
                        document.getElementById('error-alert').style.display = 'block';
                    }
                })

            // 获取最近消息
            fetch(`https://api.telegram.org/bot${botToken}/getUpdates?limit=10&offset=-10`)
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        const messages = data.result;
                        if (messages.length === 0) {
                            document.getElementById('error-alert').style.display = 'block';
                            return;
                        }
                        
                        // 填充消息表格
                        const tableBody = document.querySelector('#messages-table tbody');
                        tableBody.innerHTML = '';  // 清空现有表格数据
                        messages.forEach((message, index) => {

                        if(message.message != undefined)
                        {
                            const row = document.createElement('tr');
                            const messageFrom = message.message.from;
                            const chatId = message.message.chat.id;
                            const username = messageFrom.username || 'Unknown';
                            const type = message.message.text ? 'Text' : 'Other';  // 这里只处理文本消息，其他类型可以扩展
                            const messageText = message.message.text || 'No Text';
                            const date = new Date(message.message.date * 1000).toLocaleString();  // 时间戳转为本地日期

                            row.innerHTML = `
                                <td>${index + 1}</td>
                                <td>${chatId}</td>
                                <td>${username}</td>
                                <td>${type}</td>
                                <td>${messageText}</td>
                                <td>${date}</td>
                            `;
                            tableBody.appendChild(row);
                        }
                            
                        });
                    } else {
                        document.getElementById('error-alert').style.display = 'block';
                    }
                })
        }

        function copyMessages() {
            const botToken = document.getElementById('bot_token').value;
            const sourceChatId = parseInt(document.getElementById('source-chat-id').value);
            const targetChatId = parseInt(document.getElementById('target-chat-id').value);
            const messageStartId = parseInt(document.getElementById('msg-start-id').value);
            const messageEndId = parseInt(document.getElementById('msg-end-id').value);

            if (!botToken || !sourceChatId || !targetChatId || !messageStartId || !messageEndId) {
                alert("Please fill in all fields.");
                return;
            }

            const step = 50;

            for (let msg_id = messageStartId; msg_id < messageEndId; msg_id += step) {
                const msg_ids = Array.from({ length: step }, (_, index) => msg_id + index);
                try {
                    console.log(msg_id, msg_ids);
                     // 请求 Telegram API 进行批量消息拷贝
                    fetch(`https://api.telegram.org/bot${botToken}/copyMessages?chat_id=${targetChatId}&from_chat_id=${sourceChatId}&message_ids=[${msg_ids}]`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.ok) {
                            console.log('Messages copied successfully!');
                        } else {
                            console.log('Failed to copy messages.');
                        }
                    });
                } catch (e) {
                    continue;
                }
            }
        }