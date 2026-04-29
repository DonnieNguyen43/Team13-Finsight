from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='template', static_folder='static')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat_api():
    data = request.get_json()
    user_message = data.get('message', '').lower()
    
    reply_text = "Hệ thống AI đang học dữ liệu. Vui lòng hỏi về 'Gen Z', 'Cuối tuần', 'Nợ xấu' hoặc 'Chiến dịch'."

    if "gen z" in user_message or "trẻ" in user_message or "cross-sell" in user_message:
        reply_text = (
            "<b>Insight Khách hàng Trẻ (Gen Z):</b> Tần suất đăng nhập (app_login_frequency) cao gấp 1.5 lần mức trung bình, "
            "nhưng tỷ lệ sở hữu sản phẩm đầu tư (investment_account) chỉ đạt 12%.<br><br>"
            "👉 <b>Đề xuất:</b> Chạy chiến dịch In-app pop-up giới thiệu Quỹ đầu tư vi mô chỉ từ 50.000 VNĐ."
        )
    elif "cuối tuần" in user_message or "weekend" in user_message or "bảo trì" in user_message:
        reply_text = (
            "Phân tích chỉ số <b>weekend_transaction_ratio</b> cho thấy lượng giao dịch cuối tuần tăng vọt (>60% ở nhóm khách trẻ). "
            "Tuy nhiên, lịch bảo trì server vào Chủ Nhật đang làm tăng failed_transaction và kéo tụt NPS.<br><br>"
            "👉 <b>Action:</b> Yêu cầu IT dời lịch bảo trì core-banking sang 2h-4h sáng Thứ 3."
        )
    elif "nợ xấu" in user_message or "vay" in user_message or "tín dụng" in user_message:
        reply_text = (
            "Phát hiện rủi ro Nợ xấu chéo (Cross-Default Risk): Tệp khách có đồng thời <b>personal_loan</b> và <b>credit_utilization_ratio > 85%</b> "
            "đang có dấu hiệu failed_transaction liên tục. Đây là tín hiệu sớm của mất khả năng thanh toán.<br><br>"
            "👉 <b>Đề xuất:</b> Tạm thời đóng băng hạn mức tín dụng và chuyển thông tin cho Khối Rủi Ro."
        )
    elif "ngủ đông" in user_message or "rfm" in user_message or "hibernating" in user_message:
        reply_text = (
            "Phân tích <b>RFM_Cluster</b> phát hiện tệp 'Ngủ đông' có chỉ số Monetary lịch sử > 50 Triệu nhưng đã lâu không giao dịch. "
            "Chi phí để kích hoạt lại tệp này rẻ hơn 5 lần so với Acquire khách hàng mới.<br><br>"
            "👉 Cần tạo ngay tệp CSV để bắn SMS Voucher."
        )
    elif "tóm tắt" in user_message or "chỉ số" in user_message:
        reply_text = (
            "Chỉ số System Health hôm nay:<br>"
            "• Tổng khách hàng: <b>48.723</b><br>"
            "• Tỷ lệ Churn: <b class='text-rose-400'>31.2%</b> (Báo động đỏ)<br>"
            "• Rủi ro Nợ xấu: <b class='text-orange-400'>Tăng 15% ở nhóm Vay cá nhân</b><br>"
            "Sếp muốn tôi xuất Master Plan ra file PDF không?"
        )
        
    return jsonify({'reply': reply_text})

if __name__ == '__main__':
    app.run(debug=True, port=5000)