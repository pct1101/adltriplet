<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('car')->insert([
            [
                'car_name' => 'BAIC BEIJING X7 DELUXE',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2021,
                'license_plate' => '71A-170.30',
                'rental_price' => 1148000,
                'car_image' => 'exVJhipSap7amDB7FWog5g.jpg',
                'car_description' => 'BAIC Beijing ×7 được sản xuất 2021
                                    Xe còn mới, với nhiều tính năng hiện đại, có cài đặt bằng giọng nói
                                    Việt hoá full, chức năng giữ làn, cảnh báo điểm mù v.v
                                    Mẫu xe được giới trẻ ưa chuộng gầm cao 5 chổ rộng rãi thuận tiện đi du lịch gia đình bạn bè',
                'brandid' => 1,
            ],
            [
                'car_name' => 'BAIC BEIJING U5 LUXURY',
                'seats' => 4,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2022,
                'license_plate' => '61K-356.77',
                'rental_price' => 918000,
                'car_image' => 'hsmUNO8wbwMfOQLnZ5JfxA.jpg',
                'car_description' => 'Xe gia đình (người ta) chạy, nội thất giữ kĩ, xe nguyên bản (ko có tiền độ), sạch sẽ , bảo dưỡng đầy đủ.
                                    Xe rộng rãi, thoải mái, tiện nghi: khăn giấy, khăn ướt, dù, bạt che kính lái.
                                    Thích hợp chở gia đình đi xập xình, chở con đi bon bon, chở mẹ đi mua ghẹ, chở ba đi phê pha, chở bồ nhí đi hú hí.',
                'brandid' => 1,
            ],
            [
                'car_name' => 'BAIC BEIJING X7 PREMIUM',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2020,
                'license_plate' => '99F-005.74',
                'rental_price' => 953000,
                'car_image' => 'kCrzb9zfWvmusT_URGzpFw.jpg',
                'car_description' => 'Sạch sẽ hiện đại',
                'brandid' => 1,
            ],
            [
                'car_name' => 'BAIC BEIJING U5 LUXURY',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2022,
                'license_plate' => '60K-080.25',
                'rental_price' => 827000,
                'car_image' => 'Fv20kYazljqz6GFAGiE5Tg.jpg',
                'car_description' => 'Baic Beijing U5 Plus đk 4/2022, sở hữu rất nhiều công nghệ, nếu bạn quá chán vs các dòng xe trên thị trường thì có thể thử:
                                    ✓ Phân khúc C, xe rộng rãi, gia đình ngồi thoải mái.
                                    ✓ Camera toàn cảnh 360độ, tùy chỉnh góc quan sát giúp lái xe an toàn dễ dàng hơn
                                    ✓ Xe đã có thu phí ko dừng.
                                    ✓ Cửa sổ trời, cho các gia đình có con nhỏ đi du lịch',
                'brandid' => 1,
            ],
            [
                'car_name' => 'CHEVROLET COLORADO 4x2',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Dầu',
                'model' => 2018,
                'license_plate' => '51D-763.58',
                'rental_price' => 1091000,
                'car_image' => 'wFAz11aOa6PNKtlumYKeIA.jpg',
                'car_description' => 'Xe bán tải xe gia đình sử dụng,đã độ và lên đồ chơi chạy bao phê,nay rảnh rỗi nên cho thuê chẠy chơi
                                    Dạng nắp thùng cuộn ',
                'brandid' => 2,
            ],
            [
                'car_name' => 'CHEVROLET CRUZE',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2018,
                'license_plate' => '51G-601.70',
                'rental_price' => 804000,
                'car_image' => 'pNOZ6Ax6hDwBJaADWEgj2A.jpg',
                'car_description' => 'Chevrolet Cruze 2018',
                'brandid' => 2,
            ],
            [
                'car_name' => 'CHEVROLET TRAILBLAZER',
                'seats' => 7,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Dầu',
                'model' => 2019,
                'license_plate' => '51H-341.32',
                'rental_price' => 1343000,
                'car_image' => 'ey9ak73g-Htkeh3bCwtPcw.jpg',
                'car_description' => 'CHEVROLET TRAILBLAZER 2019',
                'brandid' => 2,
            ],
            [
                'car_name' => 'CHEVROLET TRAILBLAZER',
                'seats' => 7,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Dầu',
                'model' => 2018,
                'license_plate' => '51K-647.33',
                'rental_price' => 1054000,
                'car_image' => 'Lid3rZFKv5PJRol_pIQcLA.jpg',
                'car_description' => '7 chỗ gầm cao rộng.
                                    Chevrolet trailblazer ltz bản đặt biệt full option.
                                    Tiết kiệm máy khoẻ',
                'brandid' => 2,
            ],
            [
                'car_name' => 'FORD EVEREST TITANIUM',
                'seats' => 7,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Dầu',
                'model' => 2018,
                'license_plate' => '51K-776.09',
                'rental_price' => 1659000,
                'car_image' => '2CQSWVOd3FQ5MbC_uQyrMw.jpg',
                'car_description' => 'Ford Everest 2023 Titanium 4x2 màu Đỏ Cam
                                    Xe gia đình ít đi, sạch sẽ, thơm tho, đầy đủ tiện nghi
                                    Tài xế/ Chủ xe vui vẻ hoà đồng nhiệt tình 😊',
                'brandid' => 3,
            ],
            [
                'car_name' => 'FORD RANGER WILDTRAK 4X2',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Dầu',
                'model' => 2020,
                'license_plate' => '51D-204.69',
                'rental_price' => 912000,
                'car_image' => '6DCAuWWVgC6_Gng8i9v7Zg.jpg',
                'car_description' => 'FORD RANGER WILDTRAK 4X2 2020',
                'brandid' => 3,
            ],
            [
                'car_name' => 'FORD RANGER WILDTRAK 4X2',
                'seats' => 4,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2019,
                'license_plate' => '86C-175.95',
                'rental_price' => 1022000,
                'car_image' => '2paHT9i7wiFYDfDCUWZ_4Q.jpg',
                'car_description' => 'FORD RANGER WILDTRAK 2019- Số Tự Động 4x2 Nhập Thái. Bảo hiểm 2 chiều và người ngồi trên xe.
                                    Xe được bảo dưỡng định kỳ, vận hành êm ái, siêu tiết kiệm, lái rất đầm xe đặc biệt trên cao tốc.
                                    Vượt mọi địa hình với gầm cao. Mang cả thế giới lên xe với cốp siêu rộng, có nắp thùng cuộn linh hoạt, giúp bảo vệ hành lý tuyệt đối.
                                    Lái xe an toàn với AI nhận dạng, cảm biến cảnh báo trước va chạm, áp xuất lốp xe. Xe được trang bị camera hành trình VIETMAP, camera ra lùi, camera cặp lề.
                                    Xe ở Quận 1, giao xe tận nơi, hỗ trợ nhiệt tình tận tâm. Thủ tục nhanh gọn, có chiết khấu cho khách book nhiều ngày!!',
                'brandid' => 3,
            ],
            [
                'car_name' => 'FORD RANGER',
                'seats' => 5,
                'transmission_type' => 'Số sàn',
                'fuel_type' => 'Dầu',
                'model' => 2022,
                'license_plate' => '50H-375-39',
                'rental_price' => 1029000,
                'car_image' => 'Lr3wDX2ld6jcdpbcfvF44g.jpg',
                'car_description' => 'FORD RANGER 2022',
                'brandid' => 3,
            ],
            [
                'car_name' => 'FORD RANGER XLS 4x2',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Dầu',
                'model' => 2020,
                'license_plate' => '51D-569.54',
                'rental_price' => 1059000,
                'car_image' => 'QdxJK20k11FsOILJdaYnbQ.jpg',
                'car_description' => 'Xe gia đình đi, sạch sẽ thơm tho, máy móc êm.
                                    Trang bị dẫn đường và cảnh báo tốc độ.
                                    Camera trước và sau xe.
                                    Epass qua trạm thu phí không dừng.',
                'brandid' => 3,
            ],
            [
                'car_name' => 'FORD TERRITORY TREND',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2022,
                'license_plate' => '51K-628.10',
                'rental_price' => 1379000,
                'car_image' => 'Q_duE-DKcspKCR-SXv4I4g.jpg',
                'car_description' => 'Xe luôn được rửa vệ sinh, khử mùi và đổ đầy bình xăng trước khi giao.
                                    Đã dán phim cách nhiệt 3M dòng cao cấp nhất ngăn UV, rất mát.
                                    Trang bị sẵn máy lọc không khí Sharp loại to, rất tốt cho ai dễ say xe.
                                    Có cam360 Safeview tiện lợi và an toàn khi đi đường hẹp.
                                    Có ghế an toàn cho em bé (xin báo trước để mình chuẩn bị).
                                    Đã dán VETC thu phí tự động.
                                    XIN LƯU Ý:
                                    Mình chỉ chấp nhận Căn Cước Công Dân gắn chip và đã khai báo định danh điện tử.
                                    Chỉ nhận cọc xe máy với chuyến giao tại nhà mình, chuyến giao xe tận nơi mình nhận cọc tiền.',
                'brandid' => 3,
            ],
            [
                'car_name' => 'FORD ECOSPORT',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2016,
                'license_plate' => '49A-588.54',
                'rental_price' => 918000,
                'car_image' => 'm9ZE6yH2wbtApMiDNa9ubw.jpg',
                'car_description' => 'Ecosport màu trắng sang trọng bản titanium full option:
                                    Xe vệ sinh rất kĩ nước hoa thơm mát.
                                    Hộp số tự đông AT 6 cấp mang lại cảm giác lái thể thao.
                                    Xe đã lên đầy đủđồ chơi:',
                'brandid' => 3,
            ],
            [
                'car_name' => 'FORD RANGER RAPTOR 4x4',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2019,
                'license_plate' => '51G-782.12',
                'rental_price' => 1549000,
                'car_image' => 'eyXx_R4W_Izw4IqgKuL_Lg.jpg',
                'car_description' => 'FORD RANGER RAPTOR 4x4 (AT) số tự động.
                                    Xe gia đình mới đẹp, nội thất nguyên bản, sạch sẽ, bảo dưỡng thường xuyên, rửa xe miễn phí cho khách.
                                    Xe rộng rãi, an toàn, tiện nghi, phù hợp cho gia đình du lịch.
                                    Xe trang bị hệ thống cảm biến lùi, gạt mưa tự động, đèn pha tự động, camera hành trình, hệ thống giải trí AV cùng nhiều tiện nghi khác',
                'brandid' => 3,
            ],
            [
                'car_name' => 'HYUNDAI CUSTIN PREMIER',
                'seats' => 7,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2023,
                'license_plate' => '51K-906.46',
                'rental_price' => 1489000,
                'car_image' => 'FFiH-LiWdpYYR7AbGrvN4w.jpg',
                'car_description' => 'Xe 7 chổ cửa lùa',
                'brandid' => 4,
            ],
            [
                'car_name' => 'Xe 7 chổ cửa lùa',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2022,
                'license_plate' => '72A-623.18',
                'rental_price' => 884000,
                'car_image' => 'dSmmStHABX7AUkP-DJg19w.jpg',
                'car_description' => '🚘🚗Hyundai Accent 2022 tự động 5 chỗ:
                                    ‐--------------------------------------------------
                                    ✅ THỦ TỤC NHẬN XE NHANH GỌN ĐƠN GIẢN
                                    👉BÊN EM CAM KẾT👌
                                    🕒 Giao xe đúng hẹn
                                    💰 Miễn phí rửa xe trước và sau khi thuê xe
                                    🔧 Xe luôn trong tình trạng tốt nhất, bảo dưỡng thường xuyên
                                    🏠 Hộ trợ Giao xe tận nhà
                                    🚘🚗 Xe có các thiết bị giải trí và an toàn cao
                                    👉Xe có bảo hiểm 2 chiều đầy đủ
                                    👉Giao nhận xe miễn phí bán kính 5km
                                    👉Không giới hạn km
                                    👉Bảo mật thông tin khách hàng
                                    -------‐------------------',
                'brandid' => 4,
            ],
            [
                'car_name' => 'HYUNDAI SANTAFE',
                'seats' => 7,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2019,
                'license_plate' => '37K-155.82',
                'rental_price' => 1149000,
                'car_image' => 'ALlwgiNN9W3gs9s3B25uaA.jpg',
                'car_description' => 'HuynhDai Santafe 2019 7chỗ, máy xăng
                                    Có Camera lùi, có màn hình android đăng ký mạng 4G tốc độ cao, co phần mềm vietmap s2 nghe nhạc online Youtube',
                'brandid' => 4,
            ],
            [
                'car_name' => 'HYUNDAI ACCENT',
                'seats' => 5,
                'transmission_type' => 'Số sàn',
                'fuel_type' => 'Xăng',
                'model' => 2023,
                'license_plate' => '51K-885.78',
                'rental_price' => 815000,
                'car_image' => 'qtEFurXOkcFWsUOGHEkl1w.jpg',
                'car_description' => 'Huynhdai Accent 2023 số sàn, màu đen bóng.',
                'brandid' => 4,
            ],
            [
                'car_name' => 'HYUNDAI CRETA PREMIUM',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2023,
                'license_plate' => '81A-372.62',
                'rental_price' => 1039000,
                'car_image' => 'MSA7YYP7ecoOtV0JTRShEg.jpg',
                'car_description' => 'HYUNDAI CRETA PREMIUM 2023.
                                    Xe mới toanh, màu đỏ mạnh mẽ.
                                    Khi thuê xe khách giúp mình đóng cửa nhẹ thôi nhé, vì dàn loa xịn em sót ạ❤️❤️❤️',
                'brandid' => 4,
            ],
            [
                'car_name' => 'HYUNDAI KONA',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2019,
                'license_plate' => '62A-172.55',
                'rental_price' => 861000,
                'car_image' => 'YA70aPookzrQ-L0cfVAhzA.jpg',
                'car_description' => 'Hyundai Kona số tự động sx cuối 2019,
                                    xe bản cao cấp full option',
                'brandid' => 4,
            ],
            [
                'car_name' => 'HYUNDAI ACCENT',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2022,
                'license_plate' => '79A-426.72',
                'rental_price' => 898000,
                'car_image' => 'VwmI3aCnpwS56CZzCe7XVA.jpg',
                'car_description' => 'HYUNDAI ACCENT 2022',
                'brandid' => 4,
            ],
            [
                'car_name' => 'HYUNDAI ACCENT',
                'seats' => 5,
                'transmission_type' => 'Số tự động',
                'fuel_type' => 'Xăng',
                'model' => 2024,
                'license_plate' => '51L-344.94',
                'rental_price' => 959000,
                'car_image' => 'tuFZEiTNxIPaao4-JYlJUg.jpg',
                'car_description' => 'HYUNDAI ACCENT 2024',
                'brandid' => 4,
            ]
        ]);
    }
}
