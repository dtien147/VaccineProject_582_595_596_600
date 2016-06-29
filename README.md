# UDPT-Project - **Vaccine Reminder**

**Vaccine Reminder** là một đồ án của môn UDPT.

Thành viên:

**1312582 - Bùi Phạm Thiên Thư**

**1312595 - Trịnh Xuân Tiến**

**1312596 - Dương Tiễn**

**1312600 - Nguyễn Hoàng Tín**

URL: **...**

## Chức năng

Chức năng **bắt buộc**:
* [x] Đăng ký
    * [x] Email
    * [ ] Số điện thoại
* [x] Đăng nhập
    * [x] Email
    * [ ] Số điện thoại
    * [x] Google
    * [x] Facebook
* [x] Phân quyền
    * [x] Phụ huynh
    * [x] Quản lý
* [x] Chức năng của phụ huynh
    * [x] Quản lý trẻ
        * [x] Thêm trẻ
        * [x] Xóa trẻ
        * [x] Sửa thông tin trẻ
        * [x] Xem thông tin trẻ
    * [x] Xem lịch tiêm phòng của các trẻ đã thêm
    * [x] Đánh dấu các loại vaccine đã tiêm
    * [ ] Nhận nhắc nhở tiêm phòng cho các trẻ đã thêm qua Email
    * [x] Thiết lập lựa chọn nhắc nhở
* [ ] Chức năng của quản lý
    * [ ] Thêm vaccine (Số mũi tiêm, giãn cách tiêm, thời gian tiêm, đối tượng tiêm)

* [x] Phát sinh lịch tiêm phòng


Chức năng **nâng cao* [ ]**:
* [ ] Phân quyền
    * [ ] Bác sĩ
* [ ] Chức năng của bác sĩ
    * [ ] Trả lời câu hỏi của phụ huynh
    * [ ] Xem thông tin của trẻ với sự cho phép của phụ huynh
* [ ] Chức năng của phụ huynh
    * [ ] Hỏi/đáp với bác sĩ
    * [ ] Xem thông tin vaccine.
    * [ ] Nhận nhắc nhở tiêm phòng cho các trẻ đã thêm qua tin nhắn điện thoại
* [x] Chức năng của quản lý
    * [x] Thêm thông tin vaccine (Thành phần, công dụng, tác dụng phụ)


## Wireframe
![](main.png)

![](parent.png)

![](manager.png)

![](register.png)

![](login.png)

![](home.png)

![](child_info.png)

![](profile.png)

![](vaccine.png)

![](main_manager.png)

![](add_vaccine.png)

## Chuẩn đầu ra đã đạt được
1. Bùi Phạm Thiên Thư

G1.2 		| G3.1	 		| G5.1			| G5.2			| G5.3 & G5.5	| G7.1			| G8.3
------------| ------------- | -------------	| ------------- | ------------- | ------------- | -------------
Sử dụng git theo gitflow workflow | Những xử lý liên quan đến dữ liệu cần được làm tại server để đảm bảo làm việc trên dữ liệu mới nhất. Đối với những button cần được dùng để post dữ liệu nhưng không nằm trong form, cần bắt sự kiện click button tại client và gọi hàm post để gọi xử lý tại server. Đối với chức năng thay đổi mật khẩu, ta có thể để server kiểm tra tính hợp lệ của mật khẩu hiện tại, sau đó kiểm tra mật khẩu mới với mật khẩu được xác nhận có trùng khớp hay không tại client, nhưng việc kiểm tra tại client được ưu tiên thực hiện trước để tăng tốc độ xử lý. | Thiết kế có sử dụng table, thiết kế với div, có sử dụng navigation, sidebar, có các icon, có sử dụng resposive (navigation bar cho thiết bị có màn hình landscape, sidebar cho thiết bị có màn hình portrait) 	| Sử dụng angular js, bootstrap js | Có làm và thao tác với cơ sở dữ liệu, có làm với kiến trúc MVC với angular js | Người dùng không được phép truy cập vào các trang không có quyền  |   Sử dụng jQuery, CSS framework (boostrap), Front-end framework (angular js 1)
