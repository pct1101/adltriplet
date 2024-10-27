@extends('admin/layout')
@section('content')

<div class="container d-flex justify-content-end">
    <button class="btn btn-success my-3" data-bs-toggle="modal" data-bs-target="#addCarModal">Thêm <i
            class="fa-solid fa-plus"></i></button>
</div>
<div class="mx-3" style="justify-content: space-evenly;">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Car Name</th>
                <th scope="col">Car Image</th>
                <th scope="col">Rental Price</th>
                <th scope="col">License Plate</th>
                <th scope="col">Hành động</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($car as $data)
                <tr>
                    <th scope="row">{{$data->car_id}}</th>
                    <td>{{$data->car_name}}</td>
                    <td><img src="/img/{{$data->car_image}}" style="width:50px;" alt=""></td>
                    <td>{{ number_format($data->rental_price, 0, ',', '.') }} VND</td>
                    <td>{{$data->license_plate}}</td>
                    <td class="d-flex">
                        <form action="{{ route('car.delete', $data->car_id) }}" method="POST" style="display:inline;"
                            class="mx-2">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger"
                                onclick="return confirm('Bạn có chắc chắn muốn xóa xe này không?');">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </form>

                        <!-- Nút sửa xe -->
                        <form action="/editcaradmin/{{$data->car_id}}">
                            <button class="btn btn-warning">
                                <i class="fa-solid fa-wrench"></i>
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <div class="p-3" style="display:flex;justify-content: center;">{{$car->links()}}</div>
</div>
<!-- Modal them xe -->
<div class="modal fade" id="addCarModal" tabindex="-1" aria-labelledby="addCarModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addCarModalLabel">Thêm Xe Mới</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Modal Thêm xe-->
            <div class="modal-body">
                <form action="/adminpost" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="mb-3">
                        <label for="car_name" class="form-label">Car Name:</label>
                        <input type="text" class="form-control" name="car_name" id="car_name" required>
                    </div>

                    <div class="mb-3">
                        <label for="seats" class="form-label">Seats:</label>
                        <input type="number" class="form-control" name="seats" id="seats" required>
                    </div>

                    <div class="mb-3">
                        <label for="model" class="form-label">Model Year:</label>
                        <input type="number" class="form-control" name="model" id="model" required>
                    </div>

                    <div class="mb-3">
                        <label for="license_plate" class="form-label">License Plate:</label>
                        <input type="text" class="form-control" name="license_plate" id="license_plate" required>
                    </div>

                    <div class="mb-3">
                        <label for="rental_price" class="form-label">Rental Price:</label>
                        <input type="text" class="form-control" name="rental_price" id="rental_price" required>
                    </div>

                    <div class="mb-3">
                        <label for="car_status" class="form-label">Car Status:</label>
                        <select class="form-select" name="car_status" id="car_status">
                            <option value="1">Available</option>
                            <option value="0">Not Available</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="mileage" class="form-label">Mileage:</label>
                        <input type="text" class="form-control" name="mileage" id="mileage" required>
                    </div>

                    <div class="mb-3">
                        <label for="car_description" class="form-label">Car Description:</label>
                        <textarea class="form-control" name="car_description" id="car_description"></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="brandid" class="form-label">Car Brand:</label>
                        <select class="form-select" name="brandid" id="brandid">
                            @foreach ($brands as $brand)
                                <option value="{{ $brand->brand_id }}">{{ $brand->brand_name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="car_image" class="form-label">Car Image:</label>
                        <input class="form-control" type="file" name="car_image" id="car_image">
                    </div>

                    <button type="submit" class="btn btn-primary">Upload Car</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection