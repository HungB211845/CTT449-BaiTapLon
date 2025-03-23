# CTT449-BaiTapLon

Xây dựng Website quản lý thư viện bằng Express.js, Node.js, Vue.js

Phạm Gia Hưng B2111845 HK2 2024-2025

Back-End/

├── app
Điểm khởi đầu của ứng dụng Express.js.

Thiết lập middleware, định tuyến và xử lý lỗi chung.

Trung tâm điều phối yêu cầu và phản hồi.



├── config/ 

│   └── db.config.js : Chứa thông tin kết nối cơ sở dữ liệu (ví dụ: MongoDB). 

├── controllers/

Xử lý logic nghiệp vụ cho các tuyến đường.

Tương ứng với model và xử lý yêu cầu HTTP (GET, POST, PUT, DELETE).

Ví dụ: docgia.controller.js xử lý yêu cầu liên quan đến độc giả.

│   ├── auth.controller.js

│   ├── docgia.controller.js

│   ├── muonsach.controller.js

│   ├── nhanvien.controller.js

│   ├── sach.controller.js

│   └── thongke.controller.js


models/
Định nghĩa cấu trúc dữ liệu của các đối tượng trong ứng dụng.

Ví dụ: DocGia.model.js định nghĩa cấu trúc độc giả.

│   ├── DocGia.model.js

│   ├── NhanVien.model.js

│   ├── NhaXuatBan.model.js

│   ├── Sach.model.js

│   └── TheoDoiMuonSach.model.js



├── routes/

Định nghĩa các điểm cuối API và liên kết chúng với các controller.
Ví dụ: docgia.routes.js định nghĩa các tuyến đường liên quan đến độc giả.
│   ├── auth.routes.js

│   ├── docgia.routes.js

│   ├── muonsach.routes.js

│   ├── nhanvien.routes.js

│   ├── sach.routes.js

│   └── thongke.routes.js



├── services/
Chứa logic nghiệp vụ dùng chung, tách biệt khỏi controller, giúp tái sử dụng và kiểm thử.
Ví dụ: auth.service.js cung cấp dịch vụ xác thực người dùng.
│   ├── auth.service.js

│   ├── docgia.service.js

│   ├── muonsach.service.js

│   ├── nhanvien.service.service.js

│   ├── sach.service.js

│   └── thongke.service.js


├── utils/
Chứa các hàm tiện ích JWT cho xác thực.
│   └── authJwt.js


├── server.js: Khởi tạo server Express.js và lắng nghe kết nối.
**
Luồng hoạt động Back-End**

1.  Yêu cầu HTTP đến được xử lý bởi app.js.
2.  
3.  app.js định tuyến yêu cầu đến controller dựa trên tuyến đường trong routes/.
4.  
5.  Controller xử lý logic, sử dụng service và tương tác với cơ sở dữ liệu qua model.
6.  
7. Controller trả về phản hồi cho app.js, và app.js gửi phản hồi đến client.

   

   
**Lưu ý**
- Đảm bảo rằng bạn đã cài đặt Node.js và npm trước khi chạy dự án.
  
- Cài đặt các thư viện cần thiết bằng lệnh npm install
  
- Cấu hình kết nối cơ sở dữ liệu trong file config/db.config.js.
  
- Hãy nhớ rằng, đây là một phiên bản sửa đổi để phù hợp với file README. Bạn có thể điều chỉnh và thêm thông tin chi tiết hơn nếu cần thiết.
