

## FinSight AI - DUE Executive Hub
### Phân Tích Hành Vi Khách Hàng Trong Ngân Hàng Số
**FinSight AI** là hệ thống điều hành thông minh được thiết kế để chuyển hóa dữ liệu 
giao dịch ngân hàng thành các quyết định chiến lược. Dự án ứng dụng hệ sinh thái 
**Microsoft Fabric** để xử lý dữ liệu lớn và triển khai giao diện Web tích hợp AI 
giúp tối ưu hóa giá trị vòng đời khách hàng (CLV) và quản trị rủi ro rời bỏ (Churn).
---

##  Hướng Dẫn Khởi Chạy 
Thầy có thể khởi chạy nhanh ứng dụng để kiểm tra giao diện theo các bước sau:
1.  **Mở Terminal tại thư mục dự án.**
2.  **Chạy file ứng dụng:**
    ```
    python app.py
    ```
3.  **Truy cập:** Mở trình duyệt và truy cập đường dẫn `http://127.0.0.1:5000`.
---

## 📊 Phương Pháp Nghiên Cứu & Giải Pháp

Dự án triển khai quy trình phân tích dữ liệu toàn diện (End-to-End):
* **Xử lý dữ liệu:** Sử dụng **OneLake** và **Dataflow Gen2** trên Microsoft Fabric để làm sạch 48.724 bản ghi.
* **Mô hình hóa:** Áp dụng kỹ thuật **RFM** (Recency, Frequency, Monetary) để định danh hành vi.
* **Học máy:** Sử dụng thuật toán **K-Means Clustering** trên PySpark Notebook để phân loại khách hàng thành 5 nhóm chiến lược (VIP, Cốt lõi, Tiềm năng, Thường xuyên, Rủi ro).
* **Trực quan hóa:** Hệ thống Dashboard **Power BI** tích hợp giúp theo dõi doanh thu rủi ro (3.60 nghìn tỷ) và tỷ lệ Churn (31%).
---

## ✨ Chức Năng Hệ Thống

* **Executive Monitoring:** Giám sát các chỉ số vận hành và sức khỏe tài chính của tệp khách hàng.
* **Strategic Insights:** Phân tích sâu các "nút thắt" trải nghiệm dẫn đến rời bỏ.
* **AI Assistant:** Trợ lý ảo hỗ trợ truy vấn dữ liệu bằng ngôn ngữ tự nhiên (Natural Language Query).
* **Actionable AI:** Đề xuất các chiến dịch Marketing và chăm sóc khách hàng cá nhân hóa dựa trên phân cụm.
---
## 📂 Cấu Trúc Thư Mục

```text
App/
├── app.py              # Backend Flask (Cấu hình: template_folder='template')
├── static/             # Chứa script.js và styles.css
└── template/           # Chứa giao diện chính index.html
```
---
## 👤 Thông Tin Thực Hiện
* **Nhóm sinh viên:** Nhóm 13
* **Lớp:** 50K33 - Khoa Thống kê - Tin học
* **Trường:** Đại học Kinh tế - Đại học Đà Nẵng (DUE)
* **Giảng viên hướng dẫn:** Thầy Trịnh Công Duy
* **Học phần:** Phân tích dữ liệu lớn trong Fintech (FIN3012_50K33)
---
*Dự án thực hiện nhằm minh chứng quy trình phân tích và quản trị dữ liệu hiện đại trong kỷ nguyên Ngân hàng số.*
