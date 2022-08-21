# Tiki exchange clone
## Bắt đầu 
xem demo trực tiếp tại: https://tiki-exchange-sida.netlify.app
**một số tính năng không sử dụng được vì hạn chế truy cập tài nguyên ở phía backend của tiki**

chạy frontend trên localhost:
- Clone repo 
- npm install 
- npm start

## Các chức năng chính
- xem biểu đồ
- đặt lệnh
- xem giá đặt mua/bán 
- xem tài sản 
- xem giao dịch của bản thân
- tùy biến giao diện

## chức năng bị lược bỏ so với bản gốc
- biểu đồ đường 
- popup xác nhận hủy lệnh
- màn hình loading
- chi tiết khối lượng khớp của từng lệnh
## chức năng thêm vào so với bản gốc 
- sổ lệnh chi tiết 
- thêm tùy chọn sổ lệnh(chỉ xem lệnh mua/bán hoặc cả 2)
- filter trang thái lệnh 
- chuyển từ data ban đầu của sổ lệnh từ api sang websocket(hạn chế lỗi hiện giá bên bán cùng giá bên mua)
## Tổng quan các trang
- Home page (URL:/)
    - Login (dùng JWT lưu token vào localStorage)
    - Home page 
- Detail Order page: (URL:/detailOrder)
## Chức năng có thể hoạt động 
|  | localhost | netlify |
|--------------|-------|------|
| xem giá/biểu đồ | có | có | 
| xem sổ lệnh/sổ lệnh chi tiết | có | có |
| đặt lệnh | có | không |
| xem lệnh đã đặt | có | không |
| xem tài sản | có | không |
| xem thông tin tài khoản | có | không |
| đặt lệnh | có | không |

## Ảnh chụp các trang
# Login 
    <img src="https://imgur.com/TKFVJOy">
# Home Page
    <img src="https://imgur.com/FERDLPQ">
# Detail Order Page
    <img src="https://imgur.com/OZ5Lq7z">
    <img src="https://imgur.com/5i49ziJ">

