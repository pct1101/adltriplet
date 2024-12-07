<h3>ĐÂY LÀ HÓA ĐƠN CỦA BẠN</h3>
<hr>
<table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
    <thead>
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Mục</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Thông Tin
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Tên người thanh toán</td>
            <td style="border: 1px solid #ddd; padding: 8px;">{{ $payment_fullname }}</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Giá tiền</td>
            <td style="border: 1px solid #ddd; padding: 8px;">{{ $payment_amount }}</td>
        </tr>
        <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Ngày thanh toán</td>
            <td style="border: 1px solid #ddd; padding: 8px;">{{ $payment_date }}</td>
        </tr>
    </tbody>
</table>